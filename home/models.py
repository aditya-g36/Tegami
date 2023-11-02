from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.contrib.auth.models import AbstractUser
from django.conf import settings


class Posts(models.Model):
    date_posted=models.DateTimeField(auto_now=True)
    caption = models.CharField(max_length=1000,blank=True)
    likes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='liked_posts')
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

class PostImage(models.Model):
    post = models.ForeignKey(Posts, on_delete=models.CASCADE, related_name = "images")
    image = models.ImageField(upload_to="images")
    
    
class User(AbstractUser):
    first_name = models.CharField(max_length=15, blank=False)
    last_name = models.CharField(max_length=15, blank=False)
    email = models.EmailField(blank=False)
    bio = models.TextField(blank=True)
    profileimg = models.ImageField(upload_to='images', default='../media/images/default_profile.png')
    header_photo = models.ImageField(upload_to='images', default='../media/images/header_default_photo.png')
    location = models.CharField(max_length=100, blank=True)


    def str(self):
        return self.username




class UserFollowing(models.Model):

    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="following", on_delete=models.CASCADE)
    following_user_id = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="followers", on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:

        ordering = ["-created"]

    def __str__(self):
        return f"{self.user_id} follows {self.following_user_id}"