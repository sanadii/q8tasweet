from django.conf.urls import url
from restapi import views


urlpatterns = [
    #
    url(r'getElection/', views.getElection),
    url(r'delElection/', views.delElection),
    url(r'addElection', views.addElection),
    url(r'updateElection', views.updateElection),
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
]
