import json
from django.shortcuts import render

# Create your views here.
from django.http.response import JsonResponse
from rest_framework.decorators import api_view
import hashlib


from .serializers import *
from .models import *

SECRET_KEY = b'pseudorandomly generated server secret key'
AUTH_SIZE = 16

@api_view(['GET'])
def getMenu(request):
    menus = TbMenu.objects.all()
    menus_serializer = menuSerializer(menus, many=True)
    return JsonResponse({"data": menus_serializer.data}, safe=False)

@api_view(['POST'])
def addMenu(request):
    data = json.loads(request.body)
    data_data = TbMenu(name=data["name"], url=data["url"], parentid=data["parentId"], del_flag=0)
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
    return JsonResponse({"data": data_serializer.data,"menu": data_menu_serializer.data, "count": data_count[0].count, "code": 200}, safe=False)


@api_view(['GET'])
def getAllPermission(request):
    data_data = TbPermission.objects.all()
    data_serializer = permissionSerializer(data_data, many=True)
    return JsonResponse({"data": data_serializer.data, "code": 200}, safe=False)

@api_view(['POST'])
def addPermission(request):
    data = json.loads(request.body)
    data_data = TbPermission(name=data["name"],description=data["description"], del_flag=0)
    data_data.save()
    data_now = TbPermission.objects.raw('select * from tb_permission where name = "' + data["name"] + '" and description = "' + data["description"] + '"')[0]
    for x in data["menu"]:
        data_row = TbPermissionMenu(permissionid = data_now.id, menuid = x['menuId'], value = x['value'], label = x['label'])
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
        data_row = TbPermissionMenu(permissionid = data['id'], menuid = x['menuId'], value = x['value'], label = x['label'])
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
    return JsonResponse({"data": data_serializer.data,"menu": data_menu_serializer.data, "count": data_count[0].count, "code": 200}, safe=False)

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
    return JsonResponse({"data": data_serializer.data,"count": data_count[0].count, "code": 200}, safe=False)

@api_view(['POST'])
def addRole(request):
    data = json.loads(request.body)
    data_data = TbUsersRole(name=data["name"],permissionid=data["permissionid"], del_flag=0)
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
    return JsonResponse({"data": data_serializer.data,"count": data_count[0].count, "code": 200}, safe=False)

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
    return JsonResponse({"data": data_serializer.data,"count": data_count[0].count, "code": 200}, safe=False)

@api_view(['POST'])
def addRank(request):
    data = json.loads(request.body)
    data_data = TbUserRank(name=data["name"],permissionid=data["permissionid"],parentid=data["parentid"], del_flag=0)
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
    return JsonResponse({"data": data_serializer.data,"count": data_count[0].count, "code": 200}, safe=False)

@api_view(['GET'])
def getAllRank(request):
    data_data = TbUserRank.objects.all()
    data_serializer = rankSerializer(data_data, many=True)
    return JsonResponse({"data": data_serializer.data,"code": 200}, safe=False)


@api_view(['GET'])
def getAllRole(request):
    data_data = TbUsersRole.objects.all()
    data_serializer = roleSerializer(data_data, many=True)
    return JsonResponse({"data": data_serializer.data,"code": 200}, safe=False)

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
    data_count = TbUsers.objects.raw('select id, count(*) as count from tb_users where del_flag = 0 and (fname rlike "' + keyword + '" or lname rlike "' + keyword + '" or cid rlike "' + keyword + '" or mobile rlike "' + keyword + '")')
    return JsonResponse({"data": data_serializer.data,"count": data_count[0].count, "code": 200}, safe=False)

@api_view(['POST'])
def addUser(request): 
    data = json.loads(request.body)
    password = hashlib.sha1(data["password"].encode('utf-8')).hexdigest()
    data_data = TbUsers(fname=data["fname"],lname=data["lname"],role=data["role"],cid=data["cid"],mobile=data["mobile"],email=data["email"],username=data["username"],password=password,election_option=data["election_option"], del_flag=0)
    data_data.save()
    return JsonResponse({"code": 200}, safe=False)

@ api_view(['POST'])
def updateUser(request):
    data = json.loads(request.body)
    data_data = TbUsers.objects.raw(
        'select * from tb_users where id = ' + str(data['id']))[0]
    data_data.fname = data['fname']
    data_data.lname = data['lname']
    data_data.role = data['role']
    data_data.cid = data['cid']
    data_data.mobile = data['mobile']
    data_data.email = data['email']
    data_data.username = data['username']
    data_data.election_option = data['election_option']
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
    data_del = TbUsers.objects.raw('select * from tb_elections where id = ' + id)[0]
    data_del.del_flag = 1
    data_del.save()
    data_data = TbUsers.objects.raw(
        'select * from tb_users where del_flag = 0 and (fname rlike "' + keyword + '" or lname rlike "' + keyword + '" or cid rlike "' + keyword + '" or mobile rlike "' + keyword + '") order by ' + filter + ' ' + sorter + ' limit ' + str(limit) + ' offset ' + str(limit * (pagenum - 1)))
    data_serializer = (userSerializer(data_data, many=True))
    data_count = TbUsers.objects.raw('select id, count(*) as count from tb_users where del_flag = 0 and (fname rlike "' + keyword + '" or lname rlike "' + keyword + '" or cid rlike "' + keyword + '" or mobile rlike "' + keyword + '")')
    return JsonResponse({"data": data_serializer.data,"count": data_count[0].count, "code": 200}, safe=False)
