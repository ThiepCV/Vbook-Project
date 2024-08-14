from rest_framework.serializers import ModelSerializer
from .models import User

# class UserSerislizer(ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'username', 'email', 'profile_picture', 'bio', 'personal_link']