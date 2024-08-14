from rest_framework import serializers
from .models import Users, Post, Comment, Like, Follow
from django.contrib.auth.hashers import make_password


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
