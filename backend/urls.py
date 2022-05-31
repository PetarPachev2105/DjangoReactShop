from rest_framework import routers, serializers, viewsets
from .models import *
from .serializers import *
from .views import *
from django.urls import path , include
from rest_framework.response import Response 
from rest_framework_jwt.views import obtain_jwt_token
                        
router = routers.DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'carts', CartViewSet, basename='user_id')
router.register(r'cart_entrys', CartEntryViewSet, basename='user_id')
router.register(r'orders', OrderViewSet, basename='user_id')

urlpatterns = [
    path('', include(router.urls)),
    path('token-auth/', obtain_jwt_token),
    path('current_user/', current_user),
    path('users/', UserList.as_view()),
    path('order_lines/<int:order_id>/', OrderLineView.as_view())
]