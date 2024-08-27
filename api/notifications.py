# notifications.py
from .models import Notification

def send_notification(recipient, message, sender=None):
    Notification.objects.create(
        recipient=recipient,
        sender=sender,
        message=message
    )