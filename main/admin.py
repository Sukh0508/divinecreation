from django.contrib import admin
from django.contrib.admin import AdminSite
from import_export.admin import ImportExportModelAdmin

from .models import Home_background_img , Category , Product_list ,About_img ,Client_review ,Order ,Contact, Payment,ProductImage

admin.site.site_header = "Divine Creation"
admin.site.site_title = "My Admin Portal"
admin.site.index_title = "Welcome to Dashboard"



admin.site.register(Home_background_img)
admin.site.register(Category)
class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 4


@admin.register(Product_list)
class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductImageInline]





admin.site.register(About_img)
admin.site.register(Client_review)

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "email", "phone", "amount", "order_id", "payment_id", "status", "create_at")
    list_filter = ("status", "create_at")
    search_fields = ("name", "email", "phone", "order_id", "payment_id")
    ordering = ("-create_at",)

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ("id", "order", "payment_id", "amount", "status", "created_at")
    list_filter = ("status", "created_at")
    search_fields = ("payment_id", "order__order_id", "order__name")
    ordering = ("-created_at",)

admin.site.register(Contact)


