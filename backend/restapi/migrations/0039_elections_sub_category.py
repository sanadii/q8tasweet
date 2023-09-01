# Generated by Django 4.2.2 on 2023-08-06 19:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('restapi', '0038_remove_elections_sub_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='elections',
            name='sub_category',
            field=models.ForeignKey(default=0, null=True, on_delete=django.db.models.deletion.SET_DEFAULT, related_name='elections_sub_category', to='restapi.categories'),
        ),
    ]
