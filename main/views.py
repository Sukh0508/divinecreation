import json
import logging
from datetime import timedelta

from django.db import transaction
from django.db.models import Q
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from .models import (
    Home_background_img, Category, Product_list, About_img, Client_review,
    Contact, Privacy_Policy, term_conditions, Order, OrderItem,
)

logger = logging.getLogger(__name__)


def _parse_request_data(request):
    content_type = request.content_type or ""
    if "application/json" in content_type:
        try:
            return json.loads(request.body.decode("utf-8") or "{}")
        except json.JSONDecodeError:
            logger.warning("JSON decode failed for request body in %s", request.path)
            return {}

    if request.POST:
        return request.POST

    if request.body:
        try:
            return json.loads(request.body.decode("utf-8"))
        except json.JSONDecodeError:
            logger.warning("Request body is not JSON and POST is empty for %s", request.path)
            return {}

    return {}


def _parse_amount(amount_value):
    if amount_value is None:
        raise ValueError("Amount is required")

    raw = str(amount_value).strip()
    if not raw:
        raise ValueError("Amount is required")

    raw = raw.replace("₹", "").replace(",", "").strip()
    amount = float(raw)
    if amount <= 0:
        raise ValueError("Amount must be greater than zero")

    return int(round(amount))


def _get_missing_fields(data, keys):
    missing = [key for key in keys if not data.get(key)]
    return missing


def Home(request):
    home_image = Home_background_img.objects.first()
    category = Category.objects.all()
    products = Product_list.objects.filter(status='active')

    about = About_img.objects.first()
    client = Client_review.objects.all()
    privacy = Privacy_Policy.objects.all()
    latest_update = Privacy_Policy.objects.order_by("-update_at").first()

    terms = term_conditions.objects.all()
    last_update = term_conditions.objects.order_by("-last_update").first()

    if request.method == "POST":
        Contact.objects.create(
            name=request.POST.get("name"),
            email=request.POST.get("email"),
            phone=request.POST.get("phone"),
            subject=request.POST.get("subject"),
            msg=request.POST.get("msg"),
        )
        return JsonResponse({"success": True})

    return render(request, "index.html", {
        "home_image": home_image,
        "category": category,
        "products": products,
        "about": about,
        "client": client,
        "privacy": privacy,
        "latest_update": latest_update,
        "terms": terms,
        "last_update": last_update,
    })


@csrf_exempt
def Checkout(request):
    if request.method != "POST":
        return JsonResponse({"status": "error", "message": "Method not allowed"}, status=405)

    request_data = _parse_request_data(request)

    name = request_data.get("name")
    email = request_data.get("email")
    phone = request_data.get("phone")
    address1 = request_data.get("address1")
    address2 = request_data.get("address2", "")
    city = request_data.get("city")
    state = request_data.get("state")
    pincode = request_data.get("pincode")
    amount_value = request_data.get("amount")
    items = request_data.get("items", [])

    if isinstance(items, str):
        try:
            items = json.loads(items)
        except json.JSONDecodeError:
            items = []

    missing = _get_missing_fields(
        request_data,
        ["name", "email", "phone", "address1", "city", "state", "pincode", "amount"],
    )
    if missing:
        return JsonResponse(
            {"status": "error", "message": f"Missing required fields: {', '.join(missing)}"},
            status=400,
        )

    if not items:
        return JsonResponse({"status": "error", "message": "Cart is empty"}, status=400)

    try:
        amount = _parse_amount(amount_value)
    except ValueError as exc:
        return JsonResponse({"status": "error", "message": str(exc)}, status=400)

    try:
        with transaction.atomic():
            order = Order.objects.create(
                name=name,
                email=email,
                phone=phone,
                address1=address1,
                address2=address2,
                city=city,
                state=state,
                pincode=pincode,
                amount=amount,
                payment_method="Cash On Delivery",
                status="Pending",
            )

            for item in items:
                product_id = item.get('id')
                product_name = item.get('name', 'Product')
                quantity = int(item.get('qty') or item.get('quantity') or 1)
                price = int(item.get('price') or 0)

                product = None
                if product_id:
                    product = Product_list.objects.filter(id=product_id).first()
                    if product:
                        product_name = product.name
                        if product.stock > 0:
                            product.stock = max(0, product.stock - quantity)
                            product.save(update_fields=['stock'])

                OrderItem.objects.create(
                    order=order,
                    product=product,
                    product_name=product_name,
                    quantity=quantity,
                    price=price,
                )

            logger.info("COD order created. DB ID: %s, Order Number: %s", order.id, order.order_number)

            return JsonResponse({
                "status": "success",
                "order_id": order.id,
                "order_number": order.order_number,
                "customer_name": order.name,
                "payment_method": order.payment_method,
                "amount": order.amount,
                "order_date": order.create_at.strftime("%B %d, %Y"),
                "estimated_delivery": (order.create_at + timedelta(days=5)).strftime("%B %d, %Y"),
                "message": "Order placed successfully",
            })

    except Exception:
        logger.exception("Error in Checkout view:")
        return JsonResponse({"status": "error", "message": "Unable to place order"}, status=500)


def Order_success(request):
    order_ref = request.GET.get("order_id") or request.GET.get("order_number")
    order = None
    if order_ref:
        order = Order.objects.filter(
            Q(order_number=order_ref) | Q(order_id=order_ref)
        ).first()
        if not order and str(order_ref).isdigit():
            order = Order.objects.filter(id=int(order_ref)).first()
        if order:
            logger.info("Rendering success page for order: %s", order_ref)
        else:
            logger.warning("Success page requested for missing order: %s", order_ref)
    return render(request, "order_success.html", {"order": order})


def Track_order(request):
    order = None
    error = None
    order_ref = ''

    if request.method == 'POST':
        order_ref = request.POST.get('order_ref', '').strip()
    else:
        order_ref = (
            request.GET.get('order_ref', '').strip() or
            request.GET.get('order_number', '').strip() or
            request.GET.get('order_id', '').strip()
        )

    if order_ref:
        query = Q(order_number__iexact=order_ref) | Q(order_id__iexact=order_ref)
        if order_ref.isdigit():
            query |= Q(id=int(order_ref))
        order = Order.objects.filter(query).first()
        if not order:
            error = 'No order found with that Order ID or Order Number.'
    elif request.method == 'POST':
        error = 'Please enter your Order ID or Order Number.'

    return render(request, 'track_order.html', {
        'order': order,
        'error': error,
        'order_ref': order_ref,
    })
