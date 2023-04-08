import json
from django.shortcuts import render

# Create your views here.
from django.http.response import JsonResponse
from rest_framework.decorators import api_view


from .serializers import electionSerializer, userSerializer, menuSerializer
from .models import TbUsers, TbElections, TbMenu


@api_view(['GET'])
def getUser(request):
    if request.method == 'GET':
        users = TbUsers.objects.all()
        # number = request.GET.get('number', None)
        users_serializer = userSerializer(users, many=True)
        return JsonResponse(users_serializer.data, safe=False)


@api_view(['GET'])
def getMenu(request):
    if request.method == 'GET':
        menus = TbMenu.objects.all()
        # number = request.GET.get('number', None)
        menus_serializer = menuSerializer(menus, many=True)
        return JsonResponse({"data": menus_serializer.data}, safe=False)


@api_view(['GET'])
def getElection(request):
    queryprms = request.GET
    limit = int(queryprms.get('limit', 5))
    keyword = queryprms.get('keyword', "")
    pagenum = int(queryprms.get('pagenum', 1))
    filter = queryprms.get('filter', "id")
    sorter = queryprms.get('sorter', "asc")
    election_data = TbElections.objects.raw(
        'select * from tb_elections where title rlike "' + keyword + '" order by ' + filter + ' ' + sorter + ' limit ' + str(limit) + ' offset ' + str(limit * (pagenum - 1)))
    election_serializer = electionSerializer(election_data, many=True)
    election_count = TbElections.objects.raw(
        'select id, count(*) as count from tb_elections where title rlike "' + keyword + '"')
    return JsonResponse({"data": election_serializer.data, "count": election_count[0].count, "code": 200}, safe=False)


@api_view(['GET'])
def delElection(request):
    queryprms = request.GET
    id = queryprms.get('id', 1)
    limit = int(queryprms.get('limit', 5))
    keyword = queryprms.get('keyword', "")
    pagenum = int(queryprms.get('pagenum', 1))
    filter = queryprms.get('filter', "id")
    sorter = queryprms.get('sorter', "asc")
    election = TbElections.objects.raw(
        'select * from tb_elections where id = ' + id)[0]
    election.del_flag = 1
    election.save()
    election_data = TbElections.objects.raw(
        'select * from tb_elections where title rlike "' + keyword + '" order by ' + filter + ' ' + sorter + ' limit ' + str(limit) + ' offset ' + str(limit * (pagenum - 1)))
    election_serializer = electionSerializer(election_data, many=True)
    election_count = TbElections.objects.raw(
        'select id, count(*) as count from tb_elections where title rlike "' + keyword + '"')
    return JsonResponse({"data": election_serializer.data, "count": election_count[0].count, "code": 200}, safe=False)


@api_view(['POST'])
def addElection(request):
    data = json.loads(request.body)
    election = TbElections(election_id=data["election_id"], title=data["title"], description=data["description"], status=data["status"],
                           date=data["date"], location=data["location"], type=data["type"], moderators=data["moderators"], del_flag=0)
    election.save()
    return JsonResponse({"data": "", "count": 0, "code": 200}, safe=False)


@ api_view(['POST'])
def updateElection(request):
    data = json.loads(request.body)
    election = TbElections.objects.raw(
        'select * from tb_elections where id = ' + str(data['id']))[0]
    election.election_id = data['election_id']
    election.title = data['title']
    election.description = data['description']
    election.status = data['status']
    election.date = data['date']
    election.location = data['location']
    election.type = data['type']
    election.moderators = data['moderators']
    election.save()
    return JsonResponse({"data": "", "count": 0, "code": 200}, safe=False)
