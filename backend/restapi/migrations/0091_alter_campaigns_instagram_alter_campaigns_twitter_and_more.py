# Generated by Django 4.2.2 on 2023-09-12 09:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restapi', '0090_alter_campaigns_options_alter_candidates_options_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='campaigns',
            name='instagram',
            field=models.CharField(blank=True, max_length=120, null=True),
        ),
        migrations.AlterField(
            model_name='campaigns',
            name='twitter',
            field=models.CharField(blank=True, max_length=120, null=True),
        ),
        migrations.AlterField(
            model_name='campaigns',
            name='website',
            field=models.URLField(blank=True, max_length=120, null=True),
        ),
    ]