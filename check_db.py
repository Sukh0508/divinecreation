import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from main.models import Order, Payment

print("--- ORDERS ---")
orders = Order.objects.all().order_by('-create_at')[:10]
for o in orders:
    print(f"ID: {o.id}, Name: {o.name}, Email: {o.email}, Phone: {o.phone}, Amount: {o.amount}, Order ID: {o.order_id}, Payment ID: {o.payment_id}, Status: {o.status}, Created: {o.create_at}")

print("\n--- PAYMENTS ---")
payments = Payment.objects.all().order_by('-created_at')[:10]
for p in payments:
    print(f"ID: {p.id}, Order ID: {p.order.id}, Payment ID: {p.payment_id}, Amount: {p.amount}, Status: {p.status}, Created: {p.created_at}")
