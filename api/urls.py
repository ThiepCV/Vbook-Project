from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, CreateUser, PostViewSet, LikeViewSet, CommentViewSet, FollowViewSet


urlpatterns = [
    path('users/', UserViewSet.as_view(), name="userlist"),
    path('createuser/', CreateUser.as_view(), name="create"),
    path('posts/', PostViewSet.as_view(), name="postlist"),
    path('likes/', LikeViewSet.as_view(), name="contract"),
    path('comments/', CommentViewSet.as_view(), name="comments"),
    path('follows/', FollowViewSet.as_view(), name="comments"),
]