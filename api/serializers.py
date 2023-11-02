from rest_framework import serializers 
from home.models import Posts,PostImage
from rest_framework import serializers
from home.models import User,UserFollowing
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields= ["id","first_name","last_name","email","bio","profileimg","location","username","date_joined","header_photo"]

class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields='__all__'

class ItemSerializer(serializers.ModelSerializer):
    images = PostImageSerializer(many=True, read_only=True)
    uploaded_images = serializers.ListField(
        child = serializers.ImageField(max_length = 1000000, allow_empty_file = False, use_url = False),
        write_only=True)

    class Meta:
        model=Posts
        fields=["date_posted","caption","user_id","images","likes","uploaded_images"]
        read_only_fields = ["likes"]

    def create(self, validated_data):
        uploaded_images = validated_data.pop("uploaded_images")
        post = Posts.objects.create(**validated_data)
        for image in uploaded_images:
            newPosts_image = PostImage.objects.create(post=post, image=image)
        return post

class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True,validators=[UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'email', 'first_name', 'last_name')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )

        
        user.set_password(validated_data['password'])
        user.save()

        return user

class UserFollowingSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserFollowing
        fields = ["id", "following_user_id", "created", "user_id"]


class PostsSerializer(serializers.ModelSerializer):
    images = PostImageSerializer(many=True, read_only=True)  

    class Meta:
        model = Posts
        fields = ('id','date_posted', 'caption', 'likes', 'user_id','images')


            

    
    