from django.http import HttpResponseRedirect
from django.shortcuts import render 
from rest_framework.views import APIView 
from rest_framework.decorators import api_view
from rest_framework import routers, serializers, viewsets
from . models import *
from rest_framework.response import Response 
from .serializers import * 
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework import status, permissions
from rest_framework.decorators import action
from rest_framework.pagination import PageNumberPagination

class DefaultResultsSetPagination(PageNumberPagination):
    page_size = 9
    page_size_query_param = 'page_size'
    max_page_size = 9

@api_view(['GET'])
def current_user(request):
    user = request.user
    return Response({
        'username': user.username,
        'id': user.id,
    })        

class UserList(APIView):

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
           
class ProductViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny,)
    queryset = Product.objects.order_by('-price')
    serializer_class = ProductSerializer
    pagination_class = DefaultResultsSetPagination

class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    lookup_field = "user_id"

    def get_queryset(self):
        user_id = self.request.user.id
        if user_id:
            return Cart.objects.filter(user=user_id)
        else:
            return Cart.objects.none()

    @action(detail=True, methods=['post', 'put'])
    def purchase(self, request, user_id ,format=None):
        serializer = CartSerializer(data=request.data)
        if serializer.is_valid():
            cart = self.get_object()
            new_order = Order.objects.create(user=request.user, total=cart.total)
            for cart_entries in CartEntry.objects.filter(cart=cart):
                new_order_line = OrderLine(user=request.user, product=cart_entries.product, quantity=cart_entries.quantity, order=new_order)
                new_order_line.save()
                cart_entries.delete()
            cart.total = 0
            cart.save()          
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post', 'put'])
    def clear_cart(self, request, user_id ,format=None):
        serializer = CartSerializer(data=request.data)
        if serializer.is_valid():
            cart = self.get_object()
            cart_entries = CartEntry.objects.filter(cart=cart)
            for cart_entry in cart_entries:
                cart_entry.delete()
            cart.total = 0
            cart.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

class CartEntryViewSet(viewsets.ModelViewSet):

    serializer_class = CartEntrySerializer
    lookup_field = "user_id"

    def get_queryset(self):
        user_id = self.request.user.id
        if user_id:
            return CartEntry.objects.filter(user=user_id)
        else:
            return CartEntry.objects.none()    

    @action(detail=True, methods=['post', 'put'])
    def add_to_cart(self, request, user_id ,format=None):
        serializer = CartEntrySerializer(data=request.data)
        if serializer.is_valid():
            product = Product.objects.get(
                pk=request.data['product']
            )
            cart = Cart.objects.get(
                pk=request.data['cart']
            )
            quantity = int(request.data['quantity'])
            cart.total += (product.price * quantity)
            cart.save() 
            existing_cart_entry = CartEntry.objects.filter(cart=cart,product=product).first()
            if existing_cart_entry:
                existing_cart_entry.quantity += quantity
                existing_cart_entry.save()
            else:
                new_cart_entry = CartEntry(user=request.user, cart=cart, product=product, quantity=quantity)
                new_cart_entry.save()      
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post', 'put'])
    def remove_one_from_cart(self, request, user_id ,format=None):
        serializer = CartEntrySerializer(data=request.data)
        if serializer.is_valid():
            product = Product.objects.get(
                pk=request.data['product']
            )
            user = request.user
            cart = Cart.objects.get(
                pk=request.data['cart']
            )
            existing_cart_entry = CartEntry.objects.get(user=user, cart=cart, product=product)
            if existing_cart_entry.quantity == 1:
                existing_cart_entry.delete()
            else:
                existing_cart_entry.quantity -= 1
                existing_cart_entry.save()
            cart.total -= product.price
            cart.save()        
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post', 'put'])
    def add_one_to_cart(self, request, user_id ,format=None):
        serializer = CartEntrySerializer(data=request.data)
        if serializer.is_valid():
            product = Product.objects.get(
                pk=request.data['product']
            )
            user = request.user
            cart = Cart.objects.get(
                pk=request.data['cart']
            )
            existing_cart_entry = CartEntry.objects.get(user=user, cart=cart, product=product)
            existing_cart_entry.quantity += 1
            existing_cart_entry.save()
            cart.total += product.price
            cart.save()        
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post', 'put'])
    def remove_cart_entry(self, request, user_id ,format=None):
        serializer = CartEntrySerializer(data=request.data)
        if serializer.is_valid():
            product = Product.objects.get(
                pk=request.data['product']
            )
            user = request.user
            cart = Cart.objects.get(
                pk=request.data['cart']
            )
            existing_cart_entry = CartEntry.objects.get(user=user, cart=cart, product=product)
            cart.total -= existing_cart_entry.quantity * existing_cart_entry.product.price
            cart.save()   
            existing_cart_entry.delete()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)   
              

    def retrieve(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.get_queryset(), many=True)
        return Response(data=serializer.data)


class OrderViewSet(viewsets.ModelViewSet):

    serializer_class = OrderSerializer
    lookup_field = "user_id"

    def get_queryset(self):
        user_id = self.request.user.id
        if user_id:
            return Order.objects.filter(user=user_id)
        else:
            return Order.objects.none()

    def retrieve(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.get_queryset(), many=True)
        return Response(data=serializer.data)     

class OrderLineView(APIView):
    permission_classes = (permissions.IsAuthenticated,) 
    serializer_class = OrderLineSerializer 
    def get(self, request, order_id):
        user_id = self.request.user.id
        detail = [ {"id": detail.id,
                    "user": detail.user.id,
                    "order": detail.order.id,
                    "product": detail.product.id,
                    "product_name": detail.product.name,
                    "product_price": detail.product.price,
                    "quantity":detail.quantity,
                    }             
        for detail in OrderLine.objects.filter(user=user_id, order=order_id)] 
        return Response(detail)
