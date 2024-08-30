from rest_framework import serializers
from .models import Users, Post, Comment, Like, Follow
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ["UserId",'username', 'email', 'profile_picture', 'bio', 'personal_link','fullName',"birthday"]
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
        fields = ['username', 'email', 'password', 'profile_picture', 'bio', 'personal_link',"birthday","fullName"]

    def create(self, validated_data):
        user = Users.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            profile_picture=validated_data.get('profile_picture', ''),
            bio=validated_data.get('bio', ''),
            personal_link=validated_data.get('personal_link', ''),
            fullName = validated_data["fullName"],
            birthday = validated_data["birthday"]
        )
        return user
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ["username", "email", "UserId", "profile_picture", "bio", "personal_link", "fullName", "birthday"]

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        user= Users.objects.create(**validated_data)
        print(user)
        return user

class PostSerializer(serializers.ModelSerializer):
    fullName = serializers.CharField(source='UserId.fullName', read_only=True)
    like_count = serializers.SerializerMethodField()
    dislike_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['PostId', 'UserId', 'content', 'created_at', 'updated_at','fullName',"like_count","dislike_count"]
    def get_like_count(self, obj):
        return Like.objects.filter(PostId=obj, like_type='like').count()

    def get_dislike_count(self, obj):
        return Like.objects.filter(PostId=obj, like_type='dislike').count()


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['CommentId', 'PostId', 'UserId', 'content', 'created_at']

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['LikeId', 'post', 'user', 'created_at', 'like_type']

class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = ['FollowId', 'follower', 'followed', 'created_at']
class FollowerListSerializer(serializers.ModelSerializer):
    followed_user = UserSerializer(source='followed', read_only=True)
    
    class Meta:
        model = Follow
        fields = ['FollowId', 'created_at', 'followed_user']
class FollowingListSerializer(serializers.ModelSerializer):
    followed = UserSerializer()
    class Meta:
        model = Follow
        fields = ['FollowId', 'follower', 'followed', 'created_at']