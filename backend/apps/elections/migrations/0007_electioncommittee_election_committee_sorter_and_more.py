# Generated by Django 4.2.2 on 2024-01-12 13:02

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('elections', '0006_electionpartycandidate_candidate_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='electioncommittee',
            name='election_committee_sorter',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='election_committee_sorter', to=settings.AUTH_USER_MODEL),
        ),
        migrations.DeleteModel(
            name='ElectionCommitteeSorter',
        ),
    ]
