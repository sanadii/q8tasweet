# Generated by Django 4.2.2 on 2023-10-25 21:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('candidates', '0002_candidate_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='candidate',
            name='slug',
            field=models.SlugField(blank=True, max_length=255, null=True, unique=True),
        ),
    ]
