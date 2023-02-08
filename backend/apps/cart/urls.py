from django.urls import path
from .views import GetItemsView, AddItemView, GetTotalView, GetItemTotalView
from .views import UpdateItemView, RemoveItemView, EmptyCartView, SyncCartView


urlpatterns = [
    path('cart-items', GetItemsView.as_view()),
    path('add-items', AddItemView.as_view()),
    path('get-total', GetTotalView.as_view()),
    path('get-item-total', GetItemTotalView.as_view()),
    path('update-item', UpdateItemView.as_view()),
    path('remove-item', RemoveItemView.as_view()),
    path('empty-cart', EmptyCartView.as_view()),
    path('synch', SyncCartView.as_view()),
]