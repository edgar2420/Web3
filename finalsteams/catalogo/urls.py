from django.urls import path
from catalogo.views import usuario, juego, categoria, compra

app_name = 'catalogo'

urlpatterns = [
    # Listar todas las categorías en una página separada
    path('categoria/list/', categoria.categoria_list, name='categoria_list'),
    # Página principal (Raíz) - Mostrará las categorías
    path('', categoria.listar_categorias, name='listar_categorias'),  # Página principal

    # Usuarios
    path('usuarios/', usuario.listar_usuarios, name='listar_usuarios'),
    path('usuarios/crear/', usuario.crear_usuario, name='crear_usuario'),
    path('usuarios/editar/<int:id>/', usuario.editar_usuario, name='editar_usuario'),
    path('usuarios/eliminar/<int:id>/', usuario.eliminar_usuario, name='eliminar_usuario'),

    # Categorías
    path('categorias/', categoria.listar_categorias, name='listar_categorias')
,
    path('categorias/crear/', categoria.crear_categoria, name='crear_categoria'),
    path('categorias/editar/<int:id>/', categoria.editar_categoria, name='editar_categoria'),
    path('categorias/eliminar/<int:id>/', categoria.eliminar_categoria, name='eliminar_categoria'),

    #inicio sesion
    path('login/', usuario.login_view, name='login'),
    path('logout/', usuario.logout_view, name='logout'),
    # Juegos
    path('juegos/', juego.listar_juegos, name='listar_juegos'),
    path('juego/<int:id>/', juego.detalle_juego, name='detalle_juego'),

    # Filtrar juegos por categoría
    path('categoria/<int:id>/', juego.listar_juegos_por_categoria, name='listar_juegos_por_categoria'),

    # Top 20 juegos más comprados
    path('top-juegos/', juego.top_juegos, name='top_juegos'),

    # CRUD de juegos
    path('juegos/crear/', juego.crear_juego, name='crear_juego'),
    path('juegos/list/', juego.juego_list, name='juego_list'),
    path('juegos/editar/<int:id>/', juego.editar_juego, name='editar_juego'),
    path('juegos/eliminar/<int:id>/', juego.eliminar_juego, name='eliminar_juego'),

    # Compras
    path('compra/<int:juego_id>/', compra.registrar_compra, name='registrar_compra'),
]


