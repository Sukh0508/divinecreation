import razorpay
from django.http import JsonResponse
# from django.contrib import messages
from django.shortcuts import render ,redirect
from django.views.decorators.csrf import csrf_exempt
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

@csrf_exempt
def Checkout(request):
    print("CHECKOUT HIT")
    print(request.POST)
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
           
         print("RAZORPAY ORDER:", order)
  
         return JsonResponse({
             "order_id": order["id"],
             "amount": amount * 100
             # "key": settings.RAZORPAY_KEY_ID
         })

@csrf_exempt
def Payment_success(request):
    print("PAYMENT SUCCESS HIT")
    print(request.POST)
    
    if request.method == "POST":
        try:
            payment_id = request.POST.get("payment_id")
            order_id = request.POST.get("order_id")

            name = request.POST.get("name")
            email = request.POST.get("email")
            phone = request.POST.get("phone")
            address1 = request.POST.get("address1")
            address2 = request.POST.get("address2")
            city = request.POST.get("city")
            pincode = request.POST.get("pincode")

            # Safe conversion: Pehle float me convert karo fir int banao (taaki decimal crash na ho)
            amount_raw = request.POST.get("amount", "0")
            amount_clean = amount_raw.replace(",", "").strip()
            amount = int(float(amount_clean)) if amount_clean else 0

            # Database me order create karna
            new_order = Order.objects.create(
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
            print("ORDER SAVED SUCCESSFULLY:", new_order)
            
            # Yeh line frontend ko screen unfreeze karne ka order degi
            return JsonResponse({"status": "success"})
            
        except Exception as e:
            print("🔴 BACKEND ERROR DURING SAVING:", str(e))
            # Agar backend me kuch bhi fata, toh browser ko alert message bhej do freeze karne ki jagah
            return JsonResponse({"status": "failed", "message": str(e)}, status=500)

    return JsonResponse({"status": "invalid_method"}, status=400)



