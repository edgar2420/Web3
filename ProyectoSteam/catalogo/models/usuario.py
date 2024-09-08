# catalogo/models.py

from django.db import models

class Usuario(models.Model):
    nombre = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    profile_picture = models.ImageField(upload_to='capturas/', null=True, blank=True)

    def __str__(self):
        return self.nombre
