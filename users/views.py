from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import ListModelMixin
from .serializers import UserSerislizer
from .models import User
# Create your views here.
# class UserList(GenericAPIView, ListModelMixin):
#     queryset= User.objects.all()
#     serializer_class = UserSerislizer
#     def get(sefl, request, *args, **kwargs):
#         return sefl.list(request, *args, **kwargs)