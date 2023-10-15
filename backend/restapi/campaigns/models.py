# restapi/campaigns/models
from django.db import models
from django.contrib.auth.models import Group
from django.utils import timezone
from django.core.validators import RegexValidator
from restapi.helper.models_helper import TrackModel, TaskModel, RoleOptions, StatusOptions, GuaranteeStatusOptions, PriorityOptions
from restapi.helper.validators import civil_validator, phone_validator, today

class Campaign(TrackModel, TaskModel):
    # Basic Information
    election_candidate = models.ForeignKey('ElectionCandidate', on_delete=models.SET_NULL, null=True, blank=True, related_name='candidate_campaigns')
    description = models.TextField(blank=True, null=True)

    # Media Coverage
    twitter = models.CharField(max_length=120, blank=True, null=True)
    instagram = models.CharField(max_length=120, blank=True, null=True)
    website = models.URLField(max_length=120, blank=True, null=True)

    # Activities
    target_votes = models.PositiveIntegerField(blank=True, null=True)

    class Meta:
        db_table = "campaign"
        verbose_name = "Campaign"
        verbose_name_plural = "Campaign"

    def __str__(self):
        return f"{self.election_candidate.candidate.name} - Year"  # Assuming the candidate's name is accessible through the relation

class CampaignMember(TrackModel):
    user = models.ForeignKey('User', on_delete=models.SET_NULL, null=True, blank=True, related_name='memberships')
    campaign = models.ForeignKey('Campaign', on_delete=models.SET_NULL, null=True, blank=True, related_name='campaign_members')
    role = models.ForeignKey(Group, on_delete=models.SET_NULL, null=True, blank=True, related_name='campaign_role_members')
    supervisor = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='supervised_members')
    committee = models.ForeignKey('ElectionCommittee', on_delete=models.SET_NULL, null=True, blank=True, related_name='committee_members')
    civil = models.CharField(max_length=12, blank=True, null=True, validators=[civil_validator])
    phone = models.CharField(max_length=8, blank=True, null=True, validators=[phone_validator])
    notes = models.TextField(blank=True, null=True)
    status = models.IntegerField(choices=GuaranteeStatusOptions.choices, blank=True, null=True)
   
    class Meta:
        db_table = 'campaign_member'
        verbose_name = "Campaign Member"
        verbose_name_plural = "Campaign Members"

class CampaignGuarantee(TrackModel):
    campaign = models.ForeignKey('Campaign', on_delete=models.SET_NULL, null=True, blank=True, related_name='campaign_guarantees')
    member = models.ForeignKey('CampaignMember', on_delete=models.SET_NULL, null=True, blank=True, related_name='guarantee_guarantors')
    civil = models.ForeignKey('Elector', on_delete=models.SET_NULL, null=True, blank=True, related_name='elector_guarantees')
    phone = models.CharField(max_length=8, blank=True, null=True)  # or any other field type suitable for your requirements
    notes = models.TextField(blank=True, null=True)
    status = models.IntegerField(choices=GuaranteeStatusOptions.choices, blank=True, null=True)

    class Meta:
        db_table = 'campaign_guarantee'
        verbose_name = "Campaign Guarantee"
        verbose_name_plural = "Campaign Guarantees"
    

class CampaignAttendee(TrackModel):
    user = models.ForeignKey('User', on_delete=models.SET_NULL, null=True, blank=True, related_name='attendant_attendees')
    election = models.ForeignKey('Election', on_delete=models.SET_NULL, null=True, blank=True, related_name='election_attendees')
    committee = models.ForeignKey('ElectionCommittee', on_delete=models.SET_NULL, null=True, blank=True, related_name='committee_attendees')
    civil = models.ForeignKey('Elector', on_delete=models.SET_NULL, null=True, blank=True, related_name='elector_attendees')
    notes = models.TextField(blank=True, null=True)
    status = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'campaign_attendee'
        verbose_name = "Campaign Attendee"
        verbose_name_plural = "Campaign Attendees"
