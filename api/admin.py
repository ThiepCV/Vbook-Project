from django.contrib import admin
from .models import Users,  Comment, Follow ,Like, Post
# Register your models here.
admin.site.register(Users)
admin.site.register(Comment)
admin.site.register(Follow)
admin.site.register(Like)
admin.site.register(Post)
