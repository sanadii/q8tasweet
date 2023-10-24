# Generated by Django 4.2.2 on 2023-10-23 12:06

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("candidates", "0001_initial"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("categories", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Election",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(blank=True, null=True)),
                ("deleted_at", models.DateTimeField(blank=True, null=True)),
                ("deleted", models.BooleanField(blank=True, default=False, null=True)),
                (
                    "status",
                    models.IntegerField(
                        blank=True,
                        choices=[
                            (1, "منشور"),
                            (2, "خاص"),
                            (3, "في أنتظار الموافقة"),
                            (4, "يفتقد للبيانات"),
                            (5, "جاري العمل عليه"),
                            (6, "جديد"),
                            (9, "محذوف"),
                        ],
                        null=True,
                    ),
                ),
                (
                    "priority",
                    models.IntegerField(
                        blank=True,
                        choices=[(3, "عالي"), (2, "متوسط"), (1, "منخفض")],
                        null=True,
                    ),
                ),
                ("moderators", models.CharField(blank=True, max_length=255, null=True)),
                ("due_date", models.DateField(blank=True, null=True)),
                (
                    "elect_type",
                    models.IntegerField(
                        blank=True,
                        choices=[(1, "قوائم"), (2, "مرشحين"), (3, "قوائم ومرشحين")],
                        null=True,
                    ),
                ),
                (
                    "elect_result",
                    models.IntegerField(
                        blank=True,
                        choices=[(1, "نتائج نهائية"), (2, "نتائج تفصيلية")],
                        null=True,
                    ),
                ),
                ("elect_votes", models.PositiveIntegerField(blank=True, null=True)),
                ("elect_seats", models.PositiveIntegerField(blank=True, null=True)),
                (
                    "first_winner_votes",
                    models.PositiveIntegerField(blank=True, null=True),
                ),
                (
                    "last_winner_votes",
                    models.PositiveIntegerField(blank=True, null=True),
                ),
                ("electors", models.PositiveIntegerField(blank=True, null=True)),
                ("electors_males", models.PositiveIntegerField(blank=True, null=True)),
                (
                    "electors_females",
                    models.PositiveIntegerField(blank=True, null=True),
                ),
                ("attendees", models.PositiveIntegerField(blank=True, null=True)),
                ("attendees_males", models.PositiveIntegerField(blank=True, null=True)),
                (
                    "attendees_females",
                    models.PositiveIntegerField(blank=True, null=True),
                ),
                (
                    "category",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="category_elections",
                        to="categories.category",
                    ),
                ),
                (
                    "created_by",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="%(class)s_created",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "deleted_by",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="%(class)s_deleted",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "sub_category",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="subcategory_elections",
                        to="categories.category",
                    ),
                ),
                (
                    "updated_by",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="%(class)s_updated",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "verbose_name": "Election",
                "verbose_name_plural": "Election",
                "db_table": "election",
                "permissions": [
                    ("canViewElection", "Can View Election"),
                    ("canAddElection", "Can Add Election"),
                    ("canChangeElection", "Can Change Election"),
                    ("canDeleteElection", "Can Delete Election"),
                ],
                "default_permissions": [],
            },
        ),
        migrations.CreateModel(
            name="ElectionCandidate",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(blank=True, null=True)),
                ("deleted_at", models.DateTimeField(blank=True, null=True)),
                ("deleted", models.BooleanField(blank=True, default=False, null=True)),
                ("votes", models.PositiveIntegerField(default=0)),
                ("notes", models.TextField(blank=True, null=True)),
                (
                    "candidate",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="election_candidates",
                        to="candidates.candidate",
                    ),
                ),
                (
                    "created_by",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="%(class)s_created",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "deleted_by",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="%(class)s_deleted",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "election",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="candidate_elections",
                        to="elections.election",
                    ),
                ),
                (
                    "updated_by",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="%(class)s_updated",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "verbose_name": "Election Candidate",
                "verbose_name_plural": "Election Candidate",
                "db_table": "election_candidate",
                "permissions": [
                    ("canViewElectionCandidate", "Can View Election Candidate"),
                    ("canAddElectionCandidate", "Can Add Election Candidate"),
                    ("canChangeElectionCandidate", "Can Change Election Candidate"),
                    ("canDeleteElectionCandidate", "Can Delete Election Candidate"),
                ],
                "default_permissions": [],
            },
        ),
        migrations.CreateModel(
            name="ElectionCommittee",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(blank=True, null=True)),
                ("deleted_at", models.DateTimeField(blank=True, null=True)),
                ("deleted", models.BooleanField(blank=True, default=False, null=True)),
                ("name", models.CharField(max_length=255)),
                (
                    "gender",
                    models.IntegerField(
                        blank=True,
                        choices=[(0, "Undefined"), (1, "رجال"), (2, "نساء")],
                        null=True,
                    ),
                ),
                ("location", models.TextField(blank=True, null=True)),
                (
                    "created_by",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="%(class)s_created",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "deleted_by",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="%(class)s_deleted",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "election",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="committee_elections",
                        to="elections.election",
                    ),
                ),
                (
                    "updated_by",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="%(class)s_updated",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "verbose_name": "Election Committe",
                "verbose_name_plural": "Election Committes",
                "db_table": "election_committee",
                "permissions": [
                    ("canViewElectionCommitte", "Can View Election Committe"),
                    ("canAddElectionCommitte", "Can Add Election Committe"),
                    ("canChangeElectionCommitte", "Can Change Election Committe"),
                    ("canDeleteElectionCommitte", "Can Delete Election Committe"),
                ],
                "default_permissions": [],
            },
        ),
        migrations.CreateModel(
            name="ElectionCommitteeResult",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(blank=True, null=True)),
                ("deleted_at", models.DateTimeField(blank=True, null=True)),
                ("deleted", models.BooleanField(blank=True, default=False, null=True)),
                ("votes", models.IntegerField(blank=True, null=True)),
                (
                    "created_by",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="%(class)s_created",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "deleted_by",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="%(class)s_deleted",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "election_candidate",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="committee_result_candidates",
                        to="elections.electioncandidate",
                    ),
                ),
                (
                    "election_committee",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="committee_result_elections",
                        to="elections.electioncommittee",
                    ),
                ),
                (
                    "updated_by",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="%(class)s_updated",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "verbose_name": "Committe Result",
                "verbose_name_plural": "Committe Results",
                "db_table": "election_committee_result",
                "permissions": [
                    ("canViewCommitteeResult", "Can View Committee Result"),
                    ("canAddCommitteeResult", "Can Add Committee Result"),
                    ("canChangeCommitteeResult", "Can Change Committee Result"),
                    ("canDeleteCommitteeResult", "Can Delete Committee Result"),
                ],
                "default_permissions": [],
            },
        ),
    ]