from django.shortcuts import render, redirect, get_object_or_404
from catalogo.models.categoria import Categoria
from catalogo.forms.categoria import CategoriaForm
from catalogo.models.juego import Juego
from django.db.models import Count

# Listar todas las categorías
def listar_categorias(request):
    categorias = Categoria.objects.all()  # Obtener todas las categorías
    top_juegos = Juego.objects.annotate(num_compras=Count('compras')).order_by('-num_compras')[:20]  # Obtener top 20 de juegos más comprados
    return render(request, 'catalogo/categorias.html', {
        'categorias': categorias,
        'top_juegos': top_juegos
    })

# Listar todas las categorías y top juegos más comprados
def categoria_list(request):
    categorias = Categoria.objects.all()  # Obtener todas las categorías
    top_juegos = Juego.objects.annotate(num_compras=Count('compras')).order_by('-num_compras')[:20]  # Obtener top 20 de juegos más comprados
    return render(request, 'catalogo/categoria_list.html', {
        'categorias': categorias,
        'top_juegos': top_juegos
    })

# Crear una nueva categoría
def crear_categoria(request):
    if request.method == 'POST':
        form = CategoriaForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('catalogo:listar_categorias')
    else:
        form = CategoriaForm()
    return render(request, 'catalogo/categoria_form.html', {'form': form})

# Editar una categoría existente
def editar_categoria(request, id):
    categoria = get_object_or_404(Categoria, pk=id)
    if request.method == 'POST':
        form = CategoriaForm(request.POST, instance=categoria)
        if form.is_valid():
            form.save()
            return redirect('catalogo:listar_categorias')
    else:
        form = CategoriaForm(instance=categoria)
    return render(request, 'catalogo/categoria_form.html', {'form': form})

# Eliminar una categoría existente
def eliminar_categoria(request, id):
    categoria = get_object_or_404(Categoria, pk=id)
    if request.method == 'POST':
        categoria.delete()
        return redirect('catalogo:listar_categorias')
    return render(request, 'catalogo/categoria_confirm_delete.html', {'categoria': categoria})
