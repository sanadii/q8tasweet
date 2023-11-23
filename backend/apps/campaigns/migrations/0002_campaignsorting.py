# Generated by Django 4.2.2 on 2023-11-22 14:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('elections', '0001_initial'),
        ('campaigns', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CampaignSorting',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(blank=True, null=True)),
                ('deleted_at', models.DateTimeField(blank=True, null=True)),
                ('deleted', models.BooleanField(default=False)),
                ('votes', models.PositiveIntegerField(default=0)),
                ('notes', models.TextField(blank=True, null=True)),
                ('committee', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='committee_sortees', to='elections.electioncommittee')),
                ('created_by', models.ForeignKey(blank=True, help_text='The user who created this object.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(class)s_created', to=settings.AUTH_USER_MODEL, verbose_name='Created by')),
                ('deleted_by', models.ForeignKey(blank=True, help_text='The user who deleted this object.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(class)s_deleted', to=settings.AUTH_USER_MODEL, verbose_name='Deleted by')),
                ('electionCandidate', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='election_candiddate_sortings', to='elections.electioncandidate')),
                ('updated_by', models.ForeignKey(blank=True, help_text='The user who updated this object.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(class)s_updated', to=settings.AUTH_USER_MODEL, verbose_name='Updated by')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='sorter_sortees', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Campaign Sorting',
                'verbose_name_plural': 'Campaign Sortings',
                'db_table': 'campaign_sorting',
                'permissions': [('canViewCampaignSorting', 'Can View Campaign Sorting'), ('canAddCampaignSorting', 'Can Add Campaign Sorting'), ('canChangeCampaignSorting', 'Can Change Campaign Sorting'), ('canDeleteCampaignSorting', 'Can Delete Campaign Sorting')],
                'default_permissions': [],
            },
        ),
    ]
