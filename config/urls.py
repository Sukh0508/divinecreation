
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path ,include
from main.views import Home, Checkout, Payment_success, Order_success, Razorpay_webhook

urlpatterns = [
    path('jet/', include('jet.urls', 'jet')),
    path('admin/', admin.site.urls),
    path('', Home , name="home"),
    path("checkout/", Checkout, name="checkout"),
    path("payment-success/", Payment_success, name="payment_success"),
    path("order-success/", Order_success, name="order_success"),
    path("razorpay-webhook/", Razorpay_webhook, name="razorpay_webhook"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL ,document_root= settings.MEDIA_ROOT)

    # path('contact/', Contact_view, name='contact'),
#  path("bulk-import/", Bulk_import, name="bulk_import")
