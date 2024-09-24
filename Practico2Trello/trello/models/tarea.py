from django.db import models
from .lista import Lista

class Tarea(models.Model):
    texto = models.TextField()
    lista = models.ForeignKey(
        Lista,
        on_delete=models.CASCADE,
        related_name='tareas'
    )
    orden = models.IntegerField(default=0)
    archivado = models.BooleanField(default=False)

    def __str__(self):
        return self.texto
