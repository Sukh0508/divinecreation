from django.db import models
from core.models import Shop, TimestampedModel, Product

class Customer(TimestampedModel):
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE, help_text="Select the shop to which this customer belongs.")
    name = models.CharField(max_length=200)
    mobile = models.CharField(max_length=10)
    email = models.EmailField(null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    city = models.CharField(max_length=50, null=True, blank=True)
    pincode = models.CharField(max_length=6, null=True, blank=True)

    def __str__(self):
        return f"{self.shop} {self.name} {self.mobile}"

class CustomerPayment(TimestampedModel):
    RAZORPAY = 1
    PROVIDER_CHOICES = (
        (RAZORPAY, 'RazorPay'),
    )
    INR = 1
    CURRENCY_CHOICES = (
        (INR, 'INR'),
    )

    shop = models.ForeignKey(Shop, on_delete=models.CASCADE, help_text="Select the shop to which this payment belongs.")
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True, help_text="Select the shop to which this payment belongs.")
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, help_text="Select the shop to which this payment belongs.")
    reference_id = models.CharField(max_length=50)
    payment_id = models.CharField(max_length=50)
    short_url = models.CharField(max_length=100)
    provider = models.SmallIntegerField(default=RAZORPAY, choices=CURRENCY_CHOICES)
    currency = models.SmallIntegerField(default=INR, choices=CURRENCY_CHOICES)
    amount = models.FloatField()
    discount_percentage = models.FloatField(null=True, blank=True)
    status = models.BooleanField(default=False)
    status_str = models.CharField(max_length=20)
    full_payment = models.BooleanField(default=False)

    request_json = models.JSONField()
    response_json = models.JSONField(null=True, blank=True)

    def __str__(self):
        return f"{self.shop} {self.reference_id} {self.status_str}"