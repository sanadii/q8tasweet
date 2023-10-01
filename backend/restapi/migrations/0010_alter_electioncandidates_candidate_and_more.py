# Generated by Django 4.2.2 on 2023-10-01 13:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("restapi", "0009_alter_electioncandidates_votes"),
    ]

    operations = [
        migrations.AlterField(
            model_name="electioncandidates",
            name="candidate",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="election_candidate_candidates",
                to="restapi.candidates",
            ),
        ),
        migrations.AlterField(
            model_name="electioncandidates",
            name="election",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="election_candidate_elections",
                to="restapi.elections",
            ),
        ),
    ]
