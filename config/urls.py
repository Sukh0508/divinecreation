
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from main.views import Home, Checkout, Order_success, Track_order

urlpatterns = [
    path('jet/', include('jet.urls', 'jet')),
    path('admin/', admin.site.urls),
    path('', Home, name="home"),
    path("checkout/", Checkout, name="checkout"),
    path("order-success/", Order_success, name="order_success"),
    path("track-order/", Track_order, name="track_order"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
