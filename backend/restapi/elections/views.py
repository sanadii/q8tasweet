# from elections.models import Elections
from django.http import JsonResponse
from django.http.response import JsonResponse
from django.db.models.query import QuerySet
from django.db.models import Sum
from django.db.models import Count
from django.contrib.auth import get_user_model
from django.shortcuts import render
from django.shortcuts import get_object_or_404

from http import HTTPStatus

from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination

from restapi.serializers import *
from restapi.models import *
import ast 
from datetime import datetime
from operator import itemgetter


def index(request):
    return render(request, "index.html")

# Elections: getElection, deleteElection, addElection, updateElection, ElectionCount
class CustomElectionPagination(PageNumberPagination):
    page_size = 50

    def get_paginated_response(self, data):
        return Response({
            "count": self.page.paginator.count,
            "next": self.get_next_link(),
            "previous": self.get_previous_link(),
            "data": data,
        })

class GetElections(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request, *args, **kwargs):
        elections_data = Elections.objects.all()
        paginator = CustomElectionPagination()
        paginated_elections = paginator.paginate_queryset(elections_data, request)
        
        # Passing context with request to the serializer
        context = {"request": request}
        data_serializer = ElectionsSerializer(paginated_elections, many=True, context=context)
        
        return paginator.get_paginated_response(data_serializer.data)

class GetElectionDetails(APIView):
    def get(self, request, id):
        election = get_object_or_404(Elections, id=id)
        context = {"request": request}

        election_candidates = ElectionCandidates.objects.filter(election=election).prefetch_related('candidate').only('id')
        election_committees = ElectionCommittees.objects.filter(election=election).select_related('election')

        return Response({
            "data": {
                "electionDetails": self.get_election_data(election, context),
                "electionCandidates": self.get_election_candidates(election_candidates, context),
                "electionCommittees": self.get_election_committees(election_committees, context),
                "electionCampaigns": self.get_election_campaigns(election, context),
            },
            "code": 200
        })

    def get_election_data(self, election, context):
        return ElectionsSerializer(election, context=context).data

    def get_election_candidates(self, election_candidates, context):
        return ElectionCandidatesSerializer(election_candidates, many=True, context=context).data

    def get_election_committees(self, election_committees, context):
        return ElectionCommitteesSerializer(election_committees, many=True, context=context).data

    def get_election_campaigns(self, election, context):
        election_candidate_ids = ElectionCandidates.objects.filter(election=election).values_list('id', flat=True)
        election_campaigns = Campaigns.objects.filter(election_candidate__in=election_candidate_ids)
        return CampaignsSerializer(election_campaigns, many=True, context=context).data

