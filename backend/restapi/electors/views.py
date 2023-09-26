# from campaigns.models import Campaigns
from django.http import JsonResponse
from django.http.response import JsonResponse
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.shortcuts import render
from rest_framework.views import APIView
from restapi.serializers import *
from restapi.models import *
from .models import *
import ast 
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.pagination import PageNumberPagination

from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError

from django.db.models import Count, Case, When, IntegerField
from collections import defaultdict
from rest_framework import status
import jwt
from django.conf import settings

class GetAllElectors(APIView):
    def get(self, request):
        electors = Electors.objects.all()
        electors_serializer = ElectorsSerializer(electors, many=True)
        return Response({"data": {"allElectors": electors_serializer.data}, "code": 200})

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 100  # default number of items per page
    page_size_query_param = 'page_size'  # Allow client to override, using `?page_size=xxx`.
    max_page_size = 1000  # Maximum limit allowed when using `?page_size=xxx`.


# class GetElectors(APIView):
#     def get(self, request):
#         query = request.GET.get('searchInput', '').strip()
#         search_type = request.GET.get('searchType', '').lower()

#         if search_type == 'cid':
#             if not (query.isdigit() and len(query) == 12):  # Validate Civil ID
#                 return Response({"error": "Invalid Civil ID."}, status=400)
#             electors = Electors.objects.filter(civil=query)
            
#         elif search_type == 'name':
#             if len(query) < 3:  # Validate name length
#                 return Response({"error": "Name should be at least 3 characters long."}, status=400)
#             electors = Electors.objects.filter(
#                 Q(name_1__icontains=query) | 
#                 Q(name_2__icontains=query) | 
#                 Q(name_3__icontains=query) | 
#                 Q(name_4__icontains=query) | 
#                 Q(last_name__icontains=query)
#             )
            
#         elif search_type == 'detailed':
#             return Response({"error": "Detailed search is not yet implemented."}, status=501)
            
#         elif search_type == 'location':
#             return Response({"error": "Location search is not yet implemented."}, status=501)
            
#         else:
#             return Response({"error": "Invalid search type specified."}, status=400)

#         # Pagination
#         paginator = StandardResultsSetPagination()
#         result_page = paginator.paginate_queryset(electors, request)
#         serialized = ElectorsSerializer(result_page, many=True)
#         response_data = {
#             "data": {
#                 "electors": serialized.data,
#                 "count": paginator.page.paginator.count,
#                 "nextPageUrl": paginator.get_next_link(),
#                 "previousPageUrl": paginator.get_previous_link()
#             }
#         }

#         return Response(response_data)

# class GetElectors(APIView):
#     def get(self, request):
#         query = request.GET.get('searchInput', '').strip()
#         queries = Q()  # Start with an empty Q object to chain queries
        
#         # If query can be converted to a number, try to match it against the civil field
#         if query.isdigit():
#             queries |= Q(civil=query)
            
#         # If the query has sufficient length, try to match it against name fields
#         if len(query) >= 3:
#             for i in range(1, 11):
#                 queries |= Q(**{f"name_{i}__icontains": query})
            
#             for i in range(1, 5):
#                 queries |= Q(**{f"last_{i}__icontains": query})

#             queries |= Q(last_name__icontains=query)
        
#         electors = Electors.objects.filter(queries)

#         # Pagination
#         paginator = StandardResultsSetPagination()
#         result_page = paginator.paginate_queryset(electors, request)
#         serialized = ElectorsSerializer(result_page, many=True)
#         response_data = {
#             "data": {
#                 "electors": serialized.data,
#                 "count": paginator.page.paginator.count,
#                 "nextPageUrl": paginator.get_next_link(),
#                 "previousPageUrl": paginator.get_previous_link()
#             }
#         }

#         return Response(response_data)

class GetElectors(APIView):
    def get(self, request):
        query = request.GET.get('searchInput', '').strip()
        
        if query.isdigit():
            electors = Electors.objects.filter(civil=query)
            if not electors.exists():
                raise NotFound(detail="Name was not found.", code=404)
        else:
            all_electors = Electors.objects.all()
            if len(query) >= 3:
                electors = [elector for elector in all_electors if query.lower() in elector.full_name.lower()]
            else:
                electors = all_electors

        paginator = StandardResultsSetPagination()
        result_page = paginator.paginate_queryset(electors, request)
        serialized = ElectorsSerializer(result_page, many=True)
        response_data = {
            "data": {
                "electors": serialized.data,
                "count": paginator.page.paginator.count,
                "nextPageUrl": paginator.get_next_link(),
                "previousPageUrl": paginator.get_previous_link()
            }
        }

        return Response(response_data)

