# Generated by Django 4.2.3 on 2023-07-26 14:35

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("restapi", "0011_alter_electioncandidates_candidate_id_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="electioncandidates",
            name="candidate_id",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name="electioncandidates",
            name="election_id",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
