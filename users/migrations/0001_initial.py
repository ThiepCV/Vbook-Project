# Generated by Django 5.0.8 on 2024-08-07 03:20

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=20, unique=True)),
                ('email', models.EmailField(max_length=30, unique=True)),
                ('password', models.CharField(max_length=20)),
                ('profile_picture', models.CharField(blank=True, max_length=20, null=True)),
                ('bio', models.CharField(blank=True, max_length=255, null=True)),
                ('personal_link', models.CharField(blank=True, max_length=255, null=True)),
            ],
        ),
    ]
