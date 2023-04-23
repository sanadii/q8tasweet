from rest_framework import serializers
from .models import *


class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = TbUsers
        fields = "__all__"


class electionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TbElections
        fields = "__all__"


class menuSerializer(serializers.ModelSerializer):
    class Meta:
        model = TbMenu
        fields = "__all__"


class permissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TbPermission
        fields = "__all__"


class permissionMenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = TbPermissionMenu
        fields = "__all__"


class roleSerializer(serializers.ModelSerializer):
    class Meta:
        model = TbUsersRole
        fields = "__all__"


class rankSerializer(serializers.ModelSerializer):
    class Meta:
        model = TbUserRank
        fields = "__all__"
