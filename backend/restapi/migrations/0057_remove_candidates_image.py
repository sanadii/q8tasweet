# Generated by Django 4.2.2 on 2023-08-15 05:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('restapi', '0056_candidates_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='candidates',
            name='image',
        ),
    ]
