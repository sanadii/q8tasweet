BEGIN TRANSACTION;
CREATE TABLE "auth_group" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "name" varchar(150) NOT NULL UNIQUE);
CREATE TABLE "auth_group_permissions" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "group_id" integer NOT NULL REFERENCES "auth_group" ("id") DEFERRABLE INITIALLY DEFERRED, "permission_id" integer NOT NULL REFERENCES "auth_permission" ("id") DEFERRABLE INITIALLY DEFERRED);
CREATE TABLE "auth_permission" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "content_type_id" integer NOT NULL REFERENCES "django_content_type" ("id") DEFERRABLE INITIALLY DEFERRED, "codename" varchar(100) NOT NULL, "name" varchar(255) NOT NULL);
INSERT INTO "auth_permission" VALUES(1,2,'add_logentry','Can add log entry');
INSERT INTO "auth_permission" VALUES(2,2,'change_logentry','Can change log entry');
INSERT INTO "auth_permission" VALUES(3,2,'delete_logentry','Can delete log entry');
INSERT INTO "auth_permission" VALUES(4,2,'view_logentry','Can view log entry');
INSERT INTO "auth_permission" VALUES(5,3,'add_permission','Can add permission');
INSERT INTO "auth_permission" VALUES(6,3,'change_permission','Can change permission');
INSERT INTO "auth_permission" VALUES(7,3,'delete_permission','Can delete permission');
INSERT INTO "auth_permission" VALUES(8,3,'view_permission','Can view permission');
INSERT INTO "auth_permission" VALUES(9,4,'add_group','Can add group');
INSERT INTO "auth_permission" VALUES(10,4,'change_group','Can change group');
INSERT INTO "auth_permission" VALUES(11,4,'delete_group','Can delete group');
INSERT INTO "auth_permission" VALUES(12,4,'view_group','Can view group');
INSERT INTO "auth_permission" VALUES(13,1,'add_contenttype','Can add content type');
INSERT INTO "auth_permission" VALUES(14,1,'change_contenttype','Can change content type');
INSERT INTO "auth_permission" VALUES(15,1,'delete_contenttype','Can delete content type');
INSERT INTO "auth_permission" VALUES(16,1,'view_contenttype','Can view content type');
INSERT INTO "auth_permission" VALUES(17,5,'add_session','Can add session');
INSERT INTO "auth_permission" VALUES(18,5,'change_session','Can change session');
INSERT INTO "auth_permission" VALUES(19,5,'delete_session','Can delete session');
INSERT INTO "auth_permission" VALUES(20,5,'view_session','Can view session');
INSERT INTO "auth_permission" VALUES(21,6,'add_user','Can add user');
INSERT INTO "auth_permission" VALUES(22,6,'change_user','Can change user');
INSERT INTO "auth_permission" VALUES(23,6,'delete_user','Can delete user');
INSERT INTO "auth_permission" VALUES(24,6,'view_user','Can view user');
INSERT INTO "auth_permission" VALUES(25,7,'add_tbelections','Can add tb elections');
INSERT INTO "auth_permission" VALUES(26,7,'change_tbelections','Can change tb elections');
INSERT INTO "auth_permission" VALUES(27,7,'delete_tbelections','Can delete tb elections');
INSERT INTO "auth_permission" VALUES(28,7,'view_tbelections','Can view tb elections');
INSERT INTO "auth_permission" VALUES(29,8,'add_tbguarantees','Can add tb guarantees');
INSERT INTO "auth_permission" VALUES(30,8,'change_tbguarantees','Can change tb guarantees');
INSERT INTO "auth_permission" VALUES(31,8,'delete_tbguarantees','Can delete tb guarantees');
INSERT INTO "auth_permission" VALUES(32,8,'view_tbguarantees','Can view tb guarantees');
INSERT INTO "auth_permission" VALUES(33,9,'add_tbmenu','Can add tb menu');
INSERT INTO "auth_permission" VALUES(34,9,'change_tbmenu','Can change tb menu');
INSERT INTO "auth_permission" VALUES(35,9,'delete_tbmenu','Can delete tb menu');
INSERT INTO "auth_permission" VALUES(36,9,'view_tbmenu','Can view tb menu');
INSERT INTO "auth_permission" VALUES(37,10,'add_tbpermission','Can add tb permission');
INSERT INTO "auth_permission" VALUES(38,10,'change_tbpermission','Can change tb permission');
INSERT INTO "auth_permission" VALUES(39,10,'delete_tbpermission','Can delete tb permission');
INSERT INTO "auth_permission" VALUES(40,10,'view_tbpermission','Can view tb permission');
INSERT INTO "auth_permission" VALUES(41,11,'add_tbpermissionmenu','Can add tb permission menu');
INSERT INTO "auth_permission" VALUES(42,11,'change_tbpermissionmenu','Can change tb permission menu');
INSERT INTO "auth_permission" VALUES(43,11,'delete_tbpermissionmenu','Can delete tb permission menu');
INSERT INTO "auth_permission" VALUES(44,11,'view_tbpermissionmenu','Can view tb permission menu');
INSERT INTO "auth_permission" VALUES(45,12,'add_tbsorting','Can add tb sorting');
INSERT INTO "auth_permission" VALUES(46,12,'change_tbsorting','Can change tb sorting');
INSERT INTO "auth_permission" VALUES(47,12,'delete_tbsorting','Can delete tb sorting');
INSERT INTO "auth_permission" VALUES(48,12,'view_tbsorting','Can view tb sorting');
INSERT INTO "auth_permission" VALUES(49,13,'add_tbteammembers','Can add tb team members');
INSERT INTO "auth_permission" VALUES(50,13,'change_tbteammembers','Can change tb team members');
INSERT INTO "auth_permission" VALUES(51,13,'delete_tbteammembers','Can delete tb team members');
INSERT INTO "auth_permission" VALUES(52,13,'view_tbteammembers','Can view tb team members');
INSERT INTO "auth_permission" VALUES(53,14,'add_tbuserrank','Can add tb user rank');
INSERT INTO "auth_permission" VALUES(54,14,'change_tbuserrank','Can change tb user rank');
INSERT INTO "auth_permission" VALUES(55,14,'delete_tbuserrank','Can delete tb user rank');
INSERT INTO "auth_permission" VALUES(56,14,'view_tbuserrank','Can view tb user rank');
INSERT INTO "auth_permission" VALUES(57,15,'add_tbusers','Can add tb users');
INSERT INTO "auth_permission" VALUES(58,15,'change_tbusers','Can change tb users');
INSERT INTO "auth_permission" VALUES(59,15,'delete_tbusers','Can delete tb users');
INSERT INTO "auth_permission" VALUES(60,15,'view_tbusers','Can view tb users');
INSERT INTO "auth_permission" VALUES(61,16,'add_tbusersrole','Can add tb users role');
INSERT INTO "auth_permission" VALUES(62,16,'change_tbusersrole','Can change tb users role');
INSERT INTO "auth_permission" VALUES(63,16,'delete_tbusersrole','Can delete tb users role');
INSERT INTO "auth_permission" VALUES(64,16,'view_tbusersrole','Can view tb users role');
INSERT INTO "auth_permission" VALUES(65,17,'add_tbvoters','Can add tb voters');
INSERT INTO "auth_permission" VALUES(66,17,'change_tbvoters','Can change tb voters');
INSERT INTO "auth_permission" VALUES(67,17,'delete_tbvoters','Can delete tb voters');
INSERT INTO "auth_permission" VALUES(68,17,'view_tbvoters','Can view tb voters');
INSERT INTO "auth_permission" VALUES(69,18,'add_blacklistedtoken','Can add blacklisted token');
INSERT INTO "auth_permission" VALUES(70,18,'change_blacklistedtoken','Can change blacklisted token');
INSERT INTO "auth_permission" VALUES(71,18,'delete_blacklistedtoken','Can delete blacklisted token');
INSERT INTO "auth_permission" VALUES(72,18,'view_blacklistedtoken','Can view blacklisted token');
INSERT INTO "auth_permission" VALUES(73,19,'add_outstandingtoken','Can add outstanding token');
INSERT INTO "auth_permission" VALUES(74,19,'change_outstandingtoken','Can change outstanding token');
INSERT INTO "auth_permission" VALUES(75,19,'delete_outstandingtoken','Can delete outstanding token');
INSERT INTO "auth_permission" VALUES(76,19,'view_outstandingtoken','Can view outstanding token');
INSERT INTO "auth_permission" VALUES(77,20,'add_projectinfo','Can add project info');
INSERT INTO "auth_permission" VALUES(78,20,'change_projectinfo','Can change project info');
INSERT INTO "auth_permission" VALUES(79,20,'delete_projectinfo','Can delete project info');
INSERT INTO "auth_permission" VALUES(80,20,'view_projectinfo','Can view project info');
INSERT INTO "auth_permission" VALUES(81,21,'add_elections','Can add elections');
INSERT INTO "auth_permission" VALUES(82,21,'change_elections','Can change elections');
INSERT INTO "auth_permission" VALUES(83,21,'delete_elections','Can delete elections');
INSERT INTO "auth_permission" VALUES(84,21,'view_elections','Can view elections');
INSERT INTO "auth_permission" VALUES(85,22,'add_guarantees','Can add guarantees');
INSERT INTO "auth_permission" VALUES(86,22,'change_guarantees','Can change guarantees');
INSERT INTO "auth_permission" VALUES(87,22,'delete_guarantees','Can delete guarantees');
INSERT INTO "auth_permission" VALUES(88,22,'view_guarantees','Can view guarantees');
INSERT INTO "auth_permission" VALUES(89,23,'add_menu','Can add menu');
INSERT INTO "auth_permission" VALUES(90,23,'change_menu','Can change menu');
INSERT INTO "auth_permission" VALUES(91,23,'delete_menu','Can delete menu');
INSERT INTO "auth_permission" VALUES(92,23,'view_menu','Can view menu');
INSERT INTO "auth_permission" VALUES(93,24,'add_permission','Can add permission');
INSERT INTO "auth_permission" VALUES(94,24,'change_permission','Can change permission');
INSERT INTO "auth_permission" VALUES(95,24,'delete_permission','Can delete permission');
INSERT INTO "auth_permission" VALUES(96,24,'view_permission','Can view permission');
INSERT INTO "auth_permission" VALUES(97,25,'add_permissionmenu','Can add permission menu');
INSERT INTO "auth_permission" VALUES(98,25,'change_permissionmenu','Can change permission menu');
INSERT INTO "auth_permission" VALUES(99,25,'delete_permissionmenu','Can delete permission menu');
INSERT INTO "auth_permission" VALUES(100,25,'view_permissionmenu','Can view permission menu');
INSERT INTO "auth_permission" VALUES(101,26,'add_sorting','Can add sorting');
INSERT INTO "auth_permission" VALUES(102,26,'change_sorting','Can change sorting');
INSERT INTO "auth_permission" VALUES(103,26,'delete_sorting','Can delete sorting');
INSERT INTO "auth_permission" VALUES(104,26,'view_sorting','Can view sorting');
INSERT INTO "auth_permission" VALUES(105,27,'add_teammembers','Can add team members');
INSERT INTO "auth_permission" VALUES(106,27,'change_teammembers','Can change team members');
INSERT INTO "auth_permission" VALUES(107,27,'delete_teammembers','Can delete team members');
INSERT INTO "auth_permission" VALUES(108,27,'view_teammembers','Can view team members');
INSERT INTO "auth_permission" VALUES(109,28,'add_userrank','Can add user rank');
INSERT INTO "auth_permission" VALUES(110,28,'change_userrank','Can change user rank');
INSERT INTO "auth_permission" VALUES(111,28,'delete_userrank','Can delete user rank');
INSERT INTO "auth_permission" VALUES(112,28,'view_userrank','Can view user rank');
INSERT INTO "auth_permission" VALUES(113,29,'add_usersrole','Can add users role');
INSERT INTO "auth_permission" VALUES(114,29,'change_usersrole','Can change users role');
INSERT INTO "auth_permission" VALUES(115,29,'delete_usersrole','Can delete users role');
INSERT INTO "auth_permission" VALUES(116,29,'view_usersrole','Can view users role');
INSERT INTO "auth_permission" VALUES(117,30,'add_voters','Can add voters');
INSERT INTO "auth_permission" VALUES(118,30,'change_voters','Can change voters');
INSERT INTO "auth_permission" VALUES(119,30,'delete_voters','Can delete voters');
INSERT INTO "auth_permission" VALUES(120,30,'view_voters','Can view voters');
CREATE TABLE "django_admin_log" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "object_id" text NULL, "object_repr" varchar(200) NOT NULL, "action_flag" smallint unsigned NOT NULL CHECK ("action_flag" >= 0), "change_message" text NOT NULL, "content_type_id" integer NULL REFERENCES "django_content_type" ("id") DEFERRABLE INITIALLY DEFERRED, "user_id" bigint NOT NULL REFERENCES "users_user" ("id") DEFERRABLE INITIALLY DEFERRED, "action_time" datetime NOT NULL);
INSERT INTO "django_admin_log" VALUES(1,'1','TbElections object (1)',1,'[{"added": {}}]',7,1,'2023-07-07 19:22:41.178189');
INSERT INTO "django_admin_log" VALUES(2,'2','TbElections object (2)',1,'[{"added": {}}]',7,1,'2023-07-07 19:22:58.775646');
INSERT INTO "django_admin_log" VALUES(3,'3','TbElections object (3)',1,'[{"added": {}}]',7,1,'2023-07-07 19:23:18.164805');
INSERT INTO "django_admin_log" VALUES(4,'15','TbElections object (15)',2,'[]',7,1,'2023-07-07 23:51:41.692400');
INSERT INTO "django_admin_log" VALUES(5,'14','TbElections object (14)',2,'[{"changed": {"fields": ["Image"]}}]',7,1,'2023-07-07 23:51:52.392857');
INSERT INTO "django_admin_log" VALUES(6,'15','TbElections object (15)',2,'[{"changed": {"fields": ["Image"]}}]',7,1,'2023-07-07 23:51:59.778334');
INSERT INTO "django_admin_log" VALUES(7,'13','TbElections object (13)',2,'[{"changed": {"fields": ["Image"]}}]',7,1,'2023-07-07 23:52:27.700051');
INSERT INTO "django_admin_log" VALUES(8,'16','TbElections object (16)',1,'[{"added": {}}]',7,1,'2023-07-07 23:52:56.825401');
INSERT INTO "django_admin_log" VALUES(9,'16','TbElections object (16)',2,'[{"changed": {"fields": ["Image", "Title"]}}]',7,1,'2023-07-08 00:19:09.711880');
INSERT INTO "django_admin_log" VALUES(10,'32','TbElections object (32)',2,'[{"changed": {"fields": ["Created by"]}}]',7,1,'2023-07-09 06:45:53.350742');
CREATE TABLE "django_content_type" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "app_label" varchar(100) NOT NULL, "model" varchar(100) NOT NULL);
INSERT INTO "django_content_type" VALUES(1,'contenttypes','contenttype');
INSERT INTO "django_content_type" VALUES(2,'admin','logentry');
INSERT INTO "django_content_type" VALUES(3,'auth','permission');
INSERT INTO "django_content_type" VALUES(4,'auth','group');
INSERT INTO "django_content_type" VALUES(5,'sessions','session');
INSERT INTO "django_content_type" VALUES(6,'users','user');
INSERT INTO "django_content_type" VALUES(7,'elections','tbelections');
INSERT INTO "django_content_type" VALUES(8,'elections','tbguarantees');
INSERT INTO "django_content_type" VALUES(9,'elections','tbmenu');
INSERT INTO "django_content_type" VALUES(10,'elections','tbpermission');
INSERT INTO "django_content_type" VALUES(11,'elections','tbpermissionmenu');
INSERT INTO "django_content_type" VALUES(12,'elections','tbsorting');
INSERT INTO "django_content_type" VALUES(13,'elections','tbteammembers');
INSERT INTO "django_content_type" VALUES(14,'elections','tbuserrank');
INSERT INTO "django_content_type" VALUES(15,'elections','tbusers');
INSERT INTO "django_content_type" VALUES(16,'elections','tbusersrole');
INSERT INTO "django_content_type" VALUES(17,'elections','tbvoters');
INSERT INTO "django_content_type" VALUES(18,'token_blacklist','blacklistedtoken');
INSERT INTO "django_content_type" VALUES(19,'token_blacklist','outstandingtoken');
INSERT INTO "django_content_type" VALUES(20,'elections','projectinfo');
INSERT INTO "django_content_type" VALUES(21,'elections','elections');
INSERT INTO "django_content_type" VALUES(22,'elections','guarantees');
INSERT INTO "django_content_type" VALUES(23,'elections','menu');
INSERT INTO "django_content_type" VALUES(24,'elections','permission');
INSERT INTO "django_content_type" VALUES(25,'elections','permissionmenu');
INSERT INTO "django_content_type" VALUES(26,'elections','sorting');
INSERT INTO "django_content_type" VALUES(27,'elections','teammembers');
INSERT INTO "django_content_type" VALUES(28,'elections','userrank');
INSERT INTO "django_content_type" VALUES(29,'elections','usersrole');
INSERT INTO "django_content_type" VALUES(30,'elections','voters');
CREATE TABLE "django_migrations" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "app" varchar(255) NOT NULL, "name" varchar(255) NOT NULL, "applied" datetime NOT NULL);
INSERT INTO "django_migrations" VALUES(1,'contenttypes','0001_initial','2023-07-07 19:16:47.058765');
INSERT INTO "django_migrations" VALUES(2,'contenttypes','0002_remove_content_type_name','2023-07-07 19:16:47.120030');
INSERT INTO "django_migrations" VALUES(3,'contenttypes','0003_auto_20230707_2216','2023-07-07 19:16:47.127838');
INSERT INTO "django_migrations" VALUES(4,'auth','0001_initial','2023-07-07 19:17:07.060357');
INSERT INTO "django_migrations" VALUES(5,'auth','0002_alter_permission_name_max_length','2023-07-07 19:17:07.074806');
INSERT INTO "django_migrations" VALUES(6,'auth','0003_alter_user_email_max_length','2023-07-07 19:17:07.099416');
INSERT INTO "django_migrations" VALUES(7,'auth','0004_alter_user_username_opts','2023-07-07 19:17:07.131427');
INSERT INTO "django_migrations" VALUES(8,'auth','0005_alter_user_last_login_null','2023-07-07 19:17:07.219601');
INSERT INTO "django_migrations" VALUES(9,'auth','0006_require_contenttypes_0002','2023-07-07 19:17:07.235606');
INSERT INTO "django_migrations" VALUES(10,'auth','0007_alter_validators_add_error_messages','2023-07-07 19:17:07.258054');
INSERT INTO "django_migrations" VALUES(11,'auth','0008_alter_user_username_max_length','2023-07-07 19:17:07.268616');
INSERT INTO "django_migrations" VALUES(12,'auth','0009_alter_user_last_name_max_length','2023-07-07 19:17:07.286620');
INSERT INTO "django_migrations" VALUES(13,'auth','0010_alter_group_name_max_length','2023-07-07 19:17:07.311015');
INSERT INTO "django_migrations" VALUES(14,'auth','0011_update_proxy_permissions','2023-07-07 19:17:07.324295');
INSERT INTO "django_migrations" VALUES(15,'auth','0012_alter_user_first_name_max_length','2023-07-07 19:17:07.364015');
INSERT INTO "django_migrations" VALUES(16,'users','0001_initial','2023-07-07 19:17:07.429031');
INSERT INTO "django_migrations" VALUES(17,'admin','0001_initial','2023-07-07 19:17:07.449900');
INSERT INTO "django_migrations" VALUES(18,'admin','0002_logentry_remove_auto_add','2023-07-07 19:17:07.500573');
INSERT INTO "django_migrations" VALUES(19,'admin','0003_logentry_add_action_flag_choices','2023-07-07 19:17:07.527724');
INSERT INTO "django_migrations" VALUES(20,'elections','0001_initial','2023-07-07 19:17:07.550082');
INSERT INTO "django_migrations" VALUES(21,'elections','0002_alter_tbelections_duedate','2023-07-07 19:17:07.565086');
INSERT INTO "django_migrations" VALUES(22,'sessions','0001_initial','2023-07-07 19:17:07.611194');
INSERT INTO "django_migrations" VALUES(23,'token_blacklist','0001_initial','2023-07-07 19:17:07.635683');
INSERT INTO "django_migrations" VALUES(24,'token_blacklist','0002_outstandingtoken_jti_hex','2023-07-07 19:17:07.680166');
INSERT INTO "django_migrations" VALUES(25,'token_blacklist','0003_auto_20171017_2007','2023-07-07 19:17:07.755170');
INSERT INTO "django_migrations" VALUES(26,'token_blacklist','0004_auto_20171017_2013','2023-07-07 19:17:07.774227');
INSERT INTO "django_migrations" VALUES(27,'token_blacklist','0005_remove_outstandingtoken_jti','2023-07-07 19:17:07.795100');
INSERT INTO "django_migrations" VALUES(28,'token_blacklist','0006_auto_20171017_2113','2023-07-07 19:17:07.882761');
INSERT INTO "django_migrations" VALUES(29,'token_blacklist','0007_auto_20171017_2214','2023-07-07 19:17:07.909162');
INSERT INTO "django_migrations" VALUES(30,'token_blacklist','0008_migrate_to_bigautofield','2023-07-07 19:17:07.947801');
INSERT INTO "django_migrations" VALUES(31,'token_blacklist','0010_fix_migrate_to_bigautofield','2023-07-07 19:17:07.987427');
INSERT INTO "django_migrations" VALUES(32,'token_blacklist','0011_linearizes_history','2023-07-07 19:17:08.009438');
INSERT INTO "django_migrations" VALUES(33,'token_blacklist','0012_alter_outstandingtoken_user','2023-07-07 19:17:08.023446');
INSERT INTO "django_migrations" VALUES(34,'users','0002_auto_20230707_2216','2023-07-07 19:17:08.031339');
INSERT INTO "django_migrations" VALUES(35,'elections','0003_alter_tbelections_image','2023-07-07 20:20:17.145008');
INSERT INTO "django_migrations" VALUES(36,'elections','0004_alter_tbelections_image','2023-07-07 22:56:25.290355');
INSERT INTO "django_migrations" VALUES(37,'elections','0005_alter_tbelections_image','2023-07-07 23:19:40.144751');
INSERT INTO "django_migrations" VALUES(38,'elections','0006_alter_tbelections_image','2023-07-07 23:39:47.309516');
INSERT INTO "django_migrations" VALUES(39,'elections','0007_remove_tbelections_image','2023-07-08 00:00:18.787544');
INSERT INTO "django_migrations" VALUES(40,'elections','0002_tbelections_image','2023-07-08 00:05:43.602098');
INSERT INTO "django_migrations" VALUES(41,'elections','0003_remove_tbelections_image','2023-07-08 00:10:23.417999');
INSERT INTO "django_migrations" VALUES(42,'elections','0004_tbelections_image','2023-07-08 00:13:15.768098');
INSERT INTO "django_migrations" VALUES(43,'elections','0005_remove_tbelections_image','2023-07-08 00:13:15.783089');
INSERT INTO "django_migrations" VALUES(44,'elections','0006_tbelections_image','2023-07-08 00:13:15.797081');
INSERT INTO "django_migrations" VALUES(45,'elections','0007_rename_create_by_tbelections_created_by_and_more','2023-07-09 05:27:27.210387');
INSERT INTO "django_migrations" VALUES(46,'elections','0008_tbelections_updated_by_tbelections_updated_date_and_more','2023-07-09 05:32:17.469633');
INSERT INTO "django_migrations" VALUES(47,'elections','0009_tbelections_priority','2023-07-10 06:12:29.659216');
INSERT INTO "django_migrations" VALUES(48,'elections','0010_projectinfo','2023-07-11 09:33:22.919747');
CREATE TABLE "django_session" ("session_key" varchar(40) NOT NULL PRIMARY KEY, "session_data" text NOT NULL, "expire_date" datetime NOT NULL);
INSERT INTO "django_session" VALUES('39wbuchvhr4tb5iyqio0cbenv6tuix5n','.eJxVjMsOwiAQRf-FtSEzAwi4dN9vIMMUbNWUpI-V8d-1SRe6veec-1KJt3VI21LmNPbqolCdfrfM8ijTDvo7T7empU3rPGa9K_qgi-5aX57Xw_07GHgZvrUQOZAIQCIYCdlTqJZ9AOcEHRUbwVQjHkP1uUa050jOghR0Bdio9wey3Tag:1qHqyb:EUGwJjSFeDfuLSQkexa8xvrcwz_FrtVMX6qogngVM90','2023-07-21 19:18:45.536282');
INSERT INTO "django_session" VALUES('1bcrtvhdaw7301mg269ymfk2po54ztdq','.eJxVjEEOwiAQRe_C2hAQRsCl-56BzDAgVUOT0q6Md7dNutDtf-_9t4i4LjWuPc9xZHEVWpx-N8L0zG0H_MB2n2Sa2jKPJHdFHrTLYeL8uh3u30HFXreaysVpcpltMJY4sCMDyRulEFzIHlgFtAkAAoEuTp_JbAEUwy5ZD-LzBeJtN4Q:1qIBKW:Bes2fJL0vnbLE3yV_XOQKXkfAUPGFLaz_x3eXWGiaXM','2023-07-22 17:02:44.431778');
INSERT INTO "django_session" VALUES('56u15huxflpu36l1oc6os3hct1x296nr','.eJxVjEEOwiAQRe_C2hAQRsCl-56BzDAgVUOT0q6Md7dNutDtf-_9t4i4LjWuPc9xZHEVWpx-N8L0zG0H_MB2n2Sa2jKPJHdFHrTLYeL8uh3u30HFXreaysVpcpltMJY4sCMDyRulEFzIHlgFtAkAAoEuTp_JbAEUwy5ZD-LzBeJtN4Q:1qIMsA:ZFJJ6wVWDC6qa-JlLBFcR119KcKWAgGNGhhVFMcWwAQ','2023-07-23 05:22:14.341539');
CREATE TABLE "elections" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "title" varchar(255) NULL, "description" varchar(255) NULL, "status" varchar(255) NULL, "duedate" date NULL, "location" varchar(255) NULL, "category" varchar(255) NULL, "candidates" varchar(255) NULL, "moderators" varchar(255) NULL, "del_flag" integer NULL, "created_by" integer NULL, "created_date" datetime NULL, "image" varchar(100) NULL, "updated_by" integer NULL, "updated_date" datetime NULL, "priority" varchar(255) NULL);
INSERT INTO "elections" VALUES(1,'Sabah Alsalem','this is sabah alsalem','New','2023-07-09',NULL,'High',NULL,'[]',NULL,NULL,NULL,'',NULL,NULL,NULL);
INSERT INTO "elections" VALUES(2,'Al Surrah','This is Al Raqqah','Inprogress','2023-07-11',NULL,'High',NULL,'[]',NULL,NULL,NULL,'',NULL,NULL,'High');
INSERT INTO "elections" VALUES(4,'Al Raqqah','This is Al Raqqah','Inprogress','2023-07-08',NULL,'High',NULL,'[]',0,NULL,NULL,NULL,NULL,NULL,NULL);
INSERT INTO "elections" VALUES(5,'Pending','This is Al Raqqah','Inprogress','2023-07-10',NULL,NULL,NULL,'[]',0,NULL,NULL,'',NULL,NULL,'High');
INSERT INTO "elections" VALUES(9,'Farwaniya','This is Al Raqqah','Inprogress','2023-07-10',NULL,NULL,NULL,'[]',0,NULL,NULL,'',NULL,NULL,'Low');
INSERT INTO "elections" VALUES(16,'Qadsiya','','Pending','2023-07-10',NULL,NULL,NULL,'[]',NULL,NULL,NULL,'elections/sabah-alsalem_WBVoyKH.jpg',NULL,NULL,'Medium');
INSERT INTO "elections" VALUES(21,'Al Yarmouk','This is Al Yarmouk','Inprogress','2023-11-11',NULL,' ??? ',NULL,'[]',0,NULL,NULL,'C:\fakepath\kuwait.jpg',NULL,NULL,'Medium');
INSERT INTO "elections" VALUES(22,'Al Mansouriya','This is Al Mansouriya','Inprogress','2023-07-10',NULL,NULL,NULL,'[]',0,NULL,NULL,'C:\fakepath\kuwait.jpg',NULL,NULL,'High');
INSERT INTO "elections" VALUES(23,'Farwaniya','This is Al Raqqah','Inprogress','2023-07-10',NULL,NULL,NULL,'[]',0,NULL,NULL,'sanad.jpg',NULL,NULL,'High');
INSERT INTO "elections" VALUES(27,'Qurtuba','This is Qurtuba','Pending','2023-03-14',NULL,' ??? ',NULL,'[]',0,NULL,NULL,'C:\fakepath\kuwait.jpg',NULL,NULL,'High');
INSERT INTO "elections" VALUES(46,'Al Manqaf','','New','2023-07-11',NULL,' ??? ',NULL,'[]',0,NULL,NULL,'',NULL,NULL,'High');
INSERT INTO "elections" VALUES(47,'Hawalli','','New','2023-10-13',NULL,' ??? ',NULL,'[]',0,NULL,NULL,'',NULL,NULL,'High');
INSERT INTO "elections" VALUES(48,'Bayan','','New','2023-07-25',NULL,' ??? ',NULL,'[]',0,NULL,NULL,'',NULL,NULL,'High');
INSERT INTO "elections" VALUES(49,'Sabahiya','We are in al sabahiya city','New','2023-07-28',NULL,' ??? ',NULL,'[]',0,NULL,NULL,'',NULL,NULL,'High');
INSERT INTO "elections" VALUES(50,'Farwaniya','This is Al Raqqah','Completed','2023-07-12',NULL,' ??? ',NULL,'[]',0,NULL,NULL,'',NULL,NULL,'Low');
CREATE TABLE "elections_projectinfo" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "data" text NOT NULL CHECK ((JSON_VALID("data") OR "data" IS NULL)));
CREATE TABLE "guarantees" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "user_id" integer NULL, "election_id" integer NULL, "guarantor_id" integer NULL, "guarantee" integer NULL, "attended" integer NULL, "status" varchar(255) NULL, "del_flag" integer NULL, "created_by" integer NULL, "created_date" datetime NULL, "updated_by" integer NULL, "updated_date" datetime NULL);
CREATE TABLE "menu" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "name" varchar(255) NULL, "url" varchar(255) NULL, "parentId" integer NULL, "del_flag" integer NULL, "created_by" integer NULL, "created_date" datetime NULL, "updated_by" integer NULL, "updated_date" datetime NULL);
CREATE TABLE "permission" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "name" varchar(255) NULL, "description" varchar(255) NULL, "del_flag" integer NULL, "created_by" integer NULL, "created_date" datetime NULL, "updated_by" integer NULL, "updated_date" datetime NULL);
CREATE TABLE "permissionmenu" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "permissionId" integer NULL, "menuId" integer NULL, "value" varchar(255) NULL, "label" varchar(255) NULL);
CREATE TABLE "sorting" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "name" varchar(255) NULL, "del_flag" integer NULL, "created_by" integer NULL, "created_date" datetime NULL, "updated_by" integer NULL, "updated_date" datetime NULL);
CREATE TABLE "team_members" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "candidate_id" integer NULL, "teamuser_id" integer NULL, "del_flag" integer NULL, "created_by" integer NULL, "created_date" date NULL, "updated_by" integer NULL, "updated_date" date NULL);
CREATE TABLE "token_blacklist_blacklistedtoken" ("blacklisted_at" datetime NOT NULL, "token_id" bigint NOT NULL UNIQUE REFERENCES "token_blacklist_outstandingtoken" ("id") DEFERRABLE INITIALLY DEFERRED, "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT);
CREATE TABLE "token_blacklist_outstandingtoken" ("token" text NOT NULL, "created_at" datetime NULL, "expires_at" datetime NOT NULL, "user_id" bigint NULL REFERENCES "users_user" ("id") DEFERRABLE INITIALLY DEFERRED, "jti" varchar(255) NOT NULL UNIQUE, "id" integer NOT NULL PRIMARY KEY AUTOINCREMENT);
CREATE TABLE "user_rank" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "name" varchar(255) NULL, "permissionId" integer NULL, "parentId" integer NULL, "del_flag" integer NULL, "created_by" integer NULL, "created_date" datetime NULL, "updated_by" integer NULL, "updated_date" datetime NULL);
CREATE TABLE "users" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "fname" varchar(255) NULL, "lname" varchar(255) NULL, "avatar" varchar(255) NULL, "role" varchar(255) NULL, "cid" integer NULL, "mobile" varchar(255) NULL, "email" varchar(255) NULL, "username" varchar(255) NULL, "password" varchar(255) NULL, "rank" integer NULL, "election_option" varchar(255) NULL, "del_flag" integer NULL, "created_by" integer NULL, "created_date" datetime NULL, "updated_by" integer NULL, "updated_date" datetime NULL);
CREATE TABLE "users_role" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "name" varchar(255) NULL, "permissionId" integer NULL, "del_flag" integer NULL, "created_by" integer NULL, "created_date" datetime NULL, "updated_by" integer NULL, "updated_date" datetime NULL);
CREATE TABLE "users_user" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "password" varchar(128) NOT NULL, "last_login" datetime NULL, "is_superuser" bool NOT NULL, "email" varchar(254) NOT NULL UNIQUE, "username" varchar(150) NOT NULL UNIQUE, "first_name" varchar(150) NOT NULL, "start_date" datetime NOT NULL, "about" text NOT NULL, "is_staff" bool NOT NULL, "is_active" bool NOT NULL);
INSERT INTO "users_user" VALUES(1,'pbkdf2_sha256$600000$C2tmO0c726HTAvUH25ObDH$smh0m4QjA8/FClYmY1+2ynQ4PMBLgpWpRifoRDl/8Ks=','2023-07-09 05:22:13.843059',1,'esanad@gmail.com','sanad','sanad','2023-07-07 19:17:35.357288','',1,1);
CREATE TABLE "users_user_groups" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "user_id" bigint NOT NULL REFERENCES "users_user" ("id") DEFERRABLE INITIALLY DEFERRED, "group_id" integer NOT NULL REFERENCES "auth_group" ("id") DEFERRABLE INITIALLY DEFERRED);
CREATE TABLE "users_user_user_permissions" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "user_id" bigint NOT NULL REFERENCES "users_user" ("id") DEFERRABLE INITIALLY DEFERRED, "permission_id" integer NOT NULL REFERENCES "auth_permission" ("id") DEFERRABLE INITIALLY DEFERRED);
CREATE TABLE "voters" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "election_id" integer NULL, "civil_id" integer NULL, "name" varchar(255) NULL, "del_flag" integer NULL, "created_by" integer NULL, "created_date" datetime NULL, "updated_by" integer NULL, "updated_date" datetime NULL);
CREATE UNIQUE INDEX "django_content_type_app_label_model_76bd3d3b_uniq" ON "django_content_type" ("app_label", "model");
CREATE UNIQUE INDEX "auth_group_permissions_group_id_permission_id_0cd325b0_uniq" ON "auth_group_permissions" ("group_id", "permission_id");
CREATE INDEX "auth_group_permissions_group_id_b120cbf9" ON "auth_group_permissions" ("group_id");
CREATE INDEX "auth_group_permissions_permission_id_84c5c92e" ON "auth_group_permissions" ("permission_id");
CREATE UNIQUE INDEX "auth_permission_content_type_id_codename_01ab375a_uniq" ON "auth_permission" ("content_type_id", "codename");
CREATE INDEX "auth_permission_content_type_id_2f476e4b" ON "auth_permission" ("content_type_id");
CREATE UNIQUE INDEX "users_user_groups_user_id_group_id_b88eab82_uniq" ON "users_user_groups" ("user_id", "group_id");
CREATE INDEX "users_user_groups_user_id_5f6f5a90" ON "users_user_groups" ("user_id");
CREATE INDEX "users_user_groups_group_id_9afc8d0e" ON "users_user_groups" ("group_id");
CREATE UNIQUE INDEX "users_user_user_permissions_user_id_permission_id_43338c45_uniq" ON "users_user_user_permissions" ("user_id", "permission_id");
CREATE INDEX "users_user_user_permissions_user_id_20aca447" ON "users_user_user_permissions" ("user_id");
CREATE INDEX "users_user_user_permissions_permission_id_0b93982e" ON "users_user_user_permissions" ("permission_id");
CREATE INDEX "django_admin_log_content_type_id_c4bce8eb" ON "django_admin_log" ("content_type_id");
CREATE INDEX "django_admin_log_user_id_c564eba6" ON "django_admin_log" ("user_id");
CREATE INDEX "django_session_expire_date_a5c62663" ON "django_session" ("expire_date");
CREATE INDEX "token_blacklist_outstandingtoken_user_id_83bc629a" ON "token_blacklist_outstandingtoken" ("user_id");
DELETE FROM "sqlite_sequence";
INSERT INTO "sqlite_sequence" VALUES('django_migrations',48);
INSERT INTO "sqlite_sequence" VALUES('django_content_type',30);
INSERT INTO "sqlite_sequence" VALUES('auth_permission',120);
INSERT INTO "sqlite_sequence" VALUES('auth_group',0);
INSERT INTO "sqlite_sequence" VALUES('django_admin_log',10);
INSERT INTO "sqlite_sequence" VALUES('token_blacklist_blacklistedtoken',0);
INSERT INTO "sqlite_sequence" VALUES('token_blacklist_outstandingtoken',0);
INSERT INTO "sqlite_sequence" VALUES('users_user',1);
INSERT INTO "sqlite_sequence" VALUES('elections',50);
COMMIT;
