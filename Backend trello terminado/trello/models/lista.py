from django.db import models
from .tablero import Tablero

class Lista(models.Model):
    nombre = models.CharField(max_length=100)
    tablero = models.ForeignKey(Tablero, on_delete=models.CASCADE, related_name='listas')
    orden = models.IntegerField(default=0)  # Asegúrate de que el campo 'orden' tenga un valor por defecto

    def __str__(self):
        return self.nombre

