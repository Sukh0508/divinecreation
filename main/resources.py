import os
import uuid
from urllib.parse import urlparse

import requests
from django.core.files.base import ContentFile
from import_export import fields, resources
from import_export.widgets import CharWidget, IntegerWidget

from .models import Product_list


class ProductResource(resources.ModelResource):
    category = fields.Field(column_name='category', attribute='cat', widget=CharWidget())
    discount_price = fields.Field(column_name='discount_price', attribute='old', widget=IntegerWidget())
    description = fields.Field(column_name='description', attribute='desc', widget=CharWidget())
    product_images = fields.Field(column_name='product_images', attribute='image', readonly=False)

    class Meta:
        model = Product_list
        import_id_fields = ('sku',)
        skip_unchanged = True
        report_skipped = True
        fields = (
            'sku', 'name', 'category', 'price', 'discount_price',
            'description', 'stock', 'brand', 'status', 'stars', 'product_images',
        )
        export_order = fields

    def before_import_row(self, row, **kwargs):
        if not row.get('name'):
            raise ValueError('Product Name is required')
        if not row.get('sku'):
            raise ValueError('SKU is required')
        if row.get('price') in (None, ''):
            raise ValueError('Price is required')

        status = str(row.get('status') or 'active').strip().lower()
        if status not in ('active', 'inactive'):
            raise ValueError('Status must be active or inactive')
        row['status'] = status

        if not row.get('stars'):
            row['stars'] = '★★★★★'

    def after_save_instance(self, instance, row, **kwargs):
        image_value = row.get('product_images') or row.get('image') or ''
        image_value = str(image_value).strip()
        if not image_value:
            return

        urls = [part.strip() for part in image_value.split('|') if part.strip()]
        if not urls:
            return

        self._save_image_from_url(instance, urls[0])

    def _save_image_from_url(self, instance, url):
        try:
            response = requests.get(url, timeout=20)
            response.raise_for_status()
        except requests.RequestException:
            return

        parsed = urlparse(url)
        ext = os.path.splitext(parsed.path)[1] or '.jpg'
        filename = f"{instance.sku or uuid.uuid4().hex}{ext}"
        instance.image.save(filename, ContentFile(response.content), save=True)
