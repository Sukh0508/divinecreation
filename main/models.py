from django.db import models


class Home_background_img(models.Model):
    image = models.ImageField(upload_to="home_image")
    image2 = models.ImageField(upload_to="home_image")
    image3 = models.ImageField(upload_to="home_image")


class Category(models.Model):
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to="category")
    product_type = models.CharField(max_length=100)

    def __str__(self):
        return self.title


class Product_list(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('inactive', 'Inactive'),
    ]

    name = models.CharField(max_length=100)
    cat = models.CharField(max_length=100)
    price = models.IntegerField(null=True, blank=True)
    old = models.IntegerField(null=True, blank=True)
    image = models.ImageField(upload_to="product", blank=True, null=True)
    stars = models.CharField(max_length=10)
    desc = models.TextField()
    sku = models.CharField(max_length=100, unique=True, blank=True, null=True)
    stock = models.IntegerField(default=0)
    brand = models.CharField(max_length=100, blank=True, default='')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')

    def __str__(self):
        return self.name


class ProductImage(models.Model):
    product = models.ForeignKey(
        Product_list,
        on_delete=models.CASCADE,
        related_name="gallery"
    )
    image = models.ImageField(upload_to="product/gallery")

    def __str__(self):
        return self.product.name


class About_img(models.Model):
    image = models.ImageField(upload_to='about')


class Client_review(models.Model):
    name = models.CharField(max_length=100)
    review = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Order(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Confirmed', 'Confirmed'),
        ('Packed', 'Packed'),
        ('Shipped', 'Shipped'),
        ('Out for Delivery', 'Out for Delivery'),
        ('Delivered', 'Delivered'),
        ('Cancelled', 'Cancelled'),
        ('Paid', 'Paid'),
        ('Failed', 'Failed'),
    ]

    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)

    address1 = models.CharField(max_length=300)
    address2 = models.CharField(max_length=300, blank=True)

    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100, blank=True, null=True)
    pincode = models.CharField(max_length=100)

    amount = models.IntegerField()
    payment_id = models.CharField(max_length=200, blank=True)
    order_id = models.CharField(max_length=100, blank=True)
    order_number = models.CharField(max_length=50, unique=True, blank=True, null=True)
    payment_method = models.CharField(max_length=50, default='Cash On Delivery')
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default="Pending")

    create_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        is_new = self.pk is None
        super().save(*args, **kwargs)
        if is_new and not self.order_number:
            self.order_number = f"DC-{self.create_at.strftime('%Y%m%d')}-{self.id:05d}"
            super().save(update_fields=['order_number'])

    def __str__(self):
        return f"{self.name} - {self.order_number or self.order_id} ({self.status})"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product_list, on_delete=models.SET_NULL, null=True, blank=True)
    product_name = models.CharField(max_length=200)
    quantity = models.PositiveIntegerField(default=1)
    price = models.IntegerField()

    def __str__(self):
        return f"{self.product_name} x{self.quantity}"

    @property
    def line_total(self):
        return self.price * self.quantity


class Payment(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="payments")
    payment_id = models.CharField(max_length=200, unique=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=50, default="captured")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment {self.payment_id} - {self.status}"


class Contact(models.Model):
    subject_choice = [
        ('order', 'Order Enquiry'),
        ('custom', 'Custom Order'),
        ('return', 'Return / Exchange'),
        ('other', 'Other'),
    ]
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    phone = models.CharField(max_length=10, blank=True, null=True)

    subject = models.CharField(
        max_length=20,
        choices=subject_choice,
        default="other"
    )
    msg = models.TextField()
    create_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Privacy_Policy(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    update_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class term_conditions(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    last_update = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
