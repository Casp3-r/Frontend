from django.contrib import admin
from .models import Seller, ChatRoom, Message

@admin.register(Seller)
class SellerAdmin(admin.ModelAdmin):
    list_display = ("name", "whatsapp")

@admin.register(ChatRoom)
class ChatRoomAdmin(admin.ModelAdmin):
    list_display = ("id", "vendor", "customer", "created_at")
    search_fields = ("vendor__username", "customer__username")

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ("id", "chatroom", "sender", "text", "timestamp")
    search_fields = ("sender__username", "text")
    list_filter = ("timestamp",)
