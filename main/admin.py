import csv
import io

from django.contrib import admin
from django.http import HttpResponse
from django.urls import path
from import_export.admin import ImportExportModelAdmin

from .models import (
    Home_background_img, Category, Product_list, About_img, Client_review,
    Order, OrderItem, Contact, Payment, ProductImage, Privacy_Policy, term_conditions,
)
from .resources import ProductResource

admin.site.site_header = "Divine Creation"
admin.site.site_title = "My Admin Portal"
admin.site.index_title = "Welcome to Dashboard"


admin.site.register(Home_background_img)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('title', 'product_type')
    search_fields = ('title', 'product_type')


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 4


@admin.register(Product_list)
class ProductAdmin(ImportExportModelAdmin):
    resource_class = ProductResource
    inlines = [ProductImageInline]
    list_display = ('name', 'sku', 'cat', 'brand', 'price', 'old', 'stock', 'status')
    list_filter = ('status', 'cat', 'brand')
    search_fields = ('name', 'sku', 'cat', 'brand')
    ordering = ('name',)

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path(
                'download-sample/',
                self.admin_site.admin_view(self.download_sample),
                name='main_product_list_download_sample',
            ),
        ]
        return custom_urls + urls

    def download_sample(self, request):
        format_type = request.GET.get('format', 'csv')
        headers = [
            'sku', 'name', 'category', 'price', 'discount_price',
            'description', 'stock', 'brand', 'status', 'stars', 'product_images',
        ]
        sample_row = [
            'DC-SKU-001',
            'Sample Divine Product',
            'gifting',
            '999',
            '1299',
            'Handcrafted sample product for import template.',
            '25',
            'Divine Creations',
            'active',
            '★★★★★',
            'https://example.com/sample-image.jpg',
        ]

        if format_type == 'xlsx':
            from tablib import Dataset
            dataset = Dataset(headers=headers)
            dataset.append(sample_row)
            response = HttpResponse(
                dataset.export('xlsx'),
                content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            )
            response['Content-Disposition'] = 'attachment; filename="product_import_sample.xlsx"'
            return response

        output = io.StringIO()
        writer = csv.writer(output)
        writer.writerow(headers)
        writer.writerow(sample_row)
        response = HttpResponse(output.getvalue(), content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="product_import_sample.csv"'
        return response


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ('product_name', 'quantity', 'price')


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'order_number', 'name', 'email', 'phone',
        'amount', 'payment_method', 'status', 'create_at',
    )
    list_filter = ('status', 'payment_method', 'create_at')
    search_fields = ('name', 'email', 'phone', 'order_number', 'order_id', 'payment_id')
    ordering = ('-create_at',)
    readonly_fields = ('order_number', 'create_at', 'payment_id', 'order_id')
    inlines = [OrderItemInline]
    fieldsets = (
        ('Order Info', {
            'fields': ('order_number', 'order_id', 'status', 'payment_method', 'amount', 'create_at'),
        }),
        ('Customer', {
            'fields': ('name', 'email', 'phone'),
        }),
        ('Shipping Address', {
            'fields': ('address1', 'address2', 'city', 'state', 'pincode'),
        }),
        ('Legacy Payment', {
            'fields': ('payment_id',),
            'classes': ('collapse',),
        }),
    )


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('id', 'order', 'payment_id', 'amount', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('payment_id', 'order__order_number', 'order__order_id', 'order__name')
    ordering = ('-created_at',)


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'subject', 'create_at')
    list_filter = ('subject', 'create_at')
    search_fields = ('name', 'email', 'phone')
    ordering = ('-create_at',)


admin.site.register(Privacy_Policy)
admin.site.register(term_conditions)
admin.site.register(About_img)
admin.site.register(Client_review)
