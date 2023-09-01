# Generated by Django 4.2.3 on 2023-07-26 15:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("restapi", "0012_alter_electioncandidates_candidate_id_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="electioncandidates",
            name="candidate_id",
        ),
        migrations.RemoveField(
            model_name="electioncandidates",
            name="election_id",
        ),
        migrations.AddField(
            model_name="electioncandidates",
            name="candidate",
            field=models.ForeignKey(
                default=1,
                on_delete=django.db.models.deletion.SET_DEFAULT,
                to="restapi.candidates",
            ),
        ),
        migrations.AddField(
            model_name="electioncandidates",
            name="election",
            field=models.ForeignKey(
                default=1,
                on_delete=django.db.models.deletion.SET_DEFAULT,
                to="restapi.elections",
            ),
        ),
    ]
