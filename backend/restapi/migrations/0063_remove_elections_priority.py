# Generated by Django 4.2.2 on 2023-08-16 19:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('restapi', '0062_alter_attendees_status_alter_campaigns_priority_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='elections',
            name='priority',
        ),
    ]
