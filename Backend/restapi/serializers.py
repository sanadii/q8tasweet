from rest_framework import serializers
from .models import TbUsers, TbMenu, TbElections

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