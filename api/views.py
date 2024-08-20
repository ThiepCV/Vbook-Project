from django.shortcuts import render
from rest_framework import generics
from rest_framework import mixins
from .models import Users, Post, Like, Comment,Follow
from .serializers import UserSerializer, PostSerializer, LikeSerializer, CommentSerializer, FollowSerializer, ProfileSerializer,RegisterSerializer, LoginSerializer,FollowSerializer, FollowerListSerializer, FollowingListSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Post, Users
from .serializers import PostSerializer
from django.shortcuts import get_object_or_404
from django.test import TestCase
# Hoặc nếu sử dụng Django REST framework
from rest_framework.test import APITestCase
from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import make_password,check_password
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny

from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken  
from .models import Users

class RegisterView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
        
            print(serializer)
            serializer.save()
            return Response({"メッセージ": "登録 が出来ました。"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class UserProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, UserId):
        try:
            user = Users.objects.get(UserId=UserId)
        except Users.DoesNotExist:
            return Response({'エラー': 'ユーザーが存在していません。'}, status=status.HTTP_404_NOT_FOUND)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, UserId):
        try:
            user = Users.objects.get(UserId=UserId)
        except Users.DoesNotExist:
            return Response({"エラー': 'ユーザーが存在していません。"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ProfileSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class UserProfileUpdateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, UserId):
        try:
            user = Users.objects.get(UserId=UserId)
        except Users.DoesNotExist:
            return Response({'エラー': 'ユーザーが存在していません。'}, status=status.HTTP_404_NOT_FOUND)

        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class UserViewSet(generics.GenericAPIView, mixins.ListModelMixin):
    queryset = Users.objects.all()
    serializer_class = UserSerializer
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    

# class CreateUser(generics.CreateAPIView):
#     queryset = Users.objects.all()
#     serializer_class = UserSerializer
#     def post(self, request, *args, **kwargs):
#         return self.create(request, *args, **kwargs)
class PostViewSet(generics.GenericAPIView, mixins.ListModelMixin):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    

class CommentViewSet(generics.GenericAPIView, mixins.ListModelMixin):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    

class LikeViewSet(generics.GenericAPIView, mixins.ListModelMixin):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    

class FollowViewSet(generics.GenericAPIView, mixins.ListModelMixin):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    
class CreatePostView(APIView):
    def post(self, request, *args, **kwargs):
        user_id = request.data.get('user_id')
        content = request.data.get('content')

        if not user_id or not content:
            return Response(
                {"error": "ユーザーIDとコンテンツは必須です。"},
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            user = Users.objects.get(UserId=user_id)
        except Users.DoesNotExist:
            return Response(
                {"error": "ユーザーが見つかりません。"},
                status=status.HTTP_404_NOT_FOUND
            )
        post = Post.objects.create(UserId=user, content=content)
        serializer = PostSerializer(post)
        return Response({
            "post_id": post.PostId,
            "user_id": post.UserId.UserId,
            "content": post.content,
        }, status=status.HTTP_200_CREATED)
        
    
class UpdatePostView(APIView):
    def put(self, request, *args, **kwargs):
        user_id = request.data.get('user_id')
        post_id = request.data.get('post_id')
        new_content = request.data.get('new_content')
        if not post_id or not new_content:
            return Response(
                {
                    "timestamp": int(request.timestamp),
                    "error_code": "missing_required_fields",
                    "error_message": "ポストIDとコンテンツは必須です。"
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            post = Post.objects.get(PostId=post_id)
        except Post.DoesNotExist:
            return Response(
                {
                    "timestamp": int(request.timestamp),
                    "error_code": "post_does_not_exist",
                    "error_message": "指定されたポストIDのポストが存在しません。"
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        post.content = new_content
        post.save()
        serializer = PostSerializer(post)
        return Response({
            "user_id": user_id,
            "post_id": post.PostId,
            "new_content": post.content,
            "updated_at": post.updated_at.strftime('%Y-%m-%dT%H:%M:%S')
        }, status=status.HTTP_200_OK)
        
class DeletePostView(APIView):
    def delete(self, request, *args, **kwargs):
        user_id = request.data.get('user_id')
        post_id = request.data.get('post_id')
        if not post_id:
            return Response(
                {
                    "timestamp": int(request.timestamp),
                    "error_code": "missing_post_id",
                    "error_message": "ポストIDは必須です。"
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            post = Post.objects.get(PostId=post_id)
        except Post.DoesNotExist:
            return Response(
                {
                    "timestamp": int(request.timestamp),
                    "error_code": "post_does_not_exist",
                    "error_message": "指定されたポストIDのポストが存在しません。"
                },
                status=status.HTTP_400_BAD_REQUEST
            )  
        post.delete()
        return Response(
            {"Massage":"ポストが正常に削除されました。"},
            status=status.HTTP_200_OK )
## Create API follow
class FollowUserAPIView(APIView):
    def post(self, request, *args, **kwargs):
        follower_id = request.data.get('follower_id')
        followed_id = request.data.get('followed_id')
        if not follower_id or not followed_id:
            return Response(
                {
                    "timestamp": int(request.timestamp),
                    "error_code": "invalid_data",
                    "error_message": "follower_id と followed_id は必須です。"
                },
                status=status.HTTP_400_BAD_REQUEST)
        try:
            follower = Users.objects.get(UserId=follower_id)
            followed = Users.objects.get(UserId=followed_id)
        except Users.DoesNotExist:
            return Response(
                {
                    "timestamp": int(request.timestamp),
                    "error_code": "user_not_found",
                    "error_message": "指定されたユーザーが存在しません。"
                },
                status=status.HTTP_404_NOT_FOUND
            )
        follow, created = Follow.objects.get_or_create(
            follower=follower,
            followed=followed)
        if created:
            serializer = FollowSerializer(follow)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(
                {
                    "timestamp": int(request.timestamp),
                    "error_code": "already_following",
                    "error_message": "このユーザーはすでにフォローしています。"
                },
                status=status.HTTP_400_BAD_REQUEST)
class FollowerListAPIView(APIView):
    def get(self, request, user_id, *args, **kwargs):
        user = get_object_or_404(Users, UserId=user_id)
        followers = user.followers.all()
        serializer = FollowerListSerializer(followers, many=True)
        return Response({'followers': serializer.data}, status=status.HTTP_200_OK)

class FollowingListAPIView(APIView):
    def get(self, request, user_id, *args, **kwargs):
        user = get_object_or_404(Users, UserId=user_id)
        following = user.following.all()
        serializer = FollowingListSerializer(following, many=True)
        return Response({'following': serializer.data}, status=status.HTTP_200_OK)
