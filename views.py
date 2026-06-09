from django.http import JsonResponse
import json, time, requests
from core.views import get_config
from core.models import Shop, Product, EmailAlert, Form, SiteConfig
from datetime import datetime
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from payment.models import Customer, CustomerPayment
from django.conf import settings
from core.tasks import custom_email_alerts

def create_payment_link(key_id, key_secret, upi_link, amount, discount_percentage, currency, expire_by, reference_id, 
                        description, customer_name, customer_contact, customer_email, customer_address, customer_city, customer_pincode, full_payment, notify_sms, 
                        notify_email, reminder_enable, policy_name, callback_url, callback_method, shop, product=None, address='N/A'):
    url = "https://api.razorpay.com/v1/payment_links/"
    headers = {"Content-Type": "application/json"}
    
    data = {
        "upi_link": upi_link,
        "amount": round(amount, 2),
        "currency": currency,
        "expire_by": expire_by,
        "reference_id": reference_id,
        "description": description,
        "customer": {
            "name": customer_name,
            "contact": customer_contact,
            "email": customer_email,
            "address": customer_address,
            "city": customer_city,
            "pincode": customer_pincode,
            "full_payment": full_payment,
        },
        "notify": {
            "sms": notify_sms,
            "email": notify_email
        },
        "reminder_enable": reminder_enable,
        "notes": {
            "policy_name": policy_name
        },
        "callback_url": callback_url,
        "callback_method": callback_method
    }

    response = requests.post(
        url,
        auth=(key_id, key_secret),
        headers=headers,
        data=json.dumps(data)
    )
    if response.status_code == 200:
        data = response.json()
        customer, _ = Customer.objects.update_or_create(
            shop=shop,
            mobile=customer_contact[-10:],
            defaults={
                "name": customer_name,
                "email": customer_email,
                "address": customer_address,
                "city": customer_city,
                "pincode": customer_pincode,
            }
        )
        CustomerPayment.objects.create(**{
            'shop': shop,
            'product': product,
            'customer': customer,
            'reference_id': data.get('reference_id'),
            'payment_id': data.get('id'),
            'short_url': data.get('short_url'),
            'amount': round(amount/100, 2),
            'status_str': data.get('status'),
            'request_json': data,
            "full_payment": full_payment,
            "discount_percentage": discount_percentage
        })
        return data
    
    return response.json()

def generate_reference_id(product_name):
    product_code = product_name[:4].upper()
    current_datetime = datetime.now().strftime("%Y%m%d-%H%M%S")
    reference_id = f"{product_code}-{current_datetime}"
    return reference_id

@csrf_exempt
def payment_view(request):
    payment_data = {}
    if request.method == "POST":
        config = get_config(request)
        shop_id = config['context']['shop_id']
        domain = config['context']['domain']

        data = request.POST
        if not len(data.keys()):
            data = json.loads(request.body.decode('utf-8'))

        product_id = data.get('product_id', None)
        customer_name = data.get('name', None)
        customer_email = data.get('email', None)
        customer_mobile = data.get('mobile', None)
        customer_address = data.get('address', None)
        customer_city = data.get('city', None)
        customer_pincode = data.get('pincode', None)
        amount = float(data.get('amount', None)) * 100 if data.get('amount', None) else None
        full_payment = data.get('full_payment', None) == 'on'
        # payment_config = config['context']['template_config'].get('payment', None)
        site_config = SiteConfig.objects.filter(shop_id=shop_id).values('template_config').first()
        payment_config = None
        if site_config:
            payment_config = site_config.get('template_config', {}).get('payment', None)
        discount_percentage = payment_config.get('full_payment_discount', 5)
        if payment_config:
            product, payment = None, None
            if product_id:
                product = Product.objects.get(id=product_id, shop_id=shop_id)
                shop = None
                payment_details = {}
                payment = payment_config.get('amount', product.selling_price or 99) * 100
                if full_payment and product.selling_price:
                    payment = (product.selling_price * 100)
                    discount = (discount_percentage / 100) * payment
                    payment = payment - discount
            else:
                discount_percentage = 0

            if product:
                payment_details = {
                    'name': product.name,
                    'amount': payment,
                    'reference_id': generate_reference_id(product.name),
                    'policy': product.shop.name
                }
                shop = product.shop
            else:
                shop = Shop.objects.get(id = shop_id)
                payment_details = {
                    'name': shop.name,
                    'amount': payment or amount,
                    'reference_id': generate_reference_id(shop.name),
                    'policy': shop.name
                }
            payment_data = create_payment_link(
                key_id=payment_config.get('key'),
                key_secret=payment_config.get('secret'),
                upi_link="false",
                amount= amount or payment_details.get('amount'),
                discount_percentage=discount_percentage,
                currency="INR",
                # expire_by=int(time.time()) + 960,
                expire_by = int(time.time()) + 2592000,  # 30 days from now
                reference_id=payment_details['reference_id'],
                description=f"Payment for {payment_details['name']} #{payment_details['reference_id']}",
                customer_name=customer_name or 'User',
                customer_contact=f"+91{customer_mobile}",
                customer_email=customer_email,
                customer_address=customer_address,
                customer_city=customer_city,
                customer_pincode=customer_pincode,
                full_payment=full_payment,
                notify_sms=True if customer_mobile else False,
                notify_email=True if customer_email else False,
                reminder_enable=True if customer_mobile or customer_email else False,
                policy_name=f"{payment_details['policy']} Payments",
                callback_url=f"{domain}/payment/status/{payment_details['reference_id']}/",
                callback_method="get",
                shop=shop,
                product=product
            )
    return JsonResponse(payment_data)

@csrf_exempt
def payment_status(request, reference_id):
    payment_status = request.GET.get('razorpay_payment_link_status', 'failed')
    payment_id = request.GET.get('razorpay_payment_id', 'N/A')
    reference_id = request.GET.get('razorpay_payment_link_reference_id', 'N/A')
    payment_link_id = request.GET.get('razorpay_payment_link_id', 'N/A')
    signature = request.GET.get('razorpay_signature', 'N/A')

    context = {
        'payment_status': payment_status,
        'payment_id': payment_id,
        'reference_id': reference_id,
    }
    status = payment_status == 'paid'
    CustomerPayment.objects.filter(payment_id=payment_link_id, reference_id=reference_id).update(status=status, status_str=payment_status, response_json=dict(request.GET.items()))


    rec = CustomerPayment.objects.filter(payment_id=payment_link_id, reference_id=reference_id).first()
    if rec:
        if status:
            context['order_experience'] = Form.objects.filter(shop=rec.shop, slug__startswith='order-').values_list('slug', flat=True).first()
        alert_type = EmailAlert.ON_ORDER_PLACED
        recipient_email = rec.customer.email
        recipient_name = rec.customer.name
        data = [{
            'text': 'Product Name',
            'value': rec.product.name,
        }, {
            'text': 'Amount',
            'value': rec.amount,
        }, {
            'text': 'Discount',
            'value': rec.discount_percentage,
        }, {
            'text': 'Payment Status',
            'value': payment_status.title(),
        }, {
            'text': 'Mobile No',
            'value': rec.customer.mobile,
        }, {
            'text': 'Email',
            'value': rec.customer.email,
        }, {
            'text': 'Address',
            'value': rec.customer.address,
        }, {
            'text': 'City',
            'value': rec.customer.city,
        }, {
            'text': 'Pincode',
            'value': rec.customer.pincode,
        }]
        if settings.USE_CELERY:
            custom_email_alerts.delay(alert_type, rec.shop.id, recipient_name, recipient_email, data)
        else:
            custom_email_alerts(alert_type, rec.shop.id, recipient_name, recipient_email, data)

    return render(request, 'common/payment_status.html', context)

@csrf_exempt
def payment_webhooks(request):
    if request.method == "POST":
        print(request.data)
    print(request.headers)
    return JsonResponse({"success": True}) 