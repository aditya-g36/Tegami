from django.urls import path ,include
from . import views 
from .views import MyTokenObtainPairView,RegisterView,CreatePost,FeedView,UserSearchView,ProfileView,UserFollowingDeleteView,LikePostViewSet
from rest_framework.routers import DefaultRouter
from rest_framework import routers



from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

router = routers.DefaultRouter()
router.register("createpost", views.CreatePost)
router.register("following",views.UserFollowingViewSet)
router.register(r'likes', LikePostViewSet, basename='likes')

urlpatterns =[
    path('',views.getRoutes),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),
    path("", include(router.urls)),
    path('posts/',FeedView.as_view(),name='posts'),
    path("profile/",ProfileView.as_view(),name='profile'),
    path("unfollow/",UserFollowingDeleteView.as_view(),name='unfollow'),
    path('search/', UserSearchView.as_view(), name='user-search'),   
]