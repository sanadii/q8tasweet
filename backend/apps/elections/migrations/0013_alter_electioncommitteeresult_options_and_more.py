# Generated by Django 4.2.2 on 2024-01-18 16:43

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('elections', '0012_alter_election_election_result'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='electioncommitteeresult',
            options={'verbose_name': 'Election Committee Result', 'verbose_name_plural': 'Election Committee Results'},
        ),
        migrations.AddField(
            model_name='electioncommitteeresult',
            name='notes',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='electioncommitteeresult',
            name='election_candidate',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(class)s_election_candidates', to='elections.electioncandidate'),
        ),
        migrations.AlterField(
            model_name='electioncommitteeresult',
            name='election_committee',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(class)s_election_committees', to='elections.electioncommittee'),
        ),
        migrations.AlterField(
            model_name='electioncommitteeresult',
            name='votes',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.CreateModel(
            name='ElectionPartyCommitteeResult',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(blank=True, null=True)),
                ('deleted_at', models.DateTimeField(blank=True, null=True)),
                ('deleted', models.BooleanField(default=False)),
                ('votes', models.PositiveIntegerField(default=0)),
                ('notes', models.TextField(blank=True, null=True)),
                ('created_by', models.ForeignKey(blank=True, help_text='The user who created this object.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(class)s_created', to=settings.AUTH_USER_MODEL, verbose_name='Created by')),
                ('deleted_by', models.ForeignKey(blank=True, help_text='The user who deleted this object.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(class)s_deleted', to=settings.AUTH_USER_MODEL, verbose_name='Deleted by')),
                ('election_candidate', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(class)s_election_candidates', to='elections.electioncandidate')),
                ('election_committee', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(class)s_election_committees', to='elections.electioncommittee')),
                ('election_party', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(class)s_election_parties', to='elections.electionparty')),
                ('updated_by', models.ForeignKey(blank=True, help_text='The user who updated this object.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(class)s_updated', to=settings.AUTH_USER_MODEL, verbose_name='Updated by')),
            ],
            options={
                'verbose_name': 'Election Party Committee Result',
                'verbose_name_plural': 'Election Party Committee Results',
                'db_table': 'election_party_committee_result',
            },
        ),
        migrations.CreateModel(
            name='ElectionPartyCandidateSorting',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('votes', models.PositiveIntegerField(default=0)),
                ('notes', models.TextField(blank=True, null=True)),
                ('election_committee', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(class)s_election_committees', to='elections.electioncommittee')),
                ('election_party_candidate', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='election_party_candidate_sortings', to='elections.electionpartycandidate')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(class)s_users', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Election Party Candidate Sorting',
                'verbose_name_plural': 'Election Party Candidate  Sortings',
                'db_table': 'election_party_candidate_sorting',
                'permissions': [('canViewElectionSorting', 'Can View Election Sorting'), ('canAddElectionSorting', 'Can Add Election Sorting'), ('canChangeElectionSorting', 'Can Change Election Sorting'), ('canDeleteElectionSorting', 'Can Delete Election Sorting')],
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ElectionPartyCandidateCommitteeResult',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(blank=True, null=True)),
                ('deleted_at', models.DateTimeField(blank=True, null=True)),
                ('deleted', models.BooleanField(default=False)),
                ('votes', models.PositiveIntegerField(default=0)),
                ('notes', models.TextField(blank=True, null=True)),
                ('created_by', models.ForeignKey(blank=True, help_text='The user who created this object.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(class)s_created', to=settings.AUTH_USER_MODEL, verbose_name='Created by')),
                ('deleted_by', models.ForeignKey(blank=True, help_text='The user who deleted this object.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(class)s_deleted', to=settings.AUTH_USER_MODEL, verbose_name='Deleted by')),
                ('election_candidate', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(class)s_election_candidates', to='elections.electioncandidate')),
                ('election_committee', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(class)s_election_committees', to='elections.electioncommittee')),
                ('election_party_candidate', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(class)s_election_party_candidates', to='elections.electionpartycandidate')),
                ('updated_by', models.ForeignKey(blank=True, help_text='The user who updated this object.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='%(class)s_updated', to=settings.AUTH_USER_MODEL, verbose_name='Updated by')),
            ],
            options={
                'verbose_name': 'Election Party Candidate Committee Result',
                'verbose_name_plural': 'Election Party Candidate Committee Results',
                'db_table': 'election_party_candidate_committee_result',
            },
        ),
    ]