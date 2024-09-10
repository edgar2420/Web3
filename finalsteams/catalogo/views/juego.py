from django.shortcuts import render, redirect, get_object_or_404
from catalogo.forms.juego import JuegoForm
from catalogo.models.juego import Juego
from catalogo.models.categoria import Categoria
from django.db.models import Count

# Listar todos los juegos
def listar_juegos(request):
    juegos = Juego.objects.all()
    return render(request, 'catalogo/juegos.html', {'juegos': juegos})

# Listar todos los juegos
def juego_list(request):
    juegos = Juego.objects.all()
    return render(request, 'catalogo/juego_list.html', {'juegos': juegos})

# Detalle de un juego específico
def detalle_juego(request, id):
    juego = get_object_or_404(Juego, pk=id)
    return render(request, 'catalogo/juego_detalle.html', {'juego': juego})

# Top 20 juegos más comprados
def top_juegos(request):
    # Obtener los 20 juegos más comprados
    top_juegos = Juego.objects.annotate(num_compras=Count('compras')).order_by('-num_compras')[:20]
    return render(request, 'catalogo/top_juegos.html', {'top_juegos': top_juegos})

# Listar juegos por categoría específica
def listar_juegos_por_categoria(request, id):
    categoria = get_object_or_404(Categoria, id=id)  # Asegura que la categoría exista
    juegos = categoria.juegos.all()  # Obtiene todos los juegos relacionados con esta categoría
    return render(request, 'catalogo/juegos.html', {'juegos': juegos, 'categoria': categoria})


# Crear un nuevo juego
def crear_juego(request):
    if request.method == 'POST':
        form = JuegoForm(request.POST, request.FILES)  # Asegúrate de incluir request.FILES
        if form.is_valid():
            form.save()  # Esto guardará todos los campos, incluyendo 'categoria'
            return redirect('catalogo:listar_juegos')
    else:
        form = JuegoForm()
    return render(request, 'catalogo/juego_form.html', {'form': form})

# Editar un juego existente
def editar_juego(request, id):
    juego = get_object_or_404(Juego, pk=id)
    if request.method == 'POST':
        form = JuegoForm(request.POST, request.FILES, instance=juego)  # Asegúrate de incluir request.FILES
        if form.is_valid():
            form.save()
            return redirect('catalogo:listar_juegos')
    else:
        form = JuegoForm(instance=juego)
    return render(request, 'catalogo/juego_form.html', {'form': form})


# Eliminar un juego existente (CRUD)
def eliminar_juego(request, id):
    juego = get_object_or_404(Juego, pk=id)
    if request.method == 'POST':
        juego.delete()
        return redirect('catalogo:listar_juegos')
    return render(request, 'catalogo/juego_confirm_delete.html', {'juego': juego})
