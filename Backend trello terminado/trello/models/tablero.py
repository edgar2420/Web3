# trello/models/tablero.py
from django.db import models
from django.contrib.auth.models import User

class Tablero(models.Model):
    nombre = models.CharField(max_length=100)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre
