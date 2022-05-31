from rest_framework import serializers
from .models import *
from rest_framework.response import Response 
from rest_framework_jwt.settings import api_settings

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username')      

class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('id', 'token', 'username', 'password')

class ProductSerializer(serializers.ModelSerializer):
    publish_date = serializers.ReadOnlyField(read_only=True)
    class Meta:
        model = Product
        fields =['id', 'url', 'name', 'image', 'price', 'description', 'publish_date']
        
class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields =['id', 'user', 'total']
        read_only_fields = ('total', 'user')

class CartEntrySerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    product_price = serializers.DecimalField(max_digits=5, decimal_places=2, source='product.price', read_only=True)
    class Meta:
        model = CartEntry
        fields =['id', 'user', 'cart', 'product', 'product_name', 'product_price', 'quantity']
     
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields =['id', 'user', 'total']        

class OrderLineSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    product_price = serializers.DecimalField(max_digits=5, decimal_places=2, source='product.price', read_only=True)

    class Meta:
        model = OrderLine
        fields =['id', 'user', 'order', 'product', 'product_name', 'product_price' ,'quantity']