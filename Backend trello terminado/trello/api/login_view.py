# Django - trello/api/login_view.py
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt  # Solo para desarrollo. En producción, deberías manejar CSRF adecuadamente.
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        # Autenticamos al usuario con las credenciales proporcionadas
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)  # Crear sesión
            return JsonResponse({'message': 'Inicio de sesión exitosa'}, status=200)
        else:
            return JsonResponse({'error': 'Credenciales no válidas'}, status=400)

    return JsonResponse({'error': 'Invalid method'}, status=405)
