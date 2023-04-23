from django.conf.urls import url
from restapi import views


urlpatterns = [
    url(r'upLoadImage', views.upLoadImage),
    url(r'getImage/', views.getImage),
    #
    url(r'getElection/', views.getElection),
    url(r'delElection/', views.delElection),
    url(r'addElection', views.addElection),
    url(r'updateElection', views.updateElection),
    #
    url(r'getAllElection', views.getAllElection),
    url(r'getUserElection/', views.getUserElection),
    url(r'getUpElection', views.getUpElection),
    url(r'getPrev5Election', views.getPrev5Election),
    url(r'getElectionId/', views.getElectionId),
    url(r'getCountCandidate/', views.getCountCandidate),
    #
    url(r'getUserTeamCount/', views.getUserTeamCount),
    url(r'getSupervisorTeamCount/', views.getSupervisorTeamCount),
    #
    url(r'getMyGuanatorId/', views.getMyGuanatorId),
    url(r'delMyGuanatorId/', views.delMyGuanatorId),
    url(r'addMyGuanatorId', views.addMyGuanatorId),
    #
    url(r'getGuaranteesCount/', views.getGuaranteesCount),
    url(r'getUserId/', views.getUserId),
    url(r'getIdUser', views.getIdUser),
    #
    url(r'getMyCandidateId/', views.getMyCandidateId),
    url(r'getCandidateElection/', views.getCandidateElection),
    url(r'addMyCandidateId', views.addMyCandidateId),
    #
    url(r'getElectionCandidate/', views.getElectionCandidate),
    url(r'getElectionCandidateId/', views.getElectionCandidateId),
    url(r'getElectionCount/', views.getElectionCount),
    #
    url(r'getMenu', views.getMenu),
    url(r'delMenu/', views.delMenu),
    url(r'addMenu', views.addMenu),
    # url(r'updateMenu', views.updateMenu),
    #
    url(r'getPermission/', views.getPermission),
    url(r'addPermission', views.addPermission),
    url(r'updatePermission', views.updatePermission),
    url(r'delPermission/', views.delPermission),
    #
    url(r'getAllPermission', views.getAllPermission),
    #
    url(r'getRole/', views.getRole),
    url(r'addRole', views.addRole),
    url(r'updateRole', views.updateRole),
    url(r'delRole/', views.delRole),
    #
    url(r'getAllRole', views.getAllRole),
    #
    url(r'getRank/', views.getRank),
    url(r'addRank', views.addRank),
    url(r'updateRank', views.updateRank),
    url(r'delRank/', views.delRank),
    #
    url(r'getAllRank', views.getAllRank),
    #
    url(r'getUser/', views.getUser),
    url(r'addUser', views.addUser),
    url(r'updateUser', views.updateUser),
    url(r'delUser/', views.delUser),
    #
    url(r'getMyTeamId/', views.getMyTeamId),
    url(r'addMyTeamId', views.addMyTeamId),
    # url(r'updateUser', views.updateUser),
    url(r'delMyTeamId/', views.delMyTeamId),
]