class AddElection(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ElectionsSerializer(data=request.data, context={'request': request})
        
        if serializer.is_valid():
            new_election = serializer.save()
            return Response({"data": serializer.data, "count": 0, "code": 200}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateElection(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, id):
        try:
            election = Elections.objects.get(id=id)
        except Elections.DoesNotExist:
            return Response({"error": "Election not found"}, status=404)
        
        serializer = ElectionsSerializer(data=request.data, context={'request': request})
        
        if serializer.is_valid():
            serializer.save()
            return Response({"data": serializer.data, "count": 0, "code": 200})
        return Response(serializer.errors, status=400)

class DeleteElection(APIView):
    def delete(self, request, id):
        try:
            election = Elections.objects.get(id=id)
            election.delete()
            return JsonResponse({"data": "Election deleted successfully", "count": 1, "code": 200}, safe=False)
        except Elections.DoesNotExist:
            return JsonResponse({"data": "Election not found", "count": 0, "code": 404}, safe=False)


# ElectionCandidates -----------------
class AddNewElectionCandidate(APIView):
    def post(self, request):
        serializer = ElectionCandidatesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # This will call the `create` method of the serializer
            return Response({"data": serializer.data, "code": 200})
        return Response(serializer.errors, status=400)

class DeleteElectionCandidate(APIView):
    def delete(self, request, id):
        try:
            election_candidate = ElectionCandidates.objects.get(id=id)
            election_candidate.delete()
            return JsonResponse(
                {"data": "Election deleted successfully", "count": 1, "code": 200},
                safe=False,
            )
        except Elections.DoesNotExist:
            return JsonResponse(
                {"data": "Election not found", "count": 0, "code": 404}, safe=False
            )

class UpdateElectionCandidate(APIView):
    def patch(self, request, id):
        # Basic Information
        election_id = request.data.get("election_id")
        candidate_id = request.data.get("candidate_id")

        # Election Results
        votes = request.data.get("votes")
        remarks = request.data.get("remarks")

        # Fetch the election candidate details based on the URL parameter "id"
        try:
            election_candidate = ElectionCandidates.objects.get(id=id)
        except ElectionCandidates.DoesNotExist:
            return Response({"error": "Election candidate not found"}, status=404)

        # Get the actual Election instance
        try:
            election = Elections.objects.get(id=election_id)
        except Elections.DoesNotExist:
            return Response({"error": "Election not found"}, status=404)

        # Get the actual Candidate instance
        try:
            candidate = Candidates.objects.get(id=candidate_id)
        except Candidates.DoesNotExist:
            return Response({"error": "Candidate not found"}, status=404)

        # Update the election candidate with the new data
        
        # Basic Data
        election_candidate.election = election
        election_candidate.candidate = candidate

        # Election Related Data
        election_candidate.votes = votes
        election_candidate.remarks = remarks
        election_candidate.save()

        # Prepare the response data with candidate details
        updated_election_candidate_data = {
            # Basic Information
            "id": election_candidate.id,
            "election_id": election_candidate.election.id,
            "candidate_id": election_candidate.candidate.id,

            # Election Data
            "votes": election_candidate.votes,
            "remarks": election_candidate.remarks,

        }

        return Response({"data": updated_election_candidate_data, "count": 0, "code": 200})

class GetElectionCount(APIView):
    def get(self, request):
        total_count = Elections.objects.count()
        new_count = Elections.objects.filter(status="New").count()
        inprogress_count = Elections.objects.filter(
            status="Inprogress").count()
        pending_count = Elections.objects.filter(status="Pending").count()
        completed_count = Elections.objects.filter(status="Completed").count()

        data = {
            "total_elections": total_count,
            "new_elections": new_count,
            "inprogress_elections": inprogress_count,
            "pending_elections": pending_count,
            "completed_elections": completed_count,
        }

        return Response({"data": data, "count": 0, "code": 200})

# Committees: getCommittee, deleteCommittee, addCommittee, updateCommittee, CommitteeCount
class GetCommittees(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        committees_data = ElectionCommittees.objects.all()
        data_serializer = ElectionCommitteesSerializer(committees_data, many=True)

        return Response({"data": data_serializer.data, "counts": 1, "code": 200})

class AddNewElectionCommittee(APIView):
    def post(self, request):
        try:
            # Get user model and authenticated user
            User = get_user_model()
            created_by = request.user

            # Deserialize the request data using a serializer (you need to define this serializer)
            serializer = ElectionCommitteesSerializer(data=request.data)

            if serializer.is_valid():
                # Create a new committee object with the serializer"s validated data
                committee_data = serializer.validated_data
                committee_data["election_id"] = request.data.get("election_id")
                committee_data["created_by"] = created_by
                committee = ElectionCommittees(**committee_data)
                committee.save()

                new_committee_data = self.prepare_new_committee_data(committee)

                return Response({"data": new_committee_data, "count": 1, "code": status.HTTP_201_CREATED})
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def prepare_new_committee_data(self, committee):
        new_committee_data = {
            "id": committee.id,
            "election_id": committee.election_id,
            "name": committee.name,
            "gender": committee.gender,
            "created_by": committee.created_by.first_name if committee.created_by else None,
            "deleted": committee.deleted,
        }
        return new_committee_data

class DeleteElectionCommittee(APIView):
    def delete(self, request, id):
        try:
            committee = ElectionCommittees.objects.get(id=id)
            committee.delete()
            return JsonResponse({"data": "Committee deleted successfully", "count": 1, "code": 200}, safe=False)
        except ElectionCommittees.DoesNotExist:
            return JsonResponse({"data": "Committee not found", "count": 0, "code": 404}, safe=False)

class UpdateElectionCommittee(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, id):
        try:
            committee = ElectionCommittees.objects.get(id=id)
        except ElectionCommittees.DoesNotExist:
            return Response({"error": "Committee not found"}, status=404)

        # Extract the desired fields from the request data
        name = request.data.get("name")
        gender = request.data.get("gender")
        election_id = request.data.get("election_id")

        # Check if the fields are not None before updating
        if name is not None:
            committee.name = name
        if gender is not None:
            committee.gender = gender
        
        # Set the election using the provided election_id
        try:
            election = Elections.objects.get(id=election_id)
            committee.election = election
        except Elections.DoesNotExist:
            return Response({"error": "Election not found"}, status=404)

        # Save the committee
        committee.save(update_fields=["name", "gender", "election"])

        # Serialize the updated committee object
        serialized_data = ElectionCommitteesSerializer(committee).data

        return Response({"data": serialized_data, "count": 1, "code": 200})

class UpdateElectionCommitteeResults(APIView):
    permission_classes = [IsAuthenticated]  # Assuming only authenticated users can update

    def patch(self, request, id):
        # Loop through the candidates and update/insert the votes
        for candidate_id, votes in request.data.get("data", {}).items():
            obj, created = ElectionCommitteeResults.objects.update_or_create(
                election_committee_id=id,
                election_candidate_id=candidate_id,
                defaults={
                    "votes": votes,
                    "updated_by": request.user
                }
            )
        # Once the patch operation is done, fetch all relevant results
        results = ElectionCommitteeResults.objects.filter(election_committee_id=id)
        
        # Process these results into your desired structure
        output = {}
        for result in results:
            committee_id = str(result.election_committee.id)  # Converted to string as it is key in dictionary
            candidate_id = str(result.election_candidate.id)  # Converted to string as it is key in dictionary
            votes = result.votes
            
            if committee_id not in output:
                output[committee_id] = {}
                
            output[committee_id][candidate_id] = votes
        
        # If "output" is the main key in response
        return Response({"data": output, "count": 1, "code": 200})

class GetPublicElections(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        elections_data = Elections.objects.all()
        data_serializer = ElectionsSerializer(elections_data, many=True)

        # Fetch categories with parent equal to NULL
        category_options = Categories.objects.filter(parent__isnull=True)

        # Initialize count dictionary
        counts = {
            "All Elections": Elections.objects.count(),
            "Category": {category.name: 0 for category in category_options},
        }

        # Count total for each category
        for category in category_options:
            counts["Category"][category.name] = Elections.objects.filter(category=category).count()

        return Response({"data": data_serializer.data, "counts": counts, "code": 200})

class GetPublicElectionDetails(APIView):
    permission_classes = [AllowAny]
    def get(self, request, id):
        try:
            # 1. Fetch election data
            election_data = self.get_election_data(id)
            
            # 2. Fetch candidates for this election
            election_candidates = self.get_election_candidates(id)
            
            # 3. Fetch committees related to this election
            election_committees = self.get_election_committees(id)
            
            # 4. Fetch committee results for this election
            committee_results = self.get_election_committee_results(election_committees)

            # 5. Fetch campaigns for this election
            campaigns = self.get_campaigns_for_election(id)

            # Return the structured data
            return Response({
                "data": {
                    "electionDetails": election_data,
                    "electionCandidates": election_candidates,
                    "electionCommittees": election_committees,
                    "electionCommitteeResults": committee_results,
                    "electionCampaigns": campaigns,

                },
                "code": 200
            })

        except Elections.DoesNotExist:
            return JsonResponse({"error": "Election not found"}, status=404)

    def get_election_data(self, id):
        election = Elections.objects.get(id=id)
        election_serializer = ElectionsSerializer(election)
        return election_serializer.data

    def get_election_candidates(self, id):
        # Fetch the election candidates
        election_candidate = ElectionCandidates.objects.filter(election=id)
        candidate_serializer = ElectionCandidatesSerializer(election_candidate, many=True)
        election_candidates = candidate_serializer.data
        
        # Aggregate votes for each candidate across all committees
        for candidate in election_candidates:
            total_votes = ElectionCommitteeResults.objects.filter(election_candidate=candidate["id"]).aggregate(total_votes=Sum("votes"))["total_votes"] or 0
            candidate["votes"] = total_votes

        # Sort the candidates by their total votes
        election_candidates.sort(key=lambda x: x["votes"])

        # Determine the number of seats from the election data
        election = Elections.objects.get(id=id)
        number_of_seats = election.seats or 0

        # Update the candidates" position and winner status
        for idx, candidate in enumerate(election_candidates, start=1):
            candidate["position"] = str(idx)
            
            # Check if the candidate is a winner
            candidate["is_winner"] = idx <= number_of_seats


        return election_candidates

    def get_election_committees(self, id):
        election_committees = ElectionCommittees.objects.filter(election=id)
        committees_serializer = ElectionCommitteesSerializer(election_committees, many=True)
        return committees_serializer.data

    # # Showing Candidate results in all Committees
    # def get_election_committee_results(self, committees):
    #     transformed_results = {}

    #     for committee in committees:
    #         committee_id = committee["id"]
    #         committee_results = ElectionCommitteeResults.objects.filter(election_committee=committee_id)
    #         results_serializer = ElectionCommitteeResultsSerializer(committee_results, many=True)

    #         for result in results_serializer.data:
    #             candidate_id = result["election_candidate"]
    #             votes = result["votes"]

    #             # Initialize if candidate not yet in the results
    #             if candidate_id not in transformed_results:
    #                 transformed_results[candidate_id] = {}

    #             # Store votes for the current committee
    #             transformed_results[candidate_id][committee_id] = votes

    #     return transformed_results

    # Showing Committee Results for All Candidates
    def get_election_committee_results(self, committees):
        transformed_results = {}

        # Get a list of all candidate IDs
        all_candidates = ElectionCandidates.objects.all()
        all_candidate_ids = [str(candidate.id) for candidate in all_candidates]

        # Create a dictionary to store total votes for each candidate
        total_votes_per_candidate = {candidate_id: 0 for candidate_id in all_candidate_ids}

        for committee in committees:
            committee_id = str(committee["id"])
            committee_results = ElectionCommitteeResults.objects.filter(election_committee=committee_id)
            results_serializer = ElectionCommitteeResultsSerializer(committee_results, many=True)

            # Initialize the committee in the results with default votes for each candidate
            transformed_results[committee_id] = {candidate_id: 0 for candidate_id in all_candidate_ids}

            for result in results_serializer.data:
                candidate_id = str(result["election_candidate"])
                votes = result["votes"]

                # Update votes for the current candidate in the current committee
                transformed_results[committee_id][candidate_id] = votes

                # Update total votes for the candidate
                total_votes_per_candidate[candidate_id] += votes

        # Sort candidates based on total votes
        sorted_candidates_by_votes = sorted(total_votes_per_candidate, key=total_votes_per_candidate.get)

        # Reconstruct the results based on sorted candidate order
        sorted_transformed_results = {}
        for committee_id, results in transformed_results.items():
            sorted_transformed_results[committee_id] = {candidate_id: results[candidate_id] for candidate_id in sorted_candidates_by_votes}

        return sorted_transformed_results

    def get_campaigns_for_election(self, id):
        election_candidate_ids = ElectionCandidates.objects.filter(election=id).values_list("id", flat=True)
        campaign = Campaigns.objects.filter(election_candidate__in=election_candidate_ids)
        campaign_serializer = CampaignsSerializer(campaign, many=True)
        return campaign_serializer.data
