
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path ,include
from main.views import Home
from main.views import Checkout
# from main.views import Bulk_import

urlpatterns = [
    path('jet/', include('jet.urls', 'jet')),
    path('admin/', admin.site.urls),
    path('', Home , name="home"),
    path("checkout/", Checkout, name="checkout"),
    # path('contact/', Contact_view, name='contact'),
#  path("bulk-import/", Bulk_import, name="bulk_import")
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL ,document_root= settings.MEDIA_ROOT)

