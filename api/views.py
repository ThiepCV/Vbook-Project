from django.shortcuts import render
from rest_framework import generics
from rest_framework import mixins
from .models import Users, Post, Like, Comment,Follow
from .serializers import UserSerializer, PostSerializer, LikeSerializer, CommentSerializer, FollowSerializer
from django.contrib.auth import authenticate, login
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password,check_password
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny

from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken  
from .models import Users

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        print(f"Email: {email}, Password: {password}")

        try:
            user = Users.objects.get(email=email)
            print(f"Found user: {user.username}")

            if not check_password(password,user.password):
                print(f"Found user: {user.password}")
                print("Password does not match")
                return Response({"エラー": "ユーザーが存在しない"}, status=status.HTTP_400_BAD_REQUEST)

            print("Password matches")

          
        except Users.DoesNotExist:
            print("User does not exist")
            return Response({"message": "Invalid email or password"}, status=status.HTTP_400_BAD_REQUEST)
        # Tạo token (Nếu sử dụng JWT)
        refresh = RefreshToken.for_user(user)
            
            
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_200_OK)
        # nếu khong xài JWT thi chay cai nay
        return Response({"message": "Login successful"}, status=status.HTTP_200_OK)

# class LoginView(APIView):
#     permission_classes = [AllowAny]  # Không yêu cầu xác thực
#     def post(self, request):
#         email = request.data.get('email')
#         password = request.data.get('password')
#         user = authenticate( email=email, password=password)
#         print(email, password)
#         print(user)
#         usersss = Users.objects.filter(email='thiep@gmail.com').first()
#         print("csd",usersss.password)
#         if user is not None:
#             login(request, user)
#             return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
#         else:
#             return Response({"message": "Invalid email or password"}, status=status.HTTP_401_UNAUTHORIZED)
#     def get(self, request):
#         return Response({"detail": "Method not allowed. Use POST to log in."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
class RegisterView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        # Kiểm tra username
        if Users.objects.filter(username=request.data.get('username')).exists():
            return Response({"メッセージ": "Username が 存在している"}, status=status.HTTP_400_BAD_REQUEST)

        # Kiểm tra  email
        if Users.objects.filter(email=request.data.get('email')).exists():
            return Response({"メッセージ": "メールアドレス が 存在している"}, status=status.HTTP_400_BAD_REQUEST)

        # Nếu không có lỗi, tiến hành đăng ký
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class ProfileView(APIView):
    permission_classes = [IsAuthenticated]


    def get(self, request, id=None):
        user = get_object_or_404(Users, pk=id)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
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
    