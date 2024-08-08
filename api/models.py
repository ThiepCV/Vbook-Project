from django.db import models

class Users(models.Model):
    UserId = models.AutoField(primary_key=True)
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    profile_picture = models.URLField(blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    personal_link = models.URLField(blank=True, null=True)

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

    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='likes')
    user = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='likes')
    created_at = models.DateTimeField(auto_now_add=True)
    like_type = models.CharField(max_length=10, choices=LIKE_TYPE_CHOICES)

    class Meta:
        db_table = "likes"
        unique_together = ('post', 'user', 'like_type')

    def __str__(self):
        return f"{self.like_type} by {self.user.username} on post {self.post.PostId}"

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
