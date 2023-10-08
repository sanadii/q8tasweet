# Generated by Django 4.2.2 on 2023-10-07 03:57

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("restapi", "0013_authgroupcategory_customgroup"),
    ]

    operations = [
        migrations.DeleteModel(
            name="AuthGroupCategory",
        ),
        migrations.RemoveField(
            model_name="userprofile",
            name="user",
        ),
        migrations.AlterField(
            model_name="user",
            name="instagram",
            field=models.CharField(blank=True, max_length=150),
        ),
        migrations.AlterField(
            model_name="user",
            name="twitter",
            field=models.CharField(blank=True, max_length=150),
        ),
        migrations.AlterModelTable(
            name="user",
            table="users_user",
        ),
        migrations.DeleteModel(
            name="CustomGroup",
        ),
        migrations.DeleteModel(
            name="UserProfile",
        ),
    ]
