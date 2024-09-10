from django.contrib.auth.models import AbstractBaseUser
from django.db import models
from django.contrib.auth.hashers import make_password

class Usuario(models.Model):
    username = models.CharField(max_length=100, unique=True)
    nombre = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    profile_picture = models.ImageField(upload_to='static/capturas/', null=True, blank=True)

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def __str__(self):
        return self.username

