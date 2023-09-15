# Generated by Django 4.2.2 on 2023-09-15 09:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('restapi', '0095_electioncommittees_gender_alter_campaignmembers_rank_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='CommitteeResults',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('result', models.IntegerField(blank=True, null=True)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('updated_date', models.DateTimeField(auto_now=True)),
                ('deleted_date', models.DateTimeField(auto_now=True)),
                ('deleted', models.BooleanField(default=False)),
                ('created_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='created_committees_results', to=settings.AUTH_USER_MODEL)),
                ('deleted_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='deleted_committees_results', to=settings.AUTH_USER_MODEL)),
                ('election_candidate', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='restapi.electioncandidates')),
                ('election_committee', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='restapi.electioncommittees')),
                ('updated_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='updated_committees_results', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Committe Result',
                'verbose_name_plural': 'Committe Results',
                'db_table': 'committee_result',
            },
        ),
    ]
