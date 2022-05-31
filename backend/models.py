from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model

class Product(models.Model):
    name = models.CharField(max_length=30)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='product_images')
    description = models.CharField(max_length=250)
    publish_date = models.DateField(default=timezone.now)

    def __str__(self): 
        return "{}".format(self.name) 

class Cart(models.Model):
    user = models.ForeignKey(User, related_name='cart', on_delete=models.CASCADE)
    total = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    def __str__(self): 
        return "{}'s cart.".format(self.user.username) 

class CartEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=0)
    
    def __str__(self): 
        return "{} x {}.".format(self.quantity, self.product)

@receiver(post_save, sender=CartEntry) 
def update_cart(sender, instance, **kwargs): 
    instance.cart.total += (instance.quantity * instance.product.price)

@receiver(post_save, sender=get_user_model())
def create_user_cart(sender, instance, created, **kwargs):
    if created:
        Cart.objects.create(user=instance)  

class Order(models.Model):
    user = models.ForeignKey(User ,blank=True, on_delete=models.CASCADE)
    total = models.DecimalField(decimal_places=2, max_digits=10, default=0)
    def __str__(self):
        return "{}'s order" .format(self.user.username)
    
class OrderLine(models.Model):    
    user = models.ForeignKey(User,  blank=True, on_delete=models.CASCADE) 
    order = models.ForeignKey(Order, null=True , on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE) 
    quantity = models.PositiveIntegerField(default=1)
    def __str__(self): 
        return "This order line contains {} {}(s).".format(self.quantity, self.product.name)               

@receiver(post_save, sender=OrderLine) 
def update_order(sender, instance, **kwargs): 
    instance.order.total += (instance.quantity * instance.product.price)