from django.urls import path ,include
from . import views 
from .views import MyTokenObtainPairView,RegisterView,CreatePost,FeedView
from rest_framework.routers import DefaultRouter
from rest_framework import routers



from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

router = routers.DefaultRouter()
router.register("createpost", views.CreatePost)
router.register("following",views.UserFollowingViewSet)


urlpatterns =[
    path('',views.getRoutes),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),
    path("", include(router.urls)),
    path('posts/',FeedView.as_view(),name='posts'),
    path("profile/",views.ProfileView),
   
]