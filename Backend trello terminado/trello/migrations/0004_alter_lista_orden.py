# Generated by Django 5.1.1 on 2024-09-26 02:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trello', '0003_alter_tablero_usuario'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lista',
            name='orden',
            field=models.IntegerField(default=0),
        ),
    ]