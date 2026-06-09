import razorpay
import logging
import json
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from main.models import Order, Payment
from .models import Home_background_img, Category, Product_list, About_img, Client_review, Contact

# Configure logger
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
    products = Product_list.objects.all()
    about = About_img.objects.first()
    client = Client_review.objects.all()

    if request.method == "POST":
        print("POST:", request.POST)
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
    })

@csrf_exempt
def Checkout(request):
    if request.method != "POST":
        logger.warning("Checkout called with non-POST method: %s", request.method)
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

    missing = _get_missing_fields(request_data, ["name", "email", "phone", "address1", "city", "state", "pincode", "amount"])
    if missing:
        logger.error("Checkout request missing required fields: %s", missing)
        return JsonResponse({"status": "error", "message": f"Missing required fields: {', '.join(missing)}"}, status=400)

    try:
        amount = _parse_amount(amount_value)
    except ValueError as exc:
        logger.error("Invalid amount provided: %s", amount_value)
        return JsonResponse({"status": "error", "message": str(exc)}, status=400)

    try:
        logger.info("Checkout requested for Customer: %s, Email: %s, Amount: %s", name, email, amount)

        client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
        razorpay_order_payload = {
            "amount": amount * 100,
            "currency": "INR",
            "payment_capture": 1
        }
        logger.info("Sending order creation request to Razorpay: %s", razorpay_order_payload)
        razorpay_order = client.order.create(razorpay_order_payload)
        razorpay_order_id = razorpay_order.get("id")
        if not razorpay_order_id:
            logger.error("Razorpay order create response missing 'id': %s", razorpay_order)
            return JsonResponse({"status": "error", "message": "Unable to create Razorpay order"}, status=500)

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
            order_id=razorpay_order_id,
            status="Pending"
        )
        logger.info("Pending Order created in database. DB ID: %s, Razorpay Order ID: %s", order.id, order.order_id)

        return JsonResponse({
            "status": "success",
            "order_id": razorpay_order_id,
            "amount": amount * 100,
            "currency": "INR",
            "key": settings.RAZORPAY_KEY_ID
        })

    except razorpay.errors.BadRequestError as e:
        logger.exception("Razorpay order creation failed:")
        return JsonResponse({"status": "error", "message": "Razorpay order creation failed"}, status=400)
    except Exception as e:
        logger.exception("Error in Checkout view:")
        return JsonResponse({"status": "error", "message": "Unable to create payment order"}, status=500)


@csrf_exempt
def Payment_success(request):
    if request.method != "POST":
        logger.warning("Payment_success called with non-POST method: %s", request.method)
        return JsonResponse({"status": "error", "message": "Method not allowed"}, status=405)

    request_data = _parse_request_data(request)
    razorpay_payment_id = request_data.get("razorpay_payment_id")
    razorpay_order_id = request_data.get("razorpay_order_id")
    razorpay_signature = request_data.get("razorpay_signature")

    logger.info("Payment success callback received. Payload keys: %s", list(request_data.keys()))
    logger.debug("Payment success payload: %s", request_data)

    missing = _get_missing_fields(request_data, ["razorpay_payment_id", "razorpay_order_id", "razorpay_signature"])
    if missing:
        logger.error("Payment success request missing required fields: %s", missing)
        return JsonResponse({"status": "error", "message": f"Missing required parameters: {', '.join(missing)}"}, status=400)

    client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
    params_dict = {
        "razorpay_order_id": razorpay_order_id,
        "razorpay_payment_id": razorpay_payment_id,
        "razorpay_signature": razorpay_signature
    }

    try:
        logger.info("Verifying Razorpay payment signature for order_id: %s", razorpay_order_id)
        client.utility.verify_payment_signature(params_dict)
        logger.info("Signature verified successfully for order_id: %s", razorpay_order_id)
    except razorpay.errors.SignatureVerificationError as e:
        logger.error("Razorpay signature verification failed: %s", str(e))
        return JsonResponse({"status": "failed", "message": "Payment signature verification failed"}, status=400)
    except Exception as e:
        logger.exception("Unexpected error during signature verification:")
        return JsonResponse({"status": "failed", "message": "Error verifying payment signature"}, status=500)

    try:
        order = Order.objects.get(order_id=razorpay_order_id)
    except Order.DoesNotExist:
        logger.error("Database mismatch: Order ID %s not found in local DB.", razorpay_order_id)
        return JsonResponse({"status": "error", "message": "Order not found"}, status=404)

    if order.status != "Paid":
        order.status = "Paid"
        order.payment_id = razorpay_payment_id
        order.save(update_fields=["status", "payment_id"])
        logger.info("Order %s updated to Paid status in Payment_success.", order.id)
    else:
        logger.info("Order %s already marked Paid; skipping duplicate update.", order.id)

    payment, created = Payment.objects.get_or_create(
        payment_id=razorpay_payment_id,
        defaults={
            "order": order,
            "amount": order.amount,
            "status": "captured"
        }
    )
    if created:
        logger.info("Payment record created for payment_id: %s", razorpay_payment_id)
    else:
        logger.info("Existing payment record found for payment_id: %s", razorpay_payment_id)

    return JsonResponse({"status": "success", "message": "Payment verified and order marked Paid."})


