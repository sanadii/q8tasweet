from django.conf.urls import url
from restapi import views


urlpatterns = [
    url(r'getUser', views.getUser),
    #
    url(r'getElection/', views.getElection),
    url(r'delElection/', views.delElection),
    url(r'addElection', views.addElection),
    url(r'updateElection', views.updateElection),
    #
    url(r'getMenu', views.getMenu),
]
