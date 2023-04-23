import json
from django.shortcuts import render

# Create your views here.
from django.http.response import JsonResponse
from rest_framework.decorators import api_view

import hashlib
import os
import base64
import random
import string

from django.conf import settings
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.core.serializers import serialize
from django.views.static import serve
from django.http import FileResponse
from django.db import connection

from .serializers import *
from .models import *

SECRET_KEY = b'pseudorandomly generated server secret key'
AUTH_SIZE = 16


@api_view(['POST'])
def upLoadImage(request):
    if request.method == 'POST':
        image = request.FILES.get('image')
        letters = string.ascii_lowercase
        result_str = ''.join(random.choice(letters) for i in range(20))
        if image:
            with open(os.path.join(settings.MEDIA_ROOT, result_str + image.name), 'wb+') as destination:
                for chunk in image.chunks():
                    destination.write(chunk)
            return JsonResponse({'success': True, 'url': result_str + image.name})
    return JsonResponse({'success': False})


@api_view(['GET'])
def getImage(request):
    queryprms = request.GET
    path = queryprms.get('imagePath', 1)
    image_path = os.path.join(settings.MEDIA_ROOT, f'{path}')
    with open(image_path, "rb") as image_file:
        encoded_string = base64.b64encode(open(image_path, "rb").read())
    return JsonResponse({'data': encoded_string.decode("utf-8")})


@api_view(['GET'])
def getMenu(request):
    menus = TbMenu.objects.all()
    menus_serializer = menuSerializer(menus, many=True)
    return JsonResponse({"data": menus_serializer.data}, safe=False)


@api_view(['POST'])
def addMenu(request):
    data = json.loads(request.body)
    data_data = TbMenu(name=data["name"], url=data["url"],
                       parentid=data["parentId"], del_flag=0)
    data_data.save()
    return JsonResponse({"code": 200}, safe=False)


@api_view(['GET'])
def delMenu(request):
    queryprms = request.GET
    id = queryprms.get('id', 1)
    TbMenu.objects.filter(id=id).delete()
    menus = TbMenu.objects.all()
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
        'select id, count(*) as count from tb_elections where del_flag = 0 and title rlike "' + keyword + '"')
    return JsonResponse({"data": election_serializer.data, "count": election_count[0].count, "code": 200}, safe=False)


@api_view(['GET'])
def getAllElection(request):
    data_data = TbElections.objects.all()
    data_serializer = electionSerializer(data_data, many=True)
    return JsonResponse({"data": data_serializer.data, "code": 200}, safe=False)


@api_view(['GET'])
def getPrev5Election(request):
    data_data = TbElections.objects.raw(
        'select * from tb_elections where del_flag = 0 and date < SYSDATE() order by date desc limit 5')
    data_serializer = electionSerializer(data_data, many=True)
    return JsonResponse({"data": data_serializer.data, "code": 200}, safe=False)


@api_view(['GET'])
def getUpElection(request):
    data_data = TbElections.objects.raw(
        'select * from tb_elections where del_flag = 0 and date-0 >= FLOOR((SYSDATE()-0)/1000000)')
    data_serializer = electionSerializer(data_data, many=True)
    return JsonResponse({"data": data_serializer.data, "code": 200}, safe=False)


@api_view(['POST'])
def getIdUser(request):
    data = json.loads(request.body)
    data_data = TbUsers.objects.raw('select id from tb_users where fname = "' +
                                    data["fname"] + '" and lname = "' + data["lname"] + '" and cid = "' + str(data["cid"]) + '" and username = "' + data["username"] + '"')
    return JsonResponse({"data": data_data[0].id, "code": 200}, safe=False)


@api_view(['GET'])
def getUserElection(request):
    queryprms = request.GET
    id = queryprms.get('id', 1)
    data_data = TbUsers.objects.raw(
        'select * from tb_users where del_flag = 0 and election_option = ' + id)
    data_serializer = userSerializer(data_data, many=True)
    return JsonResponse({"data": data_serializer.data, "code": 200}, safe=False)