def Order_success(request):
    order_id = request.GET.get("order_id")
    order = None
    if order_id:
        try:
            order = Order.objects.get(order_id=order_id)
            logger.info("Rendering success page for order: %s", order_id)
        except Order.DoesNotExist:
            logger.warning("Success page requested for missing order ID: %s", order_id)
    return render(request, "order_success.html", {"order": order})


@csrf_exempt
def Razorpay_webhook(request):
    if request.method != "POST":
        return JsonResponse({"status": "error", "message": "Method not allowed"}, status=405)

    payload = request.body.decode("utf-8")
    signature = request.headers.get("X-Razorpay-Signature")

    logger.info("Razorpay webhook callback received for path: %s", request.path)

    if not signature:
        logger.error("X-Razorpay-Signature header missing in webhook.")
        return JsonResponse({"status": "error", "message": "Signature header missing"}, status=400)

    client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
    webhook_secret = getattr(settings, "RAZORPAY_WEBHOOK_SECRET", "")
    if webhook_secret:
        try:
            client.utility.verify_webhook_signature(payload, signature, webhook_secret)
            logger.info("Webhook signature verified successfully.")
        except razorpay.errors.SignatureVerificationError as e:
            logger.error("Webhook signature verification failed: %s", str(e))
            return JsonResponse({"status": "error", "message": "Invalid webhook signature"}, status=400)
        except Exception as e:
            logger.exception("Unexpected error verifying webhook signature:")
            return JsonResponse({"status": "error", "message": "Webhook verification failed"}, status=400)
    else:
        logger.warning("RAZORPAY_WEBHOOK_SECRET not configured. Webhook signature check skipped.")

    try:
        data = json.loads(payload)
    except json.JSONDecodeError:
        logger.error("Webhook payload is not valid JSON.")
        return JsonResponse({"status": "error", "message": "Invalid JSON payload"}, status=400)

    event = data.get("event")
    logger.info("Webhook event received: %s", event)
    webhook_payload = data.get("payload", {})
    payment_entity = webhook_payload.get("payment", {}).get("entity")
    order_entity = webhook_payload.get("order", {}).get("entity")

    try:
        if event == "payment.captured" and payment_entity:
            razorpay_order_id = payment_entity.get("order_id")
            razorpay_payment_id = payment_entity.get("id")
            amount = payment_entity.get("amount", 0) / 100
            logger.info("Webhook payment.captured received. Order ID: %s, Payment ID: %s", razorpay_order_id, razorpay_payment_id)

            if razorpay_order_id:
                try:
                    order = Order.objects.get(order_id=razorpay_order_id)
                    if order.status != "Paid":
                        order.status = "Paid"
                        order.payment_id = razorpay_payment_id
                        order.save(update_fields=["status", "payment_id"])
                        logger.info("Order %s marked Paid by webhook.", razorpay_order_id)

                    payment, created = Payment.objects.get_or_create(
                        payment_id=razorpay_payment_id,
                        defaults={
                            "order": order,
                            "amount": amount,
                            "status": "captured"
                        }
                    )
                    if created:
                        logger.info("Webhook created payment record: %s", razorpay_payment_id)
                    else:
                        logger.info("Webhook found existing payment record: %s", razorpay_payment_id)
                except Order.DoesNotExist:
                    logger.error("Order %s not found in local DB while processing payment.captured webhook.", razorpay_order_id)

        elif event == "order.paid":
            razorpay_order_id = order_entity.get("id") if order_entity else None
            logger.info("Webhook order.paid received. Order ID: %s", razorpay_order_id)
            if razorpay_order_id:
                try:
                    order = Order.objects.get(order_id=razorpay_order_id)
                    if order.status != "Paid":
                        order.status = "Paid"
                        order.save(update_fields=["status"])
                        logger.info("Order %s marked Paid by webhook order.paid.", razorpay_order_id)
                except Order.DoesNotExist:
                    logger.error("Order %s not found in local DB while processing order.paid webhook.", razorpay_order_id)

        elif event == "payment.failed" and payment_entity:
            razorpay_order_id = payment_entity.get("order_id")
            razorpay_payment_id = payment_entity.get("id")
            error_desc = payment_entity.get("error_description") or payment_entity.get("error_reason") or "Payment failed"
            logger.warning("Webhook payment.failed received. Order ID: %s, Payment ID: %s, Reason: %s", razorpay_order_id, razorpay_payment_id, error_desc)

            if razorpay_order_id:
                try:
                    order = Order.objects.get(order_id=razorpay_order_id)
                    if order.status == "Pending":
                        order.status = "Failed"
                        order.save(update_fields=["status"])
                        logger.info("Order %s marked Failed by webhook.", razorpay_order_id)
                except Order.DoesNotExist:
                    logger.error("Order %s not found in local DB while processing payment.failed webhook.", razorpay_order_id)

        else:
            logger.info("Unhandled webhook event type: %s", event)

        return JsonResponse({"status": "success"})
    except Exception as e:
        logger.exception("Error processing Razorpay webhook payload:")
        return JsonResponse({"status": "error", "message": str(e)}, status=500)


