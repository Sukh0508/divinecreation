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
    review = models.CharField(max_length=100 , null=True , blank=True)
    desc= models.TextField()
    badge = models.CharField(max_length=20, null=True, blank=True) 
    badgeLabel = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
        return self.name 

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
    pincode = models.CharField(max_length=100)

    amount = models.IntegerField()

    payment_id = models.CharField(max_length=200,blank=True)
    order_id = models.CharField(max_length=100,blank=True)

    create_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


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
    