from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Posts,User,UserFollowing,PostImage

admin.site.register(Posts)
admin.site.register(User)
admin.site.register(UserFollowing)
admin.site.register(PostImage)