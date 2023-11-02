from django.http import JsonResponse 
from rest_framework.response import Response
from rest_framework.decorators import api_view 
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework import viewsets
from rest_framework import status,permissions
from django.shortcuts import get_object_or_404

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from home.models import Posts
from .serializers import ItemSerializer

from home.models import User,UserFollowing
from .serializers import RegisterSerializer,UserSerializer,UserFollowingSerializer,PostsSerializer
from rest_framework import generics
from rest_framework.viewsets import ModelViewSet
from django.db.models import Q

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
    
    def get(self, request):
        posts = Posts.objects.all().order_by('-date_posted')
        serializer = PostsSerializer(posts, many=True)  
        return Response(serializer.data)

    def post(self, request):
        user_id = request.data.get('user_id')  
        user_posts = Posts.objects.filter(user_id=user_id).order_by('-date_posted')
        serializer = PostsSerializer(user_posts, many=True)
        return Response(serializer.data)
   

    

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

class CreatePost(ModelViewSet):
    parser_classes=[FormParser,MultiPartParser]
    queryset = Posts.objects.all()
    serializer_class = ItemSerializer


class ProfileView(APIView):
    def post(self, request):
        user_id = request.data.get('user_id')  
        user_posts = User.objects.filter(id=user_id)
        serializer = UserSerializer(user_posts, many=True)
        return Response(serializer.data)

class UserFollowingViewSet(ModelViewSet):
    serializer_class = UserFollowingSerializer
    queryset = UserFollowing.objects.all()

class UserFollowingDeleteView(APIView):
    def post(self, request):
        user_id = request.data.get('user_id')
        following_user_id = request.data.get('following_user_id')
        try:
            user_following = UserFollowing.objects.get(
                user_id=user_id, following_user_id=following_user_id
            )
            serializer = UserFollowingSerializer(user_following)
            user_following.delete()
            return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
        except UserFollowing.DoesNotExist:
            return Response(
                {"detail": "UserFollowing not found."},
                status=status.HTTP_404_NOT_FOUND,
            )

    
class UserSearchView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    def get_queryset(self):
        query = self.request.GET.get('q', '')
        return User.objects.filter(
            Q(first_name__icontains=query) |
            Q(last_name__icontains=query) |
            Q(username__icontains=query)
        )


class LikePostViewSet(ModelViewSet):
    queryset = Posts.objects.all().order_by('-date_posted')
    serializer_class =PostsSerializer