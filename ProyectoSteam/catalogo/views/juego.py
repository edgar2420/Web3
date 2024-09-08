from django.shortcuts import render, redirect, get_object_or_404
from catalogo.forms.juego import JuegoForm
from catalogo.models.juego import Juego

def listar_juegos(request):
    juegos = Juego.objects.all()
    return render(request, 'catalogo/juegos.html', {'juegos': juegos})

def detalle_juego(request, id):
    juego = get_object_or_404(Juego, pk=id)
    return render(request, 'catalogo/juego_detalle.html', {'juego': juego})