@api_view(['GET'])
def getCandidateElection(request):
    queryprms = request.GET
    id = queryprms.get('id', 1)
    data_data = TbUsers.objects.raw(
        'select * from tb_users where del_flag = 0 and rank = 2 and election_option = ' + id)
    data_serializer = userSerializer(data_data, many=True)
    return JsonResponse({"data": data_serializer.data, "code": 200}, safe=False)


@api_view(['GET'])
def getCandidateElection(request):
    queryprms = request.GET
    id = queryprms.get('id', 1)
    data_data = TbUsers.objects.raw(
        'select * from tb_users where del_flag = 0 and rank = 2 and election_option = ' + id)
    data_serializer = userSerializer(data_data, many=True)
    return JsonResponse({"data": data_serializer.data, "code": 200}, safe=False)


@api_view(['GET'])
def getElectionId(request):
    queryprms = request.GET
    id = queryprms.get('id', 1)
    data_data = TbElections.objects.raw(
        'select * from tb_elections where id = ' + id)
    data_serializer = electionSerializer(data_data, many=True)
    return JsonResponse({"data": data_serializer.data[0], "code": 200}, safe=False)


@api_view(['GET'])
def getUserId(request):
    queryprms = request.GET
    id = queryprms.get('id', 1)
    data_data = TbUsers.objects.raw('select * from tb_users where id = ' + id)
    data_serializer = userSerializer(data_data, many=True)
    return JsonResponse({"data": data_serializer.data[0], "code": 200}, safe=False)


@api_view(['GET'])
def getCountCandidate(request):
    queryprms = request.GET
    id = queryprms.get('id', 1)
    data_count = TbUsers.objects.raw("select id, count(*) as count from tb_users where del_flag = 0 and election_option = " +
                                     id + " and rank = (select id from tb_user_rank where name = 'candidate')")
    data_total = TbUsers.objects.raw(
        "select id, count(*) as count from tb_users where del_flag = 0 and rank = (select id from tb_user_rank where name = 'candidate')")
    return JsonResponse({"data": {'count': data_count[0].count, 'total': data_total[0].count}, "code": 200}, safe=False)


@api_view(['GET'])
def getUserTeamCount(request):
    queryprms = request.GET
    id = queryprms.get('id', 1)
    cursor = connection.cursor()
    cursor.execute("select id,a.rank, b.name, a.count from (select u.rank, count(*) as count from (select teamuser_id from tb_team_members where candidate_id = " + id +
                   " and del_flag = 0) as t join (select * from tb_users where del_flag = 0) as u on t.teamuser_id = u.id group by u.rank) as a join (select * from tb_user_rank where del_flag = 0) as b on a.rank = b.id", None)
    objs = cursor.fetchall()
    json_data = []
    for obj in objs:
        json_data.append(
            {"id": obj[0], "rank": obj[1], "name": obj[2], "count": obj[3]})
    return JsonResponse({"data": json_data, "code": 200}, safe=False)


@api_view(['GET'])
def getSupervisorTeamCount(request):
    queryprms = request.GET
    id = queryprms.get('id', 1)
    cursor = connection.cursor()
    cursor.execute("select id,a.rank, b.name, a.count from (select u.rank, count(*) as count from (select candidate_id from tb_team_members where teamuser_id = " + id +
                   " and del_flag = 0) as t join (select * from tb_users where del_flag = 0) as u on t.candidate_id = u.id group by u.rank) as a join (select * from tb_user_rank where del_flag = 0) as b on a.rank = b.id", None)
    objs = cursor.fetchall()
    json_data = []
    for obj in objs:
        json_data.append(
            {"id": obj[0], "rank": obj[1], "name": obj[2], "count": obj[3]})
    return JsonResponse({"data": json_data, "code": 200}, safe=False)


