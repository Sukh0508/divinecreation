import os
import django
import razorpay

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.conf import settings

client = razorpay.Client(
    auth=(
        settings.RAZORPAY_KEY_ID,
        settings.RAZORPAY_KEY_SECRET
    )
)

print(f"Using Key ID: {settings.RAZORPAY_KEY_ID}")

# Check order_Sz5mZZz5MiU4e4
order_ids = ["order_Sz5mZZz5MiU4e4", "order_Sz5kojFKokDPkr"]

for order_id in order_ids:
    print(f"\n--- Fetching Razorpay Order: {order_id} ---")
    try:
        order = client.order.fetch(order_id)
        print("Order Details:")
        print(f"ID: {order.get('id')}, Amount: {order.get('amount')}, Status: {order.get('status')}, Payments Count: {order.get('attempts')}")
        
        # Fetch payments for this order
        payments = client.order.payments(order_id)
        print("Payments:")
        for p in payments.get('items', []):
            print(f"  Payment ID: {p.get('id')}, Amount: {p.get('amount')}, Status: {p.get('status')}, Method: {p.get('method')}, Error Code: {p.get('error_code')}, Error Desc: {p.get('error_description')}")
    except Exception as e:
        print(f"Error fetching order {order_id}: {e}")
