from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.
class Seller(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="seller_profile")
    name = models.CharField(max_length=100)
    logo = models.ImageField(upload_to="sellers/logos/", blank=True, null=True)
    whatsapp = models.CharField(max_length=20)

    def __str__(self):
        return self.name

    
class ChatRoom(models.Model):
    vendor = models.ForeignKey(User, related_name="vendor_chats", on_delete=models.CASCADE)
    customer = models.ForeignKey(User, related_name="customer_chats", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('vendor', 'customer')  # prevent duplicates

    def __str__(self):
        return f"Chat between {self.vendor.username} and {self.customer.username}"


class Message(models.Model):
    chatroom = models.ForeignKey(ChatRoom, related_name="messages", on_delete=models.CASCADE)
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.sender.username} at {self.timestamp}"



class Valuation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='valuations')
    brand = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    storage = models.CharField(max_length=20)
    battery_health = models.IntegerField(default=100)
    issues = models.JSONField(default=list)
    base_value = models.DecimalField(max_digits=10, decimal_places=2)
    final_value = models.DecimalField(max_digits=10, decimal_places=2)
    health_data = models.JSONField(default=dict)
    improvement_tips = models.JSONField(default=list)
    score = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['user', 'created_at']),
            models.Index(fields=['created_at']),
        ]
    
    def __str__(self):
        return f"{self.user.username} - {self.brand} {self.model} - ₦{self.final_value}"