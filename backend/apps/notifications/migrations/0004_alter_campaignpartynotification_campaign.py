# Generated by Django 4.2.2 on 2024-01-10 13:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('campaigns', '0004_rename_campaign_party_campaignpartyguarantee_campaign'),
        ('notifications', '0003_campaignpartynotification'),
    ]

    operations = [
        migrations.AlterField(
            model_name='campaignpartynotification',
            name='campaign',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='notification_campaign_partiess', to='campaigns.campaignparty'),
        ),
    ]