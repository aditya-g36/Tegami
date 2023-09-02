from django.http import JsonResponse 
from rest_framework.response import Response
from rest_framework.decorators import api_view 
from rest_framework.views import APIView

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from home.models import Posts
from .serializers import ItemSerializer

from home.models import User,UserFollowing
from .serializers import RegisterSerializer,UserSerializer,UserFollowingSerializer,PostsSerializer
from rest_framework import generics
from rest_framework.viewsets import ModelViewSet

from rest_framework.parsers import (MultiPartParser,FormParser)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
    ]
    return Response(routes)


class FeedView(APIView):
    def post(self, request):
        user_id = request.data.get('user_id')  
        user_posts = Posts.objects.filter(user_id=user_id)
        serializer = PostsSerializer(user_posts, many=True)
        return Response(serializer.data)
   

    

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

class CreatePost(ModelViewSet):
    parser_classes=[FormParser,MultiPartParser]
    queryset = Posts.objects.all()
    serializer_class = ItemSerializer

@api_view(['GET'])
def ProfileView(request):
    user=User.objects.all()
    serializer= UserSerializer(user,many=True)
    return Response(serializer.data)

class UserFollowingViewSet(ModelViewSet):
    serializer_class = UserFollowingSerializer
    queryset = UserFollowing.objects.all()

    


