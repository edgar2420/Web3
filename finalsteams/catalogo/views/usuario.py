from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import  authenticate, login
from django.contrib.auth import  logout as auth_logout
from catalogo.forms.login_form import LoginForm
from catalogo.models.usuario import Usuario
from catalogo.forms.usuario import UsuarioForm


# Listar todos los usuarios
def listar_usuarios(request):
    usuarios = Usuario.objects.all()
    return render(request, 'catalogo/usuarios.html', {'usuarios': usuarios})

# Crear un nuevo usuario (Registro)
def crear_usuario(request):
    if request.method == 'POST':
        form = UsuarioForm(request.POST, request.FILES)
        if form.is_valid():
            usuario = form.save(commit=False)
            usuario.set_password(form.cleaned_data['password'])  # Encripta la contraseña
            usuario.save()
            return redirect('catalogo:login')
    else:
        form = UsuarioForm()
    return render(request, 'catalogo/usuario_form.html', {'form': form})



# Editar un usuario existente
def editar_usuario(request, id):
    usuario = get_object_or_404(Usuario, pk=id)
    if request.method == 'POST':
        form = UsuarioForm(request.POST, request.FILES, instance=usuario)
        if form.is_valid():
            form.save()
            return redirect('catalogo:listar_usuarios')
    else:
        form = UsuarioForm(instance=usuario)
    return render(request, 'catalogo/usuario_form.html', {'form': form})

# Eliminar un usuario existente
def eliminar_usuario(request, id):
    usuario = get_object_or_404(Usuario, pk=id)
    if request.method == 'POST':
        usuario.delete()
        return redirect('catalogo:listar_usuarios')
    return render(request, 'catalogo/usuario_confirm_delete.html', {'usuario': usuario})

# Login de usuario
def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data['username']  # Esto ahora es un email
            password = form.cleaned_data['password']

            # Autenticar usando el email como username
            user = authenticate(request, username=email, password=password)

            if user is not None:
                login(request, user)
                return redirect('catalogo:top_juegos')
            else:
                form.add_error(None, 'Correo o contraseña incorrectos. Verifique los datos e intente nuevamente.')
    else:
        form = LoginForm()

    return render(request, 'catalogo/login.html', {'form': form})


# Logout de usuario
def logout_view(request):
    auth_logout(request)
    return redirect('catalogo:login')
