from django.urls import path,include
from . import views

urlpatterns = [
    path('jet/', include('jet.urls', 'jet')),
    path('request/', views.payment_view, name='payment'),
    path('status/<str:reference_id>/', views.payment_status, name='payment-status'),
    path('webhooks/', views.payment_webhooks, name='payment-webhooks'),
    
]