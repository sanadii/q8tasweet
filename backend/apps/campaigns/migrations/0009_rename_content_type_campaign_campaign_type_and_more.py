# Generated by Django 4.2.2 on 2024-01-12 07:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('campaigns', '0008_campaign_content_type_campaign_object_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='campaign',
            old_name='content_type',
            new_name='campaign_type',
        ),
        migrations.RemoveField(
            model_name='campaign',
            name='campaign_candidate',
        ),
        migrations.RemoveField(
            model_name='campaign',
            name='campaign_party',
        ),
    ]