# restapi/urls.py

from django.urls import path, include

urlpatterns = [
<<<<<<< HEAD
    path('campaigns/', include('restapi.campaigns.urls')),
    path('candidates/', include('restapi.candidates.urls')),
    path('categories/', include('restapi.categories.urls')),
    path('elections/', include('restapi.elections.urls')),
    path('electors/', include('restapi.electors.urls')),
    path('projectInfo/', include('restapi.projectInfo.urls')),
    path('users/', include('restapi.users.urls')),
    # ... additional submodules ...
]
=======
    # Home / Admin
    #     re_path(r'^$', views.index, name='index'),
    # path("projectInfo", ProjectInfo.as_view(), name="projectInfo"),

    # Elections
    path("getElections", GetElections.as_view(), name="GetElections"),
    path("addElection",AddElection.as_view(), name="AddElection"),
    path("deleteElection/<int:id>", DeleteElection.as_view(), name="DeleteElection"),
    path("updateElection/<int:id>", UpdateElection.as_view(), name="UpdateElection"),
    path("getElectionDetails/<int:id>", GetElectionDetails.as_view(), name="GetElectionDetails"),
    
    # Election Candidates
    # path("getElectionCandidates/<int:election_id>", GetElectionCandidates.as_view(), name="getElectionCandidates"),
    path("addNewElectionCandidate", AddNewElectionCandidate.as_view(), name="AddNewElectionCandidate"),
    path("deleteElectionCandidate/<int:id>", DeleteElectionCandidate.as_view(), name="DeleteElectionCandidate"),
    path("updateElectionCandidate/<int:id>", UpdateElectionCandidate.as_view(), name="UpdateElectionCandidate"),

    # Election Committees
    # path("getElectionCommittees/<int:election_id>", GetElectionCommittees.as_view(), name="getElectionCommittees"),
    path("addNewElectionCommittee", AddNewElectionCommittee.as_view(), name="AddNewElectionCommittee"),
    path("deleteElectionCommittee/<int:id>", DeleteElectionCommittee.as_view(), name="DeleteElectionCommittee"),
    path("updateElectionCommittee/<int:id>", UpdateElectionCommittee.as_view(), name="UpdateElectionCommittee"),
    path("updateElectionCommitteeResults/<int:id>", UpdateElectionCommitteeResults.as_view(), name="UpdateElectionCommitteeResults"),


    # Candidates
    path("getCandidates", GetCandidates.as_view(), name="GetCandidates"),
    path("addNewCandidate", AddNewCandidate.as_view(), name="AddNewCandidate"),
    path("deleteCandidate/<int:id>", DeleteCandidate.as_view(), name="DeleteCandidate"),
    path("updateCandidate/<int:id>", UpdateCandidate.as_view(), name="UpdateCandidate"),

    # Candidate Details
    # path("getCandidateDetails/<int:id>", GetCandidateDetails.as_view(), name="GetCandidateDetails"),
    # path("getCandidateCandidates", GetCandidateCandidates.as_view(), name="GetCandidateCandidates"),
    # path("getCandidateCandidates/<int:id>", GetCandidateCandidates.as_view(), name="GetCandidateCandidates"),

    # Candidate Candidates
    # path("getCandidateCandidates/<int:candidate_id>", GetCandidateCandidates.as_view(), name="getCandidateCandidates"),
    # path("addNewCandidateCandidate", AddNewCandidateCandidate.as_view(), name="AddNewCandidateCandidate"),
    # path("deleteCandidateCandidate/<int:id>", DeleteCandidateCandidate.as_view(), name="DeleteCandidateCandidate"),
    # path("updateCandidateCandidate/<int:id>", UpdateCandidateCandidate.as_view(), name="UpdateCandidateCandidate"),


    # Campaigns
    path("getCampaigns", GetCampaigns.as_view(), name="getCampaigns"),
    path("getCampaignDetails/<int:id>", GetCampaignDetails.as_view(), name="getCampaignDetails"),
    path("addNewCampaign", AddNewCampaign.as_view(), name="AddNewCampaign"),
    path("deleteCampaign/<int:id>", DeleteCampaign.as_view(), name="DeleteCampaign"),
    # path("updateCampaign/<int:id>", UpdateCampaign.as_view(), name="UpdateCampaign"),
    # path("getCampaignCount", GetCampaignCount.as_view(), name="GetCampaignCount"),


    # # Election Campaigns
    # path("getElectionCampaigns/<int:id>", GetElectionCampaigns.as_view(), name="getElectionCampaigns"),
    # # path('getElectionCampaigns', GetElectionCampaigns.as_view(), name='getElectionCampaigns'),
    path("addNewCampaignMember", AddNewCampaignMember.as_view(), name="AddNewCampaignMember"),
    path("deleteCampaignMember/<int:id>", DeleteCampaignMember.as_view(), name="DeleteCampaignMember"),
    path("updateCampaignMember/<int:id>", UpdateCampaignMember.as_view(), name="UpdateCampaignMember"),


    # # Election Campaigns

    # Media
    path("uploadImage", UploadImage.as_view(), name="uploadImage"),

    # Terms
    path("getCategories", GetCategories.as_view(), name="GetCategories"),
    path("updateCategory/<int:id>", UpdateCategory.as_view(), name="UpdateCategory"),


    # Electors
    path("getAllElectors", GetAllElectors.as_view(), name="GetAllElectors"),
    path("getElectors", GetElectors.as_view(), name="GetElectors"),

    # Guarantees
    path("addNewCampaignGuarantee", AddNewCampaignGuarantee.as_view(), name="AddNewMemberGuarantee"),
    path("deleteCampaignGuarantee/<int:id>", DeleteCampaignGuarantee.as_view(), name="DeleteCampaignGuarantee"),
    path("updateCampaignGuarantee/<int:id>", UpdateCampaignGuarantee.as_view(), name="UpdateCampaignGuarantee"),

    # Attendees
    path("addNewElectionAttendee", AddNewElectionAttendee.as_view(), name="AddNewElectionAttendee"),
    path("deleteElectionAttendee/<int:id>", DeleteElectionAttendee.as_view(), name="DeleteElectionAttendee"),
    path("updateElectionAttendee/<int:id>", UpdateElectionAttendee.as_view(), name="UpdateElectionAttendee"),

    # Attendees
    path("getPublicElections", GetPublicElections.as_view(), name="GetPublicElections"),
    path("getPublicElectionDetails", GetPublicElectionDetails.as_view(), name="GetPublicElectionDetails"),
]
>>>>>>> backup-branch
