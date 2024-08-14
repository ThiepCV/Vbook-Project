from django.shortcuts import render
from rest_framework import generics
from rest_framework import mixins
from .models import Users, Post, Like, Comment,Follow
from .serializers import UserSerializer, PostSerializer, LikeSerializer, CommentSerializer, FollowSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Post, Users
from .serializers import PostSerializer
from django.shortcuts import get_object_or_404
from django.test import TestCase
# Hoặc nếu sử dụng Django REST framework
from rest_framework.test import APITestCase

class UserViewSet(generics.GenericAPIView, mixins.ListModelMixin):
    queryset = Users.objects.all()
    serializer_class = UserSerializer
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

class CreateUser(generics.CreateAPIView):
    queryset = Users.objects.all()
    serializer_class = UserSerializer
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
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
            status=status.HTTP_200_OK 
        )
    