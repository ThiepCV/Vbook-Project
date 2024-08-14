from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, PostViewSet, LikeViewSet, CommentViewSet, FollowViewSet,LoginView, RegisterView, ProfileView


urlpatterns = [
    # user
    path('users/', UserViewSet.as_view(), name="userlist"),
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('user/<int:id>/', ProfileView.as_view(), name='user-profile'),


    path('posts/', PostViewSet.as_view(), name="postlist"),
    path('likes/', LikeViewSet.as_view(), name="contract"),
    path('comments/', CommentViewSet.as_view(), name="comments"),
    path('follows/', FollowViewSet.as_view(), name="comments"),
]