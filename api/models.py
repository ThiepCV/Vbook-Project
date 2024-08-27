from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from cloudinary.models import CloudinaryField
class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(username, email, password, **extra_fields)

class Users(AbstractBaseUser, PermissionsMixin):
    UserId = models.AutoField(primary_key=True)
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True)
    # profile_picture = CloudinaryField('image', blank=True, null=True)
    profile_picture = models.TextField(blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    personal_link = models.URLField(blank=True, null=True)
    last_login = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    birthday = models.DateField(null=False, blank=True,default='2000-01-01')
    fullName = models.CharField(max_length=255)
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_set',
        blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_set',
        blank=True
    )

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta:
        db_table = "users"

    def __str__(self):
        return self.username

class Post(models.Model):
    PostId = models.AutoField(primary_key=True)
    UserId = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='posts', db_column='UserId')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "posts"

    def __str__(self):
        return f"Post by {self.UserId.username} on {self.created_at}"

class Comment(models.Model):
    CommentId = models.AutoField(primary_key=True)
    PostId = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments', db_column='PostId')
    UserId = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='comments', db_column='UserId')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "comments"

    def __str__(self):
        return f"Comment by {self.UserId.username} on {self.PostId.PostId}"

class Like(models.Model):
    LikeId = models.AutoField(primary_key=True)
    LIKE = 'like'
    DISLIKE = 'dislike'
    LIKE_TYPE_CHOICES = [
        (LIKE, 'Like'),
        (DISLIKE, 'Dislike'),
    ]

    PostId = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='likes',db_column='PostId')
    UserId = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='likes',db_column='UserId')
    created_at = models.DateTimeField(auto_now_add=True)
    like_type = models.CharField(max_length=10, choices=LIKE_TYPE_CHOICES)

    class Meta:
        db_table = "likes"
        unique_together = ('PostId', 'UserId', 'like_type')

    def __str__(self):
        return f"{self.like_type} by {self.UserId.username} on post {self.PostId.PostId}"

class Follow(models.Model):
    FollowId = models.AutoField(primary_key=True)
    follower = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='following')
    followed = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='followers')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('follower', 'followed')
        db_table = "follows"

    def __str__(self):
        return f"{self.follower.username} follows {self.followed.username}"

class Notification(models.Model):
    recipient = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='notifications')
    sender = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='sent_notifications', null=True, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        db_table = 'notifications'
        ordering = ['-created_at']

    def __str__(self):
        return f"Notification from {self.sender.username if self.sender else 'System'} to {self.recipient.username}"

