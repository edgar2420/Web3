from django.http import JsonResponse
from django.contrib.auth.decorators import login_required

# Vista para obtener la información del usuario autenticado
@login_required
def get_authenticated_user(request):
    user = request.user
    return JsonResponse({
        'username': user.username,
        'email': user.email,
    })
