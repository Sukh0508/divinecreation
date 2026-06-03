import razorpay
from django.http import JsonResponse
# from django.contrib import messages
from django.shortcuts import render ,redirect
from django.conf import settings
from main.models import Order 
from .models import Home_background_img ,Category , Product_list ,About_img , Client_review,Contact
# from main.form import BulkImportForm

# Create your views here.
def Home(request) :
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
     
    return render(request,"index.html",{
        "home_image":home_image,
        "category": category,
        "products":products,
        "about":about,
        "client":client,
        
    })

def Checkout(request):
    if request.method == "POST":
         print(request.POST)
       
         amount = request.POST.get("amount", "0")
         amount = amount.replace(",", "")
         amount = int(amount)

 
         client = razorpay.Client(auth=(
               settings.RAZORPAY_KEY_ID,
               settings.RAZORPAY_KEY_SECRET
            ))
         order = client.order.create({
                 "amount": amount * 100,
                 "currency": "INR",
                 "payment_capture": 1
              })
           
  
         return JsonResponse({
             "order_id": order["id"],
             "amount": amount
             # "key": settings.RAZORPAY_KEY_ID
         })

def Payment_success(request):
     if request.method == "POST":
          payment_id = request.POST.get("payment_id")
          order_id = request.POST.get("order_id")

          name = request.POST.get("name")
          email = request.POST.get("email")
          phone = request.POST.get("phone")
          address1 = request.POST.get("address1")
          address2 = request.POST.get("address2")
          city = request.POST.get("city")
          pincode = request.POST.get("pincode")

          amount = request.POST.get("amount", "0")
          amount = amount.replace(",", "")
          amount = int(amount)

          
          Order.objects.create(
                 name=name,
                 email=email,
                 phone=phone,
                 address1=address1,
                 address2=address2,
                 city=city,
                 pincode=pincode,
                 amount=amount,
                 payment_id=payment_id,
                 order_id=order_id
       
         ) 
          
          return JsonResponse({"status" : "success"})



