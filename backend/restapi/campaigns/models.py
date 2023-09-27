# Campaigns Models
# restapi/campaigns/models
from django.db import models
from django.utils import timezone
from django.core.validators import RegexValidator

from restapi.modelsHelper import TrackedModel, RankOptions, StatusOptions, GuaranteeStatusOptions, PriorityOptions
from restapi.validators import civil_validator, mobile_validator, today

class Campaigns(TrackedModel):
    # Basic Information
    election_candidate = models.ForeignKey('ElectionCandidates', on_delete=models.SET_NULL, null=True, blank=True, related_name='associated_campaigns')
    description = models.TextField(blank=True, null=True)

    # Media Coverage
    twitter = models.CharField(max_length=120, blank=True, null=True)
    instagram = models.CharField(max_length=120, blank=True, null=True)
    website = models.URLField(max_length=120, blank=True, null=True)

    # Activities
    target_score = models.PositiveIntegerField(blank=True, null=True)
    results = models.IntegerField(blank=True, null=True)
    events = models.PositiveIntegerField(blank=True, null=True)

    # Administration
    moderators = models.CharField(max_length=255, blank=True, null=True)
    status = models.IntegerField(choices=StatusOptions.choices, blank=True, null=True)
    priority = models.IntegerField(choices=PriorityOptions.choices, blank=True, null=True)

    class Meta:
        db_table = "campaign"
        verbose_name = "Campaign"
        verbose_name_plural = "Campaigns"

    def __str__(self):
        return f"{self.election_candidate.candidate.name} - Year"  # Assuming the candidate's name is accessible through the relation

class CampaignMembers(TrackedModel):
    user = models.ForeignKey('User', on_delete=models.SET_NULL, null=True, blank=True, related_name='campaign_users')
    campaign = models.ForeignKey('Campaigns', on_delete=models.SET_NULL, null=True, blank=True, related_name='campaign_members')
    rank = models.IntegerField(choices=RankOptions.choices, blank=True, null=True)
    supervisor = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='campaign_supervisors')
    committee = models.ForeignKey('ElectionCommittees', on_delete=models.SET_NULL, null=True, blank=True, related_name='committee_members')
    civil = models.CharField(max_length=12, blank=True, null=True, validators=[civil_validator])
    mobile = models.CharField(max_length=8, blank=True, null=True, validators=[mobile_validator])
    notes = models.TextField(blank=True, null=True)
    status = models.IntegerField(choices=GuaranteeStatusOptions.choices, blank=True, null=True)
   
    class Meta:
        db_table = 'campaign_member'
        verbose_name = "Campaign Member"
        verbose_name_plural = "Campaign Members"

class CampaignGuarantees(TrackedModel):
    campaign = models.ForeignKey('Campaigns', on_delete=models.SET_NULL, null=True, blank=True, related_name='campaign_guarantees')
    member = models.ForeignKey('CampaignMembers', on_delete=models.SET_NULL, null=True, blank=True, related_name='member_guarantees')
    civil = models.ForeignKey('Electors', on_delete=models.SET_NULL, null=True, blank=True, related_name='civil_guarantees')
    mobile = models.CharField(max_length=8, blank=True, null=True)  # or any other field type suitable for your requirements
    notes = models.TextField(blank=True, null=True)
    status = models.IntegerField(choices=GuaranteeStatusOptions.choices, blank=True, null=True)

    class Meta:
        db_table = 'campaign_guarantee'
        verbose_name = "Campaign Guarantee"
        verbose_name_plural = "Campaign Guarantees"
    

class ElectionAttendees(TrackedModel):
    user = models.ForeignKey('User', on_delete=models.SET_NULL, null=True, blank=True, related_name='attended_elections')
    election = models.ForeignKey('Elections', on_delete=models.SET_NULL, null=True, blank=True, related_name='election_attendees')
    committee = models.ForeignKey('ElectionCommittees', on_delete=models.SET_NULL, null=True, blank=True, related_name='committee_attendees')
    elector = models.ForeignKey('Electors', on_delete=models.SET_NULL, null=True, blank=True, related_name='elector_attendees')
    notes = models.TextField(blank=True, null=True)
    status = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'election_attendee'
        verbose_name = "Election Attendee"
        verbose_name_plural = "Election Attendees"

