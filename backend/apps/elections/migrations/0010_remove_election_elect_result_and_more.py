# Generated by Django 4.2.2 on 2024-01-17 08:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('elections', '0009_electionsorting_electionpartysorting'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='election',
            name='elect_result',
        ),
        migrations.RemoveField(
            model_name='election',
            name='elect_type',
        ),
        migrations.AddField(
            model_name='election',
            name='election_method',
            field=models.CharField(blank=True, choices=[('COS', 'Candidate Only System'), ('POS', 'Party Only System'), ('CCPS', 'Combined Candidate Party System'), ('PRS', 'Proportional Representation System'), ('MES', 'Mixed Electoral System'), ('STVS', 'Single Transferable Vote System')], max_length=50, null=True, verbose_name='Election Type'),
        ),
        migrations.AddField(
            model_name='election',
            name='election_result',
            field=models.CharField(blank=True, choices=[('Total', 'Total'), ('Detailed', 'Detailed'), ('PVR', 'Party Voting Results'), ('IO', 'Individual Only')], max_length=50, null=True, verbose_name='Election Result Type'),
        ),
        migrations.AlterField(
            model_name='electionpartysorting',
            name='election_party',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='election_party_sortings', to='elections.electionparty'),
        ),
    ]
