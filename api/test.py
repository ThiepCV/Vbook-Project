from rest_framework.test import APITestCase
from rest_framework import status
from .models import Users, Post

class PostApiTests(APITestCase):
    def setUp(self):
        # Tạo người dùng thử nghiệm
        self.user = Users.objects.create(username="testuser", email="test@example.com", password="password")
        self.url = '/api/post/'

    def test_create_post_success(self):
        # Thực hiện yêu cầu POST với dữ liệu hợp lệ
        response = self.client.post(self.url, {'user_id': self.user.UserId, 'content': 'Test content'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('post_id', response.data)
        self.assertEqual(response.data['user_id'], self.user.UserId)
        self.assertEqual(response.data['content'], 'Test content')

    def test_create_post_missing_fields(self):
        # Thực hiện yêu cầu POST với thiếu trường dữ liệu
        response = self.client.post(self.url, {'user_id': self.user.UserId}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'ユーザーIDとコンテンツは必須です。')

    def test_create_post_user_not_found(self):
        # Thực hiện yêu cầu POST với user_id không tồn tại
        response = self.client.post(self.url, {'user_id': 99999, 'content': 'Test content'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], 'ユーザーが見つかりません。')
