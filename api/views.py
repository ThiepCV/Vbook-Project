from django.shortcuts import render
from rest_framework import generics
from rest_framework import mixins
from .models import Users, Post, Like, Comment,Follow, Notification
from .serializers import FollowerListSerializer, FollowingListSerializer
from .serializers import UserSerializer, PostSerializer, LikeSerializer, CommentSerializer, FollowSerializer, ProfileSerializer,RegisterSerializer, LoginSerializer
from django.contrib.auth import authenticate, login
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password,check_password
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny
from .notifications import send_notification
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken  
from .models import Users
from django.conf import settings
import cloudinary
import cloudinary.uploader
from cloudinary.uploader import upload
from django.db.models import Q
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
                'UserId': user.UserId,
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class UserProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, UserId):
        try:
            user = Users.objects.get(UserId=UserId)
        except Users.DoesNotExist:
            return Response({'エラー': 'ユーザーが存在していません。'}, status=status.HTTP_404_NOT_FOUND)
         # Kiểm tra xem người dùng đã theo dõi người này chưa
        is_following = Follow.objects.filter(follower=request.user, followed=user).exists()
        
        user_data = UserSerializer(user).data
        user_data['is_following'] = is_following

        return Response(user_data, status=status.HTTP_200_OK)
    
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
class UploadProfilePicture(APIView):
    def post(self, request):
        user = request.user
        profile_picture = request.data.get('profile_picture')
        
        if profile_picture:
            # Tải ảnh lên Cloudinary
            response = cloudinary.uploader.upload(profile_picture)
            public_id = response.get('public_id')
            format = response.get('format')  
            
            
            cloud_name = settings.CLOUDINARY_CLOUD_NAME
            profile_picture_url = f'https://res.cloudinary.com/{cloud_name}/image/upload/{public_id}.{format}'

            
            user.profile_picture = profile_picture_url
            user.save()

            print(f'Profile picture URL: {profile_picture_url}')  

            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'error': 'No image data provided'}, status=status.HTTP_400_BAD_REQUEST)


# class UploadProfilePicture(APIView):
#     def post(self, request):
#         user = request.user
#         profile_picture = request.data.get('profile_picture')
        
#         if profile_picture:
#             
#             response = cloudinary.uploader.upload(profile_picture)
#             public_id = response.get('public_id')
#             format = response.get('format')  
            
#            
#             cloud_name = settings.CLOUDINARY_CLOUD_NAME
#             profile_picture_url = f'https://res.cloudinary.com/{cloud_name}/image/upload/{public_id}.{format}'

#             
#             user.profile_picture = profile_picture_url
#             user.save()

#             print(f'Profile picture URL: {profile_picture_url}') 

#             serializer = UserSerializer(user)
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response({'error': 'No image data provided'}, status=status.HTTP_400_BAD_REQUEST)


# class UploadProfilePicture(APIView):
#       def post(self, request):
#         user = request.user
#         profile_picture = request.data.get('profile_picture')
        
#         if profile_picture:
#             response = upload(profile_picture)
#             public_id = response.get('public_id')
#             url = response.get('secure_url')

#             # Lưu publicId vào profile_picture của user
#             user.profile_picture = public_id
#             user.save()

#             return Response({'url': url}, status=status.HTTP_200_OK)
#         return Response({'error': 'No image data provided'}, status=status.HTTP_400_BAD_REQUEST)
class UserViewSet(generics.GenericAPIView, mixins.ListModelMixin):
    def get(self, request, *args, **kwargs):
        query = request.query_params.get('q', '')
        if query:
            users = Users.objects.filter(fullName__icontains=query)
            serializer = UserSerializer(users, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"error_message": "検索クエリが指定されていません。"}, status=status.HTTP_400_BAD_REQUEST)
    

# class CreateUser(generics.CreateAPIView):
#     queryset = Users.objects.all()
#     serializer_class = UserSerializer
#     def post(self, request, *args, **kwargs):
#         return self.create(request, *args, **kwargs)
class PostViewSet(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        # Get posts from the user and the people the user follows
        posts = Post.objects.filter(
            Q(UserId=user) | Q(UserId__followers__follower=user)
        ).order_by('-created_at')
        
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class CreatePostView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        print(request)
        user_id = request.data.get('UserId')
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
        }, status=status.HTTP_201_CREATED)

