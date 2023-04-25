# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class TbElections(models.Model):
    id = models.BigAutoField(primary_key=True)
    image = models.CharField(max_length=255, blank=True, null=True)
    title = models.CharField(max_length=255, blank=True, null=True)
    description = models.CharField(max_length=255, blank=True, null=True)
    status = models.IntegerField(blank=True, null=True)
    date = models.DateField(blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    type = models.CharField(max_length=255, blank=True, null=True)
    moderators = models.CharField(max_length=255, blank=True, null=True)
    del_flag = models.IntegerField(blank=True, null=True)
    create_by = models.IntegerField(blank=True, null=True)
    create_date = models.DateTimeField(blank=True, null=True)
    update_by = models.IntegerField(blank=True, null=True)
    update_date = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tb_elections'


class TbGuarantees(models.Model):
    id = models.BigAutoField(primary_key=True)
    user_id = models.IntegerField(blank=True, null=True)
    election_id = models.IntegerField(blank=True, null=True)
    guarantor_id = models.IntegerField(blank=True, null=True)
    guarantee = models.IntegerField(blank=True, null=True)
    attended = models.IntegerField(blank=True, null=True)
    status = models.CharField(max_length=255, blank=True, null=True)
    del_flag = models.IntegerField(blank=True, null=True)
    create_by = models.IntegerField(blank=True, null=True)
    create_date = models.DateTimeField(blank=True, null=True)
    update_by = models.IntegerField(blank=True, null=True)
    update_date = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tb_guarantees'


class TbMenu(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    url = models.CharField(max_length=255, blank=True, null=True)
    # Field name made lowercase.
    parentid = models.IntegerField(db_column='parentId', blank=True, null=True)
    del_flag = models.IntegerField(blank=True, null=True)
    create_by = models.IntegerField(blank=True, null=True)
    create_date = models.DateTimeField(blank=True, null=True)
    update_by = models.IntegerField(blank=True, null=True)
    update_date = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tb_menu'


class TbPermission(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    description = models.CharField(max_length=255, blank=True, null=True)
    del_flag = models.IntegerField(blank=True, null=True)
    create_by = models.IntegerField(blank=True, null=True)
    create_date = models.DateTimeField(blank=True, null=True)
    update_by = models.IntegerField(blank=True, null=True)
    update_date = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tb_permission'


class TbSorting(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    del_flag = models.IntegerField(blank=True, null=True)
    create_by = models.IntegerField(blank=True, null=True)
    create_date = models.DateTimeField(blank=True, null=True)
    update_by = models.IntegerField(blank=True, null=True)
    update_date = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tb_sorting'


class TbUserRank(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    # Field name made lowercase.
    permissionid = models.IntegerField(
        db_column='permissionId', blank=True, null=True)
    # Field name made lowercase.
    parentid = models.IntegerField(db_column='parentId', blank=True, null=True)
    del_flag = models.IntegerField(blank=True, null=True)
    create_by = models.IntegerField(blank=True, null=True)
    create_date = models.DateTimeField(blank=True, null=True)
    update_by = models.IntegerField(blank=True, null=True)
    update_date = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tb_user_rank'


class TbUsers(models.Model):
    id = models.BigAutoField(primary_key=True)
    fname = models.CharField(max_length=255, blank=True, null=True)
    lname = models.CharField(max_length=255, blank=True, null=True)
    # avatar = models.CharField(max_length=255, blank=True, null=True)
    role = models.CharField(max_length=255, blank=True, null=True)
    cid = models.IntegerField(blank=True, null=True)
    mobile = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(max_length=255, blank=True, null=True)
    username = models.CharField(max_length=255, blank=True, null=True)
    password = models.CharField(max_length=255, blank=True, null=True)
    rank = models.IntegerField(blank=True, null=True)
    election_option = models.CharField(max_length=255, blank=True, null=True)
    del_flag = models.IntegerField(blank=True, null=True)
    create_by = models.IntegerField(blank=True, null=True)
    create_date = models.DateTimeField(blank=True, null=True)
    update_by = models.IntegerField(blank=True, null=True)
    update_date = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tb_users'


class TbUsersRole(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    # Field name made lowercase.
    permissionid = models.IntegerField(
        db_column='permissionId', blank=True, null=True)
    del_flag = models.IntegerField(blank=True, null=True)
    create_by = models.IntegerField(blank=True, null=True)
    create_date = models.DateTimeField(blank=True, null=True)
    update_by = models.IntegerField(blank=True, null=True)
    update_date = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tb_users_role'


class TbVoters(models.Model):
    id = models.BigAutoField(primary_key=True)
    election_id = models.IntegerField(blank=True, null=True)
    civil_id = models.IntegerField(blank=True, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    del_flag = models.IntegerField(blank=True, null=True)
    create_by = models.IntegerField(blank=True, null=True)
    create_date = models.DateTimeField(blank=True, null=True)
    update_by = models.IntegerField(blank=True, null=True)
    update_date = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tb_voters'


class TbPermissionMenu(models.Model):
    id = models.BigAutoField(primary_key=True)
    permissionid = models.IntegerField(
    db_column='permissionId', blank=True, null=True)
    menuid = models.IntegerField(db_column='menuId', blank=True, null=True)
    value = models.CharField(max_length=255, blank=True, null=True)
    label = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tb_permissionmenu'


class TbTeamMembers(models.Model):
    id = models.BigAutoField(primary_key=True)
    candidate_id = models.IntegerField(blank=True, null=True)
    teamuser_id = models.IntegerField(blank=True, null=True)
    del_flag = models.IntegerField(blank=True, null=True)
    create_by = models.IntegerField(blank=True, null=True)
    create_date = models.DateField(blank=True, null=True)
    update_by = models.IntegerField(blank=True, null=True)
    update_date = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tb_team_members'
