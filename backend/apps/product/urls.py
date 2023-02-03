from django.urls import path
from .views import ProductDetailView, ListSearchView, ListProductView, ListBySearchView, ListRelatedView

app_name = "product"
urlpatterns = [
    path('product/<productId>', ProductDetailView.as_view()),
    path('get-products', ListProductView.as_view()),
    path('search', ListSearchView.as_view()),
    path('related/<productId>', ListRelatedView.as_view()),
    path('by/search', ListBySearchView.as_view()),
]
