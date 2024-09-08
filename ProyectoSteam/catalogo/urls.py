from django.urls import path
from catalogo.views import usuario, juego, categoria, compra

app_name = 'catalogo'

urlpatterns = [
    path('registro/', usuario.registrar_usuario, name='registro_usuario'),
    path('categorias/', categoria.listar_categorias, name='listar_categorias'),
    path('juegos/', juego.listar_juegos, name='listar_juegos'),
    path('juego/<int:id>/', juego.detalle_juego, name='detalle_juego'),
    path('compra/', compra.registrar_compra, name='registrar_compra'),
]
