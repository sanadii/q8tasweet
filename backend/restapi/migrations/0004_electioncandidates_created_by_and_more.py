# Generated by Django 4.2.3 on 2023-07-21 12:37

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("restapi", "0003_candidates_created_by_candidates_created_date_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="electioncandidates",
            name="created_by",
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="electioncandidates",
            name="created_date",
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="electioncandidates",
            name="del_flag",
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="electioncandidates",
            name="is_winner",
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="electioncandidates",
            name="position",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name="electioncandidates",
            name="remarks",
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="electioncandidates",
            name="status",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name="electioncandidates",
            name="updated_by",
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="electioncandidates",
            name="updated_date",
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="electioncandidates",
            name="votes_received",
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
