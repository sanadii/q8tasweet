# Standard library imports
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

# Third-party imports
from rest_framework.schemas import get_schema_view
from rest_framework.documentation import include_docs_urls

# Application-specific imports
# (if there are any specific imports, add them here)

urlpatterns = [
    # Django Admin
    path("admin/", admin.site.urls),

    # React
    path('', TemplateView.as_view(template_name='index.html')),

    # Applications
    path("", include("users.urls", namespace="users")), #TODOS
    path("elections/", include(("restapi.urls", "elections"), namespace="elections")),

<<<<<<< HEAD
<<<<<<< HEAD
    # React
    re_path(r'^.*', TemplateView.as_view(template_name='index.html')),
=======
>>>>>>> 082f608defd05a4e30824e23975b0efb10b5dd62

=======
>>>>>>> parent of 9cbcfb3 (Latest from PC, for react Build)
    # Schema & Documentation
    path("docs/", include_docs_urls(title="WorkspaceAPI")),
    path(
        "schema",
        get_schema_view(
            title="WorkspaceAPI", description="API for the WorkspaceAPI", version="1.0.0"
        ),
        name="openapi-schema",
    ),

    # # React
    # re_path(r'^.*', TemplateView.as_view(template_name='index.html')),

]

# urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Make sure this is at the very end
urlpatterns.append(re_path(r'^.*', TemplateView.as_view(template_name='index.html')))