@api_view(['GET'])
def getGuaranteesCount(request):
    queryprms = request.GET
    id = queryprms.get('id', 1)
    eid = queryprms.get('eid', 1)
    data_guarantees = TbGuarantees.objects.raw(
        "select id, count(*) as count from tb_guarantees where del_flag = 0 and user_id = " + id + " and election_id = " + eid)
    data_guarantees_all = TbGuarantees.objects.raw(
        "select id, count(*) as count from tb_guarantees where del_flag = 0 and election_id = " + eid)
    return JsonResponse({"data": {'all': data_guarantees_all[0].count, 'my': data_guarantees[0].count}, "code": 200}, safe=False)


@api_view(['GET'])
def getElectionCount(request):
    queryprms = request.GET
    id = queryprms.get('id', 1)
    data_users = TbUsers.objects.raw(
        "select id, count(*) as count from tb_users where del_flag = 0 and election_option = " + id)
    data_guarantees = TbGuarantees.objects.raw(
        "select id, count(*) as count from tb_guarantees where del_flag = 0 and election_id = " + id)
    data_others = TbUsers.objects.raw(
        "select id, count(*) as count from tb_users where del_flag = 0 and election_option != " + id)
    return JsonResponse({"data": {'users': data_users[0].count, 'guarantees': data_guarantees[0].count, 'others': data_others[0].count}, "code": 200}, safe=False)


@api_view(['GET'])
def getElectionCandidate(request):
    queryprms = request.GET
    id = queryprms.get('id', 1)
    data_data = TbUsers.objects.raw("select * from tb_users where del_flag = 0 and election_option = " +
                                    id + " and rank = (select id from tb_user_rank where name = 'candidate')")
    data_serializer = userSerializer(data_data, many=True)
    return JsonResponse({"data": data_serializer.data, "code": 200}, safe=False)


@api_view(['GET'])
def getElectionCandidateId(request):
    queryprms = request.GET
    id = queryprms.get('id', 1)
    data_data = TbUsers.objects.raw("select * from tb_users where id = " + id)
    data_serializer = userSerializer(data_data, many=True)
    return JsonResponse({"data": data_serializer.data[0], "code": 200}, safe=False)


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
        'select id, count(*) as count from tb_elections where del_flag = 0 and title rlike "' + keyword + '"')
    return JsonResponse({"data": election_serializer.data, "count": election_count[0].count, "code": 200}, safe=False)


@api_view(['POST'])
def addElection(request):
    data = json.loads(request.body)
    election = TbElections(image=data["image"], title=data["title"], description=data["description"], status=data["status"],
                           date=data["date"], location=data["location"], type=data["type"], moderators=data["moderators"], del_flag=0)
    election.save()
    return JsonResponse({"data": "", "count": 0, "code": 200}, safe=False)


@ api_view(['POST'])
def updateElection(request):
    data = json.loads(request.body)
    election = TbElections.objects.raw(
        'select * from tb_elections where id = ' + str(data['id']))[0]
    election.image = data['image']
    election.title = data['title']
    election.description = data['description']
    election.status = data['status']
    election.date = data['date']
    election.location = data['location']
    election.type = data['type']
    election.moderators = data['moderators']
    election.save()
    return JsonResponse({"data": "", "count": 0, "code": 200}, safe=False)


@api_view(['GET'])
def getPermission(request):
    queryprms = request.GET
    limit = int(queryprms.get('limit', 5))
    keyword = queryprms.get('keyword', "")
    pagenum = int(queryprms.get('pagenum', 1))
    filter = queryprms.get('filter', "id")
    sorter = queryprms.get('sorter', "asc")
    data_data = TbPermission.objects.raw(
        'select * from tb_permission where del_flag = 0 and name rlike "' + keyword + '" order by ' + filter + ' ' + sorter + ' limit ' + str(limit) + ' offset ' + str(limit * (pagenum - 1)))
    data_serializer = permissionSerializer(data_data, many=True)
    data_count = TbPermission.objects.raw(
        'select id, count(*) as count from tb_permission where del_flag = 0 and name rlike "' + keyword + '"')
    data_menu = TbPermissionMenu.objects.all()
    data_menu_serializer = permissionMenuSerializer(data_menu, many=True)
    return JsonResponse({"data": data_serializer.data, "menu": data_menu_serializer.data, "count": data_count[0].count, "code": 200}, safe=False)


