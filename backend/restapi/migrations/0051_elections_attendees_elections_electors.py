# Generated by Django 4.2.2 on 2023-08-14 06:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restapi', '0050_electioncandidates_is_active'),
    ]

    operations = [
        migrations.AddField(
            model_name='elections',
            name='attendees',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='elections',
            name='electors',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
