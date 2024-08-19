from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, CreateUser, PostViewSet, LikeViewSet, CommentViewSet, FollowViewSet
from .views import CreatePostView
from .views import UpdatePostView
from .views import DeletePostView
urlpatterns = [
    path('users/', UserViewSet.as_view(), name="userlist"),
    path('createuser/', CreateUser.as_view(), name="create"),
    path('posts/', PostViewSet.as_view(), name="postlist"),
    path('likes/', LikeViewSet.as_view(), name="contract"),
    path('comments/', CommentViewSet.as_view(), name="comments"),
    path('follows/', FollowViewSet.as_view(), name="comments"),
    path('api/post', CreatePostView.as_view(), name='create_post'),
    path('update-post/', UpdatePostView.as_view(), name='update-post'),
    path('delete-post/', DeletePostView.as_view(), name='delete-post'),
]
