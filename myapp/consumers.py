import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth.models import User
from django.db.models import Q
from .models import ChatRoom, Message


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # User is automatically authenticated via AuthMiddlewareStack
        if self.scope["user"].is_anonymous:
            await self.close()
            return
            
        self.chat_id = self.scope["url_route"]["kwargs"]["chat_id"]
        self.room_group_name = f"chat_{self.chat_id}"
        
        # Verify user can access this chat
        if await self.is_user_in_chat():
            await self.channel_layer.group_add(
                self.room_group_name,
                self.channel_name
            )
            await self.accept()
            print(f"✅ WebSocket connected for chat {self.chat_id}, user {self.scope['user'].username}")
        else:
            print(f"❌ User {self.scope['user'].username} not in chat {self.chat_id}, closing connection")
            await self.close()

    async def disconnect(self, close_code):
        if hasattr(self, 'room_group_name'):
            await self.channel_layer.group_discard(
                self.room_group_name,
                self.channel_name
            )
            print(f"🔌 WebSocket disconnected from chat {self.chat_id}")

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            message = data["message"]
            user = self.scope["user"]
            
            print(f"📨 Received message from {user.username}: {message}")
            
            # Save message to database
            saved_message = await self.save_message(message)
            
            if saved_message:
                # Send message to room group
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        "type": "chat_message",
                        "message": message,
                        "sender": user.username,
                        "timestamp": saved_message.timestamp.isoformat()
                    }
                )
            else:
                print("❌ Failed to save message to database")
                
        except json.JSONDecodeError:
            print("❌ Error: Invalid JSON received")
        except Exception as e:
            print(f"❌ Error in receive: {e}")

    async def chat_message(self, event):
        # Send message to WebSocket
        try:
            await self.send(text_data=json.dumps({
                "message": event["message"],
                "sender": event["sender"],
                "timestamp": event["timestamp"]
            }))
            print(f"📤 Sent message to client: {event['message']}")
        except Exception as e:
            print(f"❌ Error sending message to client: {e}")

    @database_sync_to_async
    def save_message(self, message_text):
        try:
            chatroom = ChatRoom.objects.get(id=self.chat_id)
            message = Message.objects.create(
                chatroom=chatroom,
                sender=self.scope["user"],
                text=message_text
            )
            print(f"💾 Message saved to database: {message_text}")
            return message
        except ChatRoom.DoesNotExist:
            print(f"❌ Chat room {self.chat_id} does not exist")
            return None
        except Exception as e:
            print(f"❌ Error saving message: {e}")
            return None

    @database_sync_to_async
    def is_user_in_chat(self):
        try:
            user = self.scope["user"]
            chat_exists = ChatRoom.objects.filter(
                id=self.chat_id
            ).filter(
                Q(vendor=user) | Q(customer=user)
            ).exists()
            
            print(f"🔍 User {user.username} in chat {self.chat_id}: {chat_exists}")
            return chat_exists
            
        except Exception as e:
            print(f"❌ Error checking chat access: {e}")
            return False