class UpdatePostView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, post_id, *args, **kwargs):
        user = request.user
        content = request.data.get('content')

        if not content:
            return Response({"error": "コンテンツは必須です。"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            post = Post.objects.get(PostId=post_id, UserId=user)
            post.content = content
            post.save()
            return Response({"message": "投稿が更新されました。"}, status=status.HTTP_200_OK)
        except Post.DoesNotExist:
            return Response({"error": "投稿が見つかりません。"}, status=status.HTTP_404_NOT_FOUND)
    
    
# class UpdatePostView(APIView):
#     def put(self, request, *args, **kwargs):
#         user_id = request.data.get('UserId')
#         post_id = request.data.get('PostId')
#         new_content = request.data.get('new_content')
#         if not post_id :
#             return Response(
#                 {
                   
#                     "error_code": "missing_required_fields",
#                     "error_message": "ポストIDとコンテンツは必須です。"
#                 },
#                 status=status.HTTP_400_BAD_REQUEST
#             )
#         try:
#             post = Post.objects.get(PostId=post_id)
#         except Post.DoesNotExist:
#             return Response(
#                 {
#                     "timestamp": int(request.timestamp),
#                     "error_code": "post_does_not_exist",
#                     "error_message": "指定されたポストIDのポストが存在しません。"
#                 },
#                 status=status.HTTP_400_BAD_REQUEST
#             )
#         post.content = new_content
#         post.save()
#         serializer = PostSerializer(post)
#         return Response({
#             "user_id": user_id,
#             "post_id": post.PostId,
#             "new_content": post.content,
#             "updated_at": post.updated_at.strftime('%Y-%m-%dT%H:%M:%S')
#         }, status=status.HTTP_200_OK)
        
class DeletePostView(APIView):
    # def delete(self, request, *args, **kwargs):
    #     user_id = request.data.get('user_id')
    #     post_id = request.data.get('post_id')
        
    #     if not post_id:
    #         return Response(
    #             {
                    
    #                 "error_code": "missing_post_id",
    #                 "error_message": "ポストIDは必須です。"
    #             },
    #             status=status.HTTP_400_BAD_REQUEST
    #         )
    #     try:
    #         post = Post.objects.get(PostId=post_id)
    #     except Post.DoesNotExist:
    #         return Response(
    #             {
    #                 "timestamp": int(timestamp),
    #                 "error_code": "post_does_not_exist",
    #                 "error_message": "指定されたポストIDのポストが存在しません。"
    #             },
    #             status=status.HTTP_400_BAD_REQUEST
    #         )  
    #     post.delete()
    #     return Response(
    #         {"Massage":"ポストが正常に削除されました。"},
    #         status=status.HTTP_200_OK 
    #     )
    permission_classes = [IsAuthenticated]

    def delete(self, request, post_id, *args, **kwargs):
        user = request.user
        try:
            post = Post.objects.get(PostId=post_id, UserId=user)
            post.delete()
            return Response({"message": "投稿を削除しました。"}, status=status.HTTP_204_NO_CONTENT)
        except Post.DoesNotExist:
            return Response({"error": "投稿が見つかりません。"}, status=status.HTTP_404_NOT_FOUND)
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
class LikeDislikePostView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id, like_type):
        try:
            post = Post.objects.get(PostId=post_id)
        except Post.DoesNotExist:
            return Response({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)

        user = request.user

        like, created = Like.objects.get_or_create(PostId=post, UserId=user)
        
        if not created:
            if like.like_type == like_type:
                
                like.delete()
                message = f"You have removed your {like_type}."
            else:
                
                like.like_type = like_type
                like.save(update_fields=['like_type'])
                message = f"You have changed your reaction to {like_type}."
        else:
            like.like_type = like_type
            like.save(update_fields=['like_type'])
            message = f"You have {like_type}d the post."

       
        send_notification(post.UserId, f"{user.fullName} {message.lower()} on your post.", sender=user)
        
        
        like_count = Like.objects.filter(PostId=post, like_type='like').count()
        dislike_count = Like.objects.filter(PostId=post, like_type='dislike').count()
        
        return Response({
            "message": message,
            "like_count": like_count,
            "dislike_count": dislike_count
        }, status=status.HTTP_200_OK)

class CommentOnPostView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, post_id):
        try:
            post = Post.objects.get(PostId=post_id)
        except Post.DoesNotExist:
            return Response({"エラー": "ポストが存在しない"}, status=status.HTTP_404_NOT_FOUND)

        comments = Comment.objects.filter(PostId=post)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    def post(self, request, post_id):
        try:
            post = Post.objects.get(PostId=post_id)
        except Post.DoesNotExist:
            return Response({"エラー": "ポストが存在しない"}, status=status.HTTP_404_NOT_FOUND)

        user = request.user
        content = request.data.get('content', '')

        if not content:
            return Response({"エラー": "コンテンツの入力が必死です。"}, status=status.HTTP_400_BAD_REQUEST)

        comment = Comment.objects.create(PostId=post, UserId=user, content=content)

        # Gửi thông báo đến chủ bài viết
        send_notification(post.UserId, f"{user.fullName} が{post.content}にコメントしました.")

        return Response({"message": "Comment added successfully.", "comment_id": comment.CommentId}, status=status.HTTP_201_CREATED)


class FollowViewSet(generics.GenericAPIView, mixins.ListModelMixin):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class NotificationListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        notifications = Notification.objects.filter(recipient=user).order_by('-created_at')
        notifications_data = [
            {
                "id": notification.id,
                "sender": notification.sender.username if notification.sender else "System",
                "message": notification.message,
                "created_at": notification.created_at,
                "is_read": notification.is_read
            } for notification in notifications
        ]
        return Response(notifications_data, status=status.HTTP_200_OK)

    def post(self, request):
        user = request.user
        notification_ids = request.data.get('notification_ids', [])
        notifications = Notification.objects.filter(id__in=notification_ids, recipient=user)
        notifications.update(is_read=True)
        return Response({"message": "Notifications marked as read"}, status=status.HTTP_200_OK)
## Create API follow
import time
class FollowUserAPIView(APIView):
     def post(self, request, *args, **kwargs):
        follower_id = request.data.get('follower_id')
        followed_id = request.data.get('followed_id')

       
        timestamp = int(time.time())

        
        if not follower_id or not followed_id:
            return Response(
                {
                    "timestamp": timestamp,
                    "error_code": "invalid_data",
                    "error_message": "follower_id と followed_id は必須です。"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

       
        if follower_id == followed_id:
            return Response(
                {
                    "timestamp": timestamp,
                    "error_code": "invalid_action",
                    "error_message": "自分自身をフォローすることはできません。"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            follower = Users.objects.get(UserId=follower_id)
            followed = Users.objects.get(UserId=followed_id)
        except Users.DoesNotExist:
            return Response(
                {
                    "timestamp": timestamp,
                    "error_code": "user_not_found",
                    "error_message": "指定されたユーザーが存在しません。"
                },
                status=status.HTTP_404_NOT_FOUND
            )

        
        follow, created = Follow.objects.get_or_create(
            follower=follower,
            followed=followed
        )

        if created:
           
            serializer = FollowSerializer(follow)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            
            return Response(
                {
                    "timestamp": timestamp,
                    "error_code": "already_following",
                    "error_message": "このユーザーはすでにフォローしています。"
                },
                status=status.HTTP_200_OK  
            )
class FollowerListAPIView(APIView):
    def get(self, request, user_id):
        follows = Follow.objects.filter(followed=user_id)
        serializer = FollowerListSerializer(follows, many=True)
        return Response({'followers': serializer.data}, status=status.HTTP_200_OK)

class FollowingListAPIView(APIView):
   
    def get(self, request, user_id, *args, **kwargs):
        user = get_object_or_404(Users, UserId=user_id)
        following = Follow.objects.filter(follower=user)
        serializer = FollowingListSerializer(following, many=True)
        return Response({'following': serializer.data}, status=status.HTTP_200_OK)