@api_view(['GET'])
def getAllPermission(request):
    data_data = TbPermission.objects.all()
    data_serializer = permissionSerializer(data_data, many=True)
    return JsonResponse({"data": data_serializer.data, "code": 200}, safe=False)


@api_view(['POST'])
def addPermission(request):
    data = json.loads(request.body)
    data_data = TbPermission(
        name=data["name"], description=data["description"], del_flag=0)
    data_data.save()
    data_now = TbPermission.objects.raw('select * from tb_permission where name = "' +
                                        data["name"] + '" and description = "' + data["description"] + '"')[0]
    for x in data["menu"]:
        data_row = TbPermissionMenu(
            permissionid=data_now.id, menuid=x['menuId'], value=x['value'], label=x['label'])
        data_row.save()
    return JsonResponse({"data": "", "count": 0, "code": 200}, safe=False)


@ api_view(['POST'])
def updatePermission(request):
    data = json.loads(request.body)
    data_data = TbPermission.objects.raw(
        'select * from tb_permission where id = ' + str(data['id']))[0]
    data_data.name = data['name']
    data_data.description = data['description']
    data_data.save()
    TbPermissionMenu.objects.filter(permissionid=data['id']).delete()
    for x in data["menu"]:
        data_row = TbPermissionMenu(
            permissionid=data['id'], menuid=x['menuId'], value=x['value'], label=x['label'])
        data_row.save()
    return JsonResponse({"data": "", "count": 0, "code": 200}, safe=False)


@api_view(['GET'])
def delPermission(request):
    queryprms = request.GET
    id = queryprms.get('id', 1)
    limit = int(queryprms.get('limit', 5))
    keyword = queryprms.get('keyword', "")
    pagenum = int(queryprms.get('pagenum', 1))
    filter = queryprms.get('filter', "id")
    sorter = queryprms.get('sorter', "asc")
    TbPermission.objects.filter(id=id).delete()
    TbPermissionMenu.objects.filter(permissionid=id).delete()
    data_data = TbPermission.objects.raw(
        'select * from tb_permission where del_flag = 0 and name rlike "' + keyword + '" order by ' + filter + ' ' + sorter + ' limit ' + str(limit) + ' offset ' + str(limit * (pagenum - 1)))
    data_serializer = permissionSerializer(data_data, many=True)
    data_count = TbPermission.objects.raw(
        'select id, count(*) as count from tb_permission where del_flag = 0 and name rlike "' + keyword + '"')
    data_menu = TbPermissionMenu.objects.all()
    data_menu_serializer = permissionMenuSerializer(data_menu, many=True)
    return JsonResponse({"data": data_serializer.data, "menu": data_menu_serializer.data, "count": data_count[0].count, "code": 200}, safe=False)


@api_view(['GET'])
def getRole(request):
    queryprms = request.GET
    limit = int(queryprms.get('limit', 5))
    keyword = queryprms.get('keyword', "")
    pagenum = int(queryprms.get('pagenum', 1))
    filter = queryprms.get('filter', "id")
    sorter = queryprms.get('sorter', "asc")
    data_data = TbUsersRole.objects.raw(
        'select * from tb_users_role where del_flag = 0 and name rlike "' + keyword + '" order by ' + filter + ' ' + sorter + ' limit ' + str(limit) + ' offset ' + str(limit * (pagenum - 1)))
    data_serializer = roleSerializer(data_data, many=True)
    data_count = TbUsersRole.objects.raw(
        'select id, count(*) as count from tb_users_role where del_flag = 0 and name rlike "' + keyword + '"')
    return JsonResponse({"data": data_serializer.data, "count": data_count[0].count, "code": 200}, safe=False)


@api_view(['POST'])
def addRole(request):
    data = json.loads(request.body)
    data_data = TbUsersRole(
        name=data["name"], permissionid=data["permissionid"], del_flag=0)
    data_data.save()
    return JsonResponse({"code": 200}, safe=False)


@ api_view(['POST'])
def updateRole(request):
    data = json.loads(request.body)
    data_data = TbUsersRole.objects.raw(
        'select * from tb_users_role where id = ' + str(data['id']))[0]
    data_data.name = data['name']
    data_data.permissionid = data['permissionid']
    data_data.save()
    return JsonResponse({"code": 200}, safe=False)


@api_view(['GET'])
def delRole(request):
    queryprms = request.GET
    id = queryprms.get('id', 1)
    limit = int(queryprms.get('limit', 5))
    keyword = queryprms.get('keyword', "")
    pagenum = int(queryprms.get('pagenum', 1))
    filter = queryprms.get('filter', "id")
    sorter = queryprms.get('sorter', "asc")
    TbUsersRole.objects.filter(id=id).delete()
    data_data = TbUsersRole.objects.raw(
        'select * from tb_users_role where del_flag = 0 and name rlike "' + keyword + '" order by ' + filter + ' ' + sorter + ' limit ' + str(limit) + ' offset ' + str(limit * (pagenum - 1)))
    data_serializer = roleSerializer(data_data, many=True)
    data_count = TbUsersRole.objects.raw(
        'select id, count(*) as count from tb_users_role where del_flag = 0 and name rlike "' + keyword + '"')
    return JsonResponse({"data": data_serializer.data, "count": data_count[0].count, "code": 200}, safe=False)


@api_view(['GET'])
def getRank(request):
    queryprms = request.GET
    limit = int(queryprms.get('limit', 5))
    keyword = queryprms.get('keyword', "")
    pagenum = int(queryprms.get('pagenum', 1))
    filter = queryprms.get('filter', "id")
    sorter = queryprms.get('sorter', "asc")
    data_data = TbUserRank.objects.raw(
        'select * from tb_user_rank where del_flag = 0 and name rlike "' + keyword + '" order by ' + filter + ' ' + sorter + ' limit ' + str(limit) + ' offset ' + str(limit * (pagenum - 1)))
    data_serializer = rankSerializer(data_data, many=True)
    data_count = TbUserRank.objects.raw(
        'select id, count(*) as count from tb_user_rank where del_flag = 0 and name rlike "' + keyword + '"')
    return JsonResponse({"data": data_serializer.data, "count": data_count[0].count, "code": 200}, safe=False)


@api_view(['POST'])
def addRank(request):
    data = json.loads(request.body)
    data_data = TbUserRank(
        name=data["name"], permissionid=data["permissionid"], parentid=data["parentid"], del_flag=0)
    data_data.save()
    return JsonResponse({"code": 200}, safe=False)


@ api_view(['POST'])
def updateRank(request):
    data = json.loads(request.body)
    data_data = TbUserRank.objects.raw(
        'select * from tb_user_rank where id = ' + str(data['id']))[0]
    data_data.name = data['name']
    data_data.permissionid = data['permissionid']
    data_data.parentid = data['parentid']
    data_data.save()
    return JsonResponse({"code": 200}, safe=False)


@api_view(['GET'])
def delRank(request):
    queryprms = request.GET
    id = queryprms.get('id', 1)
    limit = int(queryprms.get('limit', 5))
    keyword = queryprms.get('keyword', "")
    pagenum = int(queryprms.get('pagenum', 1))
    filter = queryprms.get('filter', "id")
    sorter = queryprms.get('sorter', "asc")
    TbUserRank.objects.filter(id=id).delete()
    data_data = TbUserRank.objects.raw(
        'select * from tb_user_rank where del_flag = 0 and name rlike "' + keyword + '" order by ' + filter + ' ' + sorter + ' limit ' + str(limit) + ' offset ' + str(limit * (pagenum - 1)))
    data_serializer = rankSerializer(data_data, many=True)
    data_count = TbUserRank.objects.raw(
        'select id, count(*) as count from tb_user_rank where del_flag = 0 and name rlike "' + keyword + '"')
    return JsonResponse({"data": data_serializer.data, "count": data_count[0].count, "code": 200}, safe=False)


@api_view(['GET'])
def getAllRank(request):
    data_data = TbUserRank.objects.all()
    data_serializer = rankSerializer(data_data, many=True)
    return JsonResponse({"data": data_serializer.data, "code": 200}, safe=False)


@api_view(['GET'])
def getAllRole(request):
    data_data = TbUsersRole.objects.all()
    data_serializer = roleSerializer(data_data, many=True)
    return JsonResponse({"data": data_serializer.data, "code": 200}, safe=False)


@api_view(['GET'])
def getUser(request):
    queryprms = request.GET
    limit = int(queryprms.get('limit', 5))
    keyword = queryprms.get('keyword', "")
    pagenum = int(queryprms.get('pagenum', 1))
    filter = queryprms.get('filter', "id")
    sorter = queryprms.get('sorter', "asc")
    data_data = TbUsers.objects.raw(
        'select * from tb_users where del_flag = 0 and (fname rlike "' + keyword + '" or lname rlike "' + keyword + '" or cid rlike "' + keyword + '" or mobile rlike "' + keyword + '") order by ' + filter + ' ' + sorter + ' limit ' + str(limit) + ' offset ' + str(limit * (pagenum - 1)))
    data_serializer = (userSerializer(data_data, many=True))
    data_count = TbUsers.objects.raw('select id, count(*) as count from tb_users where del_flag = 0 and (fname rlike "' +
                                     keyword + '" or lname rlike "' + keyword + '" or cid rlike "' + keyword + '" or mobile rlike "' + keyword + '")')
    return JsonResponse({"data": data_serializer.data, "count": data_count[0].count, "code": 200}, safe=False)


@api_view(['POST'])
def addUser(request):
    data = json.loads(request.body)
    password = hashlib.sha1(data["password"].encode('utf-8')).hexdigest()
    # data_data = TbUsers(avatar=data["avatar"],fname=data["fname"],lname=data["lname"],role=data["role"],cid=data["cid"],mobile=data["mobile"],email=data["email"],username=data["username"],password=password,rank=data["rank"],election_option=data["election_option"], del_flag=0)
    data_data = TbUsers(fname=data["fname"], lname=data["lname"], role=data["role"], cid=data["cid"], mobile=data["mobile"], email=data["email"],
                        username=data["username"], password=password, rank=data["rank"], election_option=data["election_option"], del_flag=0)
    data_data.save()
    return JsonResponse({"code": 200}, safe=False)


@ api_view(['POST'])
def updateUser(request):
    data = json.loads(request.body)
    data_data = TbUsers.objects.raw(
        'select * from tb_users where id = ' + str(data['id']))[0]
    data_data.fname = data['fname']
    data_data.lname = data['lname']
    # data_data.avatar = data['avatar']
    data_data.role = data['role']
    data_data.cid = data['cid']
    data_data.mobile = data['mobile']
    data_data.email = data['email']
    data_data.username = data['username']
    data_data.election_option = data['election_option']
    data_data.rank = data['rank']
    data_data.save()
    return JsonResponse({"code": 200}, safe=False)


@api_view(['GET'])
def delUser(request):
    queryprms = request.GET
    id = queryprms.get('id', 1)
    limit = int(queryprms.get('limit', 5))
    keyword = queryprms.get('keyword', "")
    pagenum = int(queryprms.get('pagenum', 1))
    filter = queryprms.get('filter', "id")
    sorter = queryprms.get('sorter', "asc")
    data_del = TbUsers.objects.raw(
        'select * from tb_users where id = ' + id)[0]
    data_del.del_flag = 1
    data_del.save()
    data_data = TbUsers.objects.raw(
        'select * from tb_users where del_flag = 0 and (fname rlike "' + keyword + '" or lname rlike "' + keyword + '" or cid rlike "' + keyword + '" or mobile rlike "' + keyword + '") order by ' + filter + ' ' + sorter + ' limit ' + str(limit) + ' offset ' + str(limit * (pagenum - 1)))
    data_serializer = (userSerializer(data_data, many=True))
    data_count = TbUsers.objects.raw('select id, count(*) as count from tb_users where del_flag = 0 and (fname rlike "' +
                                     keyword + '" or lname rlike "' + keyword + '" or cid rlike "' + keyword + '" or mobile rlike "' + keyword + '")')
    return JsonResponse({"data": data_serializer.data, "count": data_count[0].count, "code": 200}, safe=False)


@api_view(['GET'])
def getMyTeamId(request):
    queryprms = request.GET
    userid = queryprms.get('userid', 1)
    limit = int(queryprms.get('limit', 5))
    keyword = queryprms.get('keyword', "")
    pagenum = int(queryprms.get('pagenum', 1))
    filter = queryprms.get('filter', "id")
    sorter = queryprms.get('sorter', "asc")
    cursor = connection.cursor()
    cursor.execute('select t.id, u.avatar, u.fname, u.lname, u.role, u.cid, u.mobile, u.email, u.username, u.rank, u.election_option from (select id, teamuser_id from tb_team_members where candidate_id = ' + userid + ' and del_flag = 0) as t join (select * from tb_users where del_flag = 0) as u on t.teamuser_id = u.id where (fname rlike "' +
                   keyword + '" or lname rlike "' + keyword + '" or cid rlike "' + keyword + '" or mobile rlike "' + keyword + '") order by ' + filter + ' ' + sorter + ' limit ' + str(limit) + ' offset ' + str(limit * (pagenum - 1)), None)
    objs = cursor.fetchall()
    json_data = []
    for obj in objs:
        json_data.append({"id": obj[0], "avatar": obj[1], "fname": obj[2], "lname": obj[3], "role": obj[4], "cid": obj[5],
                         "mobile": obj[6], "email": obj[7], "username": obj[8], "rank": obj[9], "election_option": obj[10]})
    data_count = TbUsers.objects.raw('select id, count(*) as count from (select teamuser_id from tb_team_members where candidate_id = ' + userid +
                                     ' and del_flag = 0) as t join (select * from tb_users where del_flag = 0) as u on t.teamuser_id = u.id where (fname rlike "' + keyword + '" or lname rlike "' + keyword + '" or cid rlike "' + keyword + '" or mobile rlike "' + keyword + '")')
    return JsonResponse({"data": json_data, "count": data_count[0].count, "code": 200}, safe=False)


@api_view(['GET'])
def getMyCandidateId(request):
    queryprms = request.GET
    userid = queryprms.get('userid', 1)
    limit = int(queryprms.get('limit', 5))
    keyword = queryprms.get('keyword', "")
    pagenum = int(queryprms.get('pagenum', 1))
    filter = queryprms.get('filter', "id")
    sorter = queryprms.get('sorter', "asc")
    cursor = connection.cursor()
    cursor.execute('select t.id, u.avatar, u.fname, u.lname, u.role, u.cid, u.mobile, u.email, u.username, u.rank, u.election_option from (select id, candidate_id from tb_team_members where teamuser_id = ' + userid + ' and del_flag = 0) as t join (select * from tb_users where del_flag = 0) as u on t.candidate_id = u.id where (fname rlike "' +
                   keyword + '" or lname rlike "' + keyword + '" or cid rlike "' + keyword + '" or mobile rlike "' + keyword + '") order by ' + filter + ' ' + sorter + ' limit ' + str(limit) + ' offset ' + str(limit * (pagenum - 1)), None)
    objs = cursor.fetchall()
    json_data = []
    for obj in objs:
        json_data.append({"id": obj[0], "avatar": obj[1], "fname": obj[2], "lname": obj[3], "role": obj[4], "cid": obj[5],
                         "mobile": obj[6], "email": obj[7], "username": obj[8], "rank": obj[9], "election_option": obj[10]})
    data_count = TbUsers.objects.raw('select id, count(*) as count from (select candidate_id from tb_team_members where teamuser_id = ' + userid +
                                     ' and del_flag = 0) as t join (select * from tb_users where del_flag = 0) as u on t.candidate_id = u.id where (fname rlike "' + keyword + '" or lname rlike "' + keyword + '" or cid rlike "' + keyword + '" or mobile rlike "' + keyword + '")')
    return JsonResponse({"data": json_data, "count": data_count[0].count, "code": 200}, safe=False)


@api_view(['GET'])
def getMyGuanatorId(request):
    queryprms = request.GET
    id = queryprms.get('id', 1)
    userid = queryprms.get('userid', 1)
    limit = int(queryprms.get('limit', 5))
    keyword = queryprms.get('keyword', "")
    pagenum = int(queryprms.get('pagenum', 1))
    filter = queryprms.get('filter', "id")
    sorter = queryprms.get('sorter', "asc")
    cursor = connection.cursor()
    cursor.execute('select t.id, u.avatar, u.fname, u.lname, u.role, u.cid, u.mobile, u.email, u.username, u.rank, u.election_option, t.guarantee, t.attended, t.status from (select id, user_id, guarantee, attended, status from tb_guarantees where election_id = ' + id + ' and guarantor_id = ' + userid + ' and del_flag = 0) as t join (select * from tb_users where del_flag = 0) as u on t.user_id = u.id where (fname rlike "' +
                   keyword + '" or lname rlike "' + keyword + '" or cid rlike "' + keyword + '" or mobile rlike "' + keyword + '") order by ' + filter + ' ' + sorter + ' limit ' + str(limit) + ' offset ' + str(limit * (pagenum - 1)), None)
    objs = cursor.fetchall()
    json_data = []
    for obj in objs:
        json_data.append({"id": obj[0], "avatar": obj[1], "fname": obj[2], "lname": obj[3], "role": obj[4], "cid": obj[5],
                         "mobile": obj[6], "email": obj[7], "username": obj[8], "rank": obj[9], "election_option": obj[10], "guarantee": obj[11], "attended": obj[12], "status": obj[13]})
    data_count = TbUsers.objects.raw('select t.id, count(*) as count from (select id, user_id, guarantee, attended, status from tb_guarantees where election_id = ' + id + ' and guarantor_id = ' + userid + ' and del_flag = 0) as t join (select * from tb_users where del_flag = 0) as u on t.user_id = u.id where (fname rlike "' +
                                     keyword + '" or lname rlike "' + keyword + '" or cid rlike "' + keyword + '" or mobile rlike "' + keyword + '")')
    return JsonResponse({"data": json_data, "count": data_count[0].count, "code": 200}, safe=False)


@api_view(['GET'])
def delMyGuanatorId(request):
    queryprms = request.GET
    id = queryprms.get('id', 1)
    data_del = TbGuarantees.objects.raw(
        'select * from tb_guarantees where id = ' + id)[0]
    data_del.del_flag = 1
    data_del.save()
    return JsonResponse({"code": 200}, safe=False)


@api_view(['GET'])
def delMyTeamId(request):
    queryprms = request.GET
    id = queryprms.get('id', 1)
    data_del = TbTeamMembers.objects.raw(
        'select * from tb_team_members where id = ' + id)[0]
    data_del.del_flag = 1
    data_del.save()
    return JsonResponse({"code": 200}, safe=False)


@ api_view(['POST'])
def addMyTeamId(request):
    data = json.loads(request.body)
    data_data = TbTeamMembers(
        candidate_id=data["canid"], teamuser_id=data["teamid"], del_flag=0)
    data_data.save()
    return JsonResponse({"code": 200}, safe=False)


@ api_view(['POST'])
def addMyCandidateId(request):
    data = json.loads(request.body)
    data_data = TbTeamMembers(
        candidate_id=data["canid"], teamuser_id=data["teamid"], del_flag=0)
    data_data.save()
    return JsonResponse({"code": 200}, safe=False)


@ api_view(['POST'])
def addMyGuanatorId(request):
    data = json.loads(request.body)
    data_data = TbGuarantees(
        user_id=data["userid"], election_id=data["electionid"], guarantor_id=data["guarantorid"], guarantee=data["guarantee"], attended=data["attended"], status=data["status"], del_flag=0)
    data_data.save()
    return JsonResponse({"code": 200}, safe=False)
