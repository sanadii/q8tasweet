# Elections Urls: restapi/elections/urls.py
from django.urls import path
from .views import *

# from .views.candidates import *
from rest_framework.routers import DefaultRouter

app_name = "elections"

urlpatterns = [
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
]