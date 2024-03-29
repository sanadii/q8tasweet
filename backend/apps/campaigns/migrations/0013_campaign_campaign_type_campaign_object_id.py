# Generated by Django 4.2.2 on 2024-01-12 09:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('campaigns', '0012_remove_campaign_campaign_type_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='campaign',
            name='campaign_type',
            field=models.ForeignKey(default=31, on_delete=django.db.models.deletion.CASCADE, to='contenttypes.contenttype'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='campaign',
            name='object_id',
            field=models.PositiveIntegerField(default=193),
            preserve_default=False,
        ),
    ]
