# Generated by Django 4.2.2 on 2023-09-15 19:36

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('restapi', '0097_rename_result_committeeresults_votes'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='CommitteeResults',
            new_name='ElectionCommitteeResults',
        ),
        migrations.AlterModelTable(
            name='electioncommitteeresults',
            table='election_committee_result',
        ),
    ]
