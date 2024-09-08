from django.shortcuts import render, redirect
from catalogo.forms.categoria import CategoriaForm
from catalogo.models.categoria import Categoria

def listar_categorias(request):
    categorias = Categoria.objects.all()
    return render(request, 'catalogo/categorias.html', {'categorias': categorias})
