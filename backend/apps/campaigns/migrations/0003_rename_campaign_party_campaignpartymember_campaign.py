# Generated by Django 4.2.2 on 2024-01-10 12:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('campaigns', '0002_campaignparty_alter_campaignguarantee_civil_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='campaignpartymember',
            old_name='campaign_party',
            new_name='campaign',
        ),
    ]