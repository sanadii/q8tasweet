# Generated by Django 4.2.2 on 2023-08-13 05:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restapi', '0049_alter_candidates_gender'),
    ]

    operations = [
        migrations.AddField(
            model_name='electioncandidates',
            name='is_active',
            field=models.BooleanField(default=False),
        ),
    ]
