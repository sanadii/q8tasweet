# restapi/campaigns/serializers.py
from rest_framework import serializers
from restapi.helper.base_serializer import TrackMixin, TaskMixin, AdminFieldMixin

from restapi.models import (
    Elections, ElectionCandidates, ElectionCommittees,
    Candidates, 
    Campaigns, CampaignMembers, CampaignGuarantees, CampaignAttendees,
    Electors,
    Categories,
)

from restapi.candidates.serializers import CandidatesSerializer
from restapi.elections.serializers import ElectionsSerializer
from restapi.users.serializers import UserSerializer

class CampaignsSerializer(AdminFieldMixin, serializers.ModelSerializer):
    """ Serializer for the Campaign model. """
    admin_serializer_classes = (TrackMixin, TaskMixin)
    candidate = CandidatesSerializer(source='election_candidate.candidate', read_only=True)
    election = ElectionsSerializer(source='election_candidate.election', read_only=True)
    
    class Meta: 
        model = Campaigns
        fields = [
            "id", "election_candidate", "election", "candidate",
            "description", "target_votes",
            "twitter", "instagram", "website",
            ]
        
    def to_representation(self, instance):
        rep = super().to_representation(instance)
        
        # Remove unwanted fields from nested serializers
        if "election" in rep:
            rep["election"].pop("track", None)
            rep["election"].pop("task", None)
        
        if "candidate" in rep:
            rep["candidate"].pop("track", None)
            rep["candidate"].pop("task", None)

        return rep

class CampaignDetailsSerializer(AdminFieldMixin, serializers.ModelSerializer):

    def get_elections_candidates(self):
        from ..serializers import ElectionsSerializer, CandidatesSerializer

        election = ElectionsSerializer(read_only=True)
        candidate = CandidatesSerializer(read_only=True)
        user = UserSerializer(read_only=True)  # Assuming the user field name is 'user'
        # image = serializers.ImageField(use_url=True)  # Ensure the image's URL is returned, not its data

    class Meta:
        model = ElectionCandidates
        fields = [ "id", "votes", "deleted", "election", "candidate"]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["candidate_id"] = instance.candidate_id
        representation["name"] = instance.candidate.name
        representation["image"] = (
            instance.candidate.image.url if instance.candidate.image else None
        )
        representation["gender"] = instance.candidate.gender
        representation["Candidate_deleted"] = instance.candidate.deleted
        return representation


class CampaignMembersSerializer(serializers.ModelSerializer):
    """ Serializer for the CampaignMembers model. """
    # admin_serializer_classes = (TrackMixin,)

    class Meta:
        model = CampaignMembers
        fields = ["id", "user", "campaign",
                  "rank", "supervisor", "committee", "civil",
                  "phone", "notes", "status"
                ]

    def create(self, validated_data):
        return super().create(validated_data)

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)


class CampaignGuaranteesSerializer(AdminFieldMixin, serializers.ModelSerializer):
    """ Serializer for the CampaignGuarantees model. """
    admin_serializer_classes = (TrackMixin,)

    class Meta:
        model = CampaignGuarantees
        fields = ["id", "campaign", "member", "civil", "phone", "notes", "status"]

    def create(self, validated_data):
        return super().create(validated_data)

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)


class CampaignAttendeesSerializer(AdminFieldMixin, serializers.ModelSerializer):
    """ Serializer for the CampaignAttendees model. """
    admin_serializer_classes = (TrackMixin,)

    class Meta:
        model = CampaignAttendees
        fields = ["id", "user", "election", "committee", "elector", "notes", "status"]

    def create(self, validated_data):
        return super().create(validated_data)

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)



# class CampaignAttendeesSerializer(TrackMixin, serializers.ModelSerializer):
#     full_name = serializers.SerializerMethodField()
#     civil = serializers.SerializerMethodField()
#     gender = serializers.SerializerMethodField()
#     membership_no = serializers.SerializerMethodField()
#     box_no = serializers.SerializerMethodField()
#     enrollment_date = serializers.SerializerMethodField()
#     relationship = serializers.SerializerMethodField()
#     elector_notes = serializers.SerializerMethodField()

#     class Meta:
#         model = CampaignAttendees
#         fields = ["id", "election", "committee", "user", "civil", "full_name", "gender",
#                   "membership_no", "box_no", "enrollment_date", "relationship", "elector_notes", "notes",
#                   "status"
#                   ]

#     def get_full_name(self, obj):
#         try:
#             return obj.elector.full_name if obj.elector else None
#         except Electors.DoesNotExist:
#             return "Not Found"

#     def get_gender(self, obj):
#         try:
#             return obj.elector.gender if obj.elector else None
#         except Electors.DoesNotExist:
#             return "Not Found"

#     def get_membership_no(self, obj):
#         try:
#             return obj.elector.membership_no if obj.elector else None
#         except Electors.DoesNotExist:
#             return "Not Found"

#     def get_box_no(self, obj):
#         try:
#             return obj.elector.box_no if obj.elector else None
#         except Electors.DoesNotExist:
#             return "Not Found"

#     def get_enrollment_date(self, obj):
#         try:
#             return obj.elector.enrollment_date if obj.elector else None
#         except Electors.DoesNotExist:
#             return "Not Found"

#     def get_relationship(self, obj):
#         try:
#             return obj.elector.relationship if obj.elector else None
#         except Electors.DoesNotExist:
#             return "Not Found"

#     def get_elector_notes(self, obj):
#         try:
#             return obj.elector.notes if obj.elector else None
#         except Electors.DoesNotExist:
#             return "Not Found"
        
#     def get_civil(self, obj):
#         try:
#             return obj.elector.civil if obj.elector else None
#         except Electors.DoesNotExist:
#             return "Not Found"


# For CampaignGuaranteesSerializer and CampaignAttendeesSerializer,
# you could have a method like this to avoid repeating the same logic
def get_field_or_not_found(self, obj, field_name):
    try:
        return getattr(obj, field_name) if obj else None
    except Electors.DoesNotExist:
        return "Not Found"
