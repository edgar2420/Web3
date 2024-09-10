from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect, render, get_object_or_404
from catalogo.models.compra import Compra
from catalogo.models.juego import Juego
from catalogo.forms.compra import CompraForm
from django.contrib import messages

@login_required
def registrar_compra(request, juego_id):
    usuario = request.user
    juego = get_object_or_404(Juego, pk=juego_id)

    # Verificar si el usuario ya compró este juego
    if Compra.objects.filter(usuario=usuario, juego=juego).exists():
        messages.error(request, 'Ya has comprado este juego anteriormente.')
        return redirect('catalogo:detalle_juego', id=juego.id)

    # Si el método es POST, procesar la compra
    if request.method == 'POST':
        form = CompraForm(request.POST)
        if form.is_valid():
            # Crear la instancia de compra, asignando el juego y usuario
            compra = form.save(commit=False)
            compra.usuario = usuario  # Asignar el usuario autenticado
            compra.juego = juego  # Asignar el juego correspondiente
            compra.save()  # Guardar la compra en la base de datos
            messages.success(request, 'Compra realizada con éxito.')
            return redirect('catalogo:detalle_juego', id=juego.id)
    else:
        # Prellenar el formulario con los datos de usuario y juego
        form = CompraForm(initial={'usuario': usuario.id, 'juego': juego.id})

    return render(request, 'catalogo/compra.html', {'form': form})
