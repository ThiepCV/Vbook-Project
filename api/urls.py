from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, PostViewSet, LikeViewSet, CommentViewSet, FollowViewSet,LoginView, RegisterView, UserProfileAPIView, UserProfileUpdateAPIView
from .views import CreatePostView, UpdatePostView, DeletePostView
from .views import LikeDislikePostView, CommentOnPostView, UploadProfilePicture

urlpatterns = [
    # user
    path('users/', UserViewSet.as_view(), name="userlist"),
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('user/<int:UserId>/', UserProfileAPIView.as_view(), name='user-profile'),
    path('user/<int:UserId>/update/', UserProfileUpdateAPIView.as_view(), name='user-profile-update'),


    path('posts/', PostViewSet.as_view(), name="postlist"),
    path('post/', CreatePostView.as_view(), name='create_post'),
    path('update-post/', UpdatePostView.as_view(), name='update-post'),
    path('delete-post/', DeletePostView.as_view(), name='delete-post'),
    
    path('posts/<int:post_id>/like/', LikeDislikePostView.as_view(), {'like_type': 'like'}, name='like-post'),
    path('posts/<int:post_id>/dislike/', LikeDislikePostView.as_view(), {'like_type': 'dislike'}, name='dislike-post'),
    path('posts/<int:post_id>/comment/', CommentOnPostView.as_view(), name='comment-post'),
    path('likes/', LikeViewSet.as_view(), name="contract"),
    path('comments/', CommentViewSet.as_view(), name="comments"),
    path('follows/', FollowViewSet.as_view(), name="comments"),
    path('user/upload-profile-picture/', UploadProfilePicture.as_view(), name='upload_profile_picture'),
]