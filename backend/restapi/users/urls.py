# restapi/users/urls.py
from django.urls import path, include
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

app_name = "users"

urlpatterns = [
    # Authentication
    path("auth/userLogin", userJWTLogin.as_view(), name="userJWTLogin"),
    path("auth/postProfile/", UserProfileUpdateAPIView.as_view(), name="user_profile_update"),
    # path("user/", UserCreate.as_view(), name="listpost"),
    path("auth/", include("rest_framework.urls", namespace="rest_framework")),

    # path("user/", include("users.urls", namespace="users")),
    # path("create/", UserCreate.as_view(), name="create_user"),
    # path("logout/blacklist/", BlacklistTokenUpdateView.as_view(), name="blacklist"),
    
    # Tokens
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),

    # Users
    path("getUsers", GetUsers.as_view(), name="GetUsers"),
    path("getModeratorUsers", GetModeratorUsers.as_view(), name="GetModeratorUsers"),
    path('getCurrentUser', GetCurrentUser.as_view(), name="GetCurrentUser"),
    path('addNewUser', AddNewUser.as_view(), name="AddNewUser"),
    path('updateUser', UpdateUser.as_view(), name="UpdateUser"),
    path('deleteUser/<int:id>', DeleteUser.as_view(), name="DeleteUser"),

    # Groups
    path("getGroups", GetGroups.as_view(), name="GetGroups"),
    path('addNewGroup', AddNewGroup.as_view(), name="AddNewGroup"),
    path('updateGroup', UpdateGroup.as_view(), name="UpdateGroup"),
    path('deleteGroup/<int:id>', DeleteGroup.as_view(), name="DeleteGroup"),

]
