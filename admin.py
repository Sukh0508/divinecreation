from django.contrib import admin
from payment.models import *





class ReadOnlyAdmin(admin.ModelAdmin):
    def has_change_permission(self, request, obj=None):
        return False
    
    def has_delete_permission(self, request, obj=None):
        return False

@admin.register(Customer)
class CustomerAdmin(ReadOnlyAdmin):
    list_display = ('shop', 'name', 'mobile',)
    list_per_page = 5
    list_filter = ('created_at',)
    autocomplete_fields = ('shop',)

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_internal:
            return qs
        return qs.filter(shop=request.user.shop)

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "shop":
            if not request.user.is_internal:
                kwargs["queryset"] = Shop.objects.filter(id=request.user.shop.id)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

    def has_change_permission(self, request, obj=None):
        return False
    
    def has_delete_permission(self, request, obj=None):
        return False

@admin.register(CustomerPayment)
class CustomerPaymentAdmin(ReadOnlyAdmin):
    list_display = ('shop', 'reference_id', 'status_str', 'amount')
    list_per_page = 5
    list_filter = ('status_str', 'created_at',)
    autocomplete_fields = ('shop', 'product',)

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_internal:
            return qs
        return qs.filter(shop=request.user.shop)

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "shop":
            if not request.user.is_internal:
                kwargs["queryset"] = Shop.objects.filter(id=request.user.shop.id)
        if db_field.name == "product":
            if not request.user.is_internal:
                kwargs["queryset"] = Product.objects.filter(id=request.user.shop.id)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)
    
    def has_change_permission(self, request, obj=None):
        return False
    
    def has_delete_permission(self, request, obj=None):
        return False