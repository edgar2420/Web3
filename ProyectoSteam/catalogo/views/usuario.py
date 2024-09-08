from django.shortcuts import render, redirect
from catalogo.forms.usuario import UsuarioForm
from catalogo.models.usuario import Usuario

def registrar_usuario(request):
    if request.method == 'POST':
        form = UsuarioForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('catalogo:login')
    else:
        form = UsuarioForm()
    return render(request, 'catalogo/registro.html', {'form': form})
