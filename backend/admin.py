from django.contrib import admin
from .models import *

class CartEntryAdmin(admin.ModelAdmin):
    def save_model(self, request, obj, form, change):
        obj.cart.total += obj.quantity * obj.product.price
        obj.cart.save()
        super().save_model(request, obj, form, change)

class OrderLineAdmin(admin.ModelAdmin):
    def save_model(self, request, obj, form, change):
        obj.order.total += obj.quantity * obj.product.price
        obj.order.save()
        super().save_model(request, obj, form, change)

admin.site.register(Product)
admin.site.register(CartEntry, CartEntryAdmin)
admin.site.register(Cart)
admin.site.register(OrderLine, OrderLineAdmin)
admin.site.register(Order)   
