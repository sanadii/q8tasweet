# Generated by Django 4.2.2 on 2023-12-13 16:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('notifications', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='usernotification',
            table='user_notification',
        ),
    ]
