from rest_framework import serializers
from .models import Users, Post, Comment, Like, Follow
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ["UserId",'username', 'email', 'profile_picture', 'bio', 'personal_link','fullName']
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")
        user = authenticate(email=email, password=password)
        if user is None:
            raise serializers.ValidationError("Invalid login credentials")
        data['user'] = user
        return data

    def create(self, validated_data):
        user = validated_data['user']
        return {'UserId': user.UserId}
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Users
        fields = ['username', 'email', 'password', 'profile_picture', 'bio', 'personal_link']

    def create(self, validated_data):
        user = Users.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            profile_picture=validated_data.get('profile_picture', ''),
            bio=validated_data.get('bio', ''),
            personal_link=validated_data.get('personal_link', '')
        )
        return user
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ["username", "email", "password", "profile_picture", "bio", "personal_link"]

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        user= Users.objects.create(**validated_data)
        print(user)
        return user

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'user', 'content', 'created_at', 'updated_at']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'post', 'user', 'content', 'created_at']

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['id', 'post', 'user', 'created_at', 'like_type']

class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = ['id', 'follower', 'followed', 'created_at']
