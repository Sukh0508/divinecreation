from django.db import models

# Create your models here.
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
    name = models.CharField(max_length=100)
    cat = models.CharField(max_length=100)
    price = models.IntegerField(null=True , blank=True)
    old = models.IntegerField(null=True, blank=True)
    image = models.ImageField(upload_to="product",blank=True,null=True)
    stars = models.CharField(max_length=10) 
    desc= models.TextField()
   

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
    image = models.ImageField(upload_to= 'about')

class Client_review(models.Model):
    name = models.CharField(max_length=100)
    review = models.CharField(max_length=200)
    
    def __str__(self):
        return self.name 
    

class Order(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)

    address1 = models.CharField(max_length=300)
    address2 = models.CharField(max_length=300,blank=True)

    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100, blank=True, null=True)
    pincode = models.CharField(max_length=100)

    amount = models.IntegerField()
    payment_id = models.CharField(max_length=200,blank=True)
    order_id = models.CharField(max_length=100,blank=True)
    status = models.CharField(max_length=20, default="Pending")

    create_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.order_id} ({self.status})"


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
    phone = models.CharField(max_length=10 , blank=True, null=True)

    subject = models.CharField(
        max_length=20,
        choices=subject_choice,
        default="other"
    )
    msg = models.TextField()
    create_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    