import json
import os
from django.utils import timezone
from decimal import Decimal
from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib import messages
from django import forms
from django.db import models
import logging
from .models import Seller, ChatRoom, Message, Valuation

# -----------------------
# Authentication Forms
# -----------------------

class LoginForm(AuthenticationForm):
    username = forms.CharField(
        widget=forms.TextInput(attrs={
            'class': 'w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500',
            'placeholder': 'Enter your username'
        })
    )
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={
            'class': 'w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500',
            'placeholder': 'Enter your password'
        })
    )

class SignupForm(UserCreationForm):
    email = forms.EmailField(
        required=False,
        widget=forms.EmailInput(attrs={
            'class': 'w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500',
            'placeholder': 'Enter your email'
        })
    )
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['username'].widget.attrs.update({
            'class': 'w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500',
            'placeholder': 'Choose a username'
        })
        self.fields['password1'].widget.attrs.update({
            'class': 'w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500',
            'placeholder': 'Create a password'
        })
        self.fields['password2'].widget.attrs.update({
            'class': 'w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500',
            'placeholder': 'Confirm your password'
        })

# -----------------------
# Authentication Views
# -----------------------

def auth(request):
    # If user is already authenticated, redirect to home
    if request.user.is_authenticated:
        return redirect('home')
    
    login_form = LoginForm()
    signup_form = SignupForm()
    auto_show_login = False
    
    if request.method == 'POST':
        form_type = request.POST.get('form_type')
        print(f"Form type: {form_type}")  # Debug
        
        if form_type == 'login':
            login_form = LoginForm(request, data=request.POST)
            if login_form.is_valid():
                user = login_form.get_user()
                login(request, user)
                print(f"Login successful: {user.username}")  # Debug
                
                # Redirect to intended page after login if stored
                next_url = request.session.pop('redirect_after_login', None)
                if next_url:
                    return redirect(next_url)
                
                messages.success(request, f'Welcome back, {user.username}!')
                return redirect('home')
            else:
                print("Login failed")  # Debug
                messages.error(request, 'Invalid username or password')
                
        elif form_type == 'signup':
            signup_form = SignupForm(request.POST)
            if signup_form.is_valid():
                user = signup_form.save()
                print(f"Signup successful: {user.username}")  # Debug
                
                # Store flag in session to show login tab
                request.session['show_login_tab'] = True
                request.session['new_username'] = user.username
                
                messages.success(request, 'Account created successfully! Please login to continue.')
                return redirect('auth')
            else:
                print("Signup failed")  # Debug
                for field, errors in signup_form.errors.items():
                    for error in errors:
                        messages.error(request, f"{field}: {error}")
    
    # Check if we should show login tab (after signup redirect)
    if request.session.get('show_login_tab'):
        auto_show_login = True
        # Pre-fill the login form
        new_username = request.session.pop('new_username', None)
        if new_username:
            login_form = LoginForm(initial={'username': new_username})
        # Clear the flag
        request.session.pop('show_login_tab', None)
    
    context = {
        'login_form': login_form,
        'signup_form': signup_form,
        'auto_show_login': auto_show_login,
    }
    
    print(f"Rendering with auto_show_login: {auto_show_login}")  # Debug
    return render(request, 'myapp/auth.html', context)

@csrf_protect
def user_logout(request):
    # Debug: Check if user is authenticated before logout
    print(f"User before logout: {request.user}, Authenticated: {request.user.is_authenticated}")
    
    # Perform logout
    logout(request)
    
    # Debug: Check if user is authenticated after logout
    print(f"User after logout: {request.user}, Authenticated: {request.user.is_authenticated}")
    
    # Clear session data
    request.session.flush()
    
    messages.success(request, 'You have been logged out successfully.')
    return redirect('home')

# -----------------------
# Main Application Views
# -----------------------

def home(request):
    sellers = Seller.objects.all()
    chats = []
    if request.user.is_authenticated:
        chats = ChatRoom.objects.filter(vendor=request.user) | ChatRoom.objects.filter(customer=request.user)
    
    return render(request, "myapp/home.html", {
        "sellers": sellers,
        "chats": chats
    })

@login_required
def profile(request):
    # Try to get the latest valuation data from database
    latest_valuation = Valuation.objects.filter(user=request.user).order_by('-created_at').first()
    
    valuation_data = None
    last_valuation_date = None
    tips_total = 0  # Initialize tips total
    
    if latest_valuation:
        valuation_data = {
            'final_value': float(latest_valuation.final_value),
            'base_value': float(latest_valuation.base_value),
            'health': latest_valuation.health_data,
            'tips': latest_valuation.improvement_tips,
            'brand': latest_valuation.brand,
            'model': latest_valuation.model,
            'storage': latest_valuation.storage,
            'score': latest_valuation.score,
        }
        # Calculate tips total from database
        tips_total = sum(tip.get('price', 0) for tip in latest_valuation.improvement_tips)
        last_valuation_date = latest_valuation.created_at
    else:
        # Fallback to session data if no database record exists
        valuation_data = request.session.get('last_valuation', None)
        last_valuation_date_str = request.session.get('last_valuation_date', None)
        if last_valuation_date_str:
            try:
                last_valuation_date = timezone.datetime.fromisoformat(last_valuation_date_str)
            except (ValueError, TypeError):
                last_valuation_date = None
        # Calculate tips total from session data
        if valuation_data and valuation_data.get('tips'):
            tips_total = sum(tip.get('price', 0) for tip in valuation_data['tips'])
    
    # Get valuation history for the user
    valuation_history = Valuation.objects.filter(user=request.user).order_by('-created_at')[:5]
    
    context = {
        'valuation_data': valuation_data,
        'last_valuation_date': last_valuation_date,
        'valuation_history': valuation_history,
        'tips_total': tips_total,  # Pass the calculated total to template
        'chats': ChatRoom.objects.filter(vendor=request.user) | ChatRoom.objects.filter(customer=request.user),
    }
    
    return render(request, 'myapp/profile.html', context)

@login_required
def chat(request):
    user = request.user
    chats = ChatRoom.objects.filter(vendor=user) | ChatRoom.objects.filter(customer=user)
    
    return render(request, "myapp/chat.html", {
        "chats": chats,
    })

@login_required
def tips(request):
    # Your existing phone_categories data with phones list
    phone_categories = [
        {
            'emoji': '📸', 
            'name': 'Camera', 
            'key': 'camera', 
            'description': 'Best phones for photography and videography',
            'phones': [
                {'name': 'iPhone 14 Pro Max', 'price': 800000, 'specs': '48MP main, Cinematic mode'},
                {'name': 'Google Pixel 7 Pro', 'price': 600000, 'specs': 'Super Res Zoom, Magic Eraser'},
                {'name': 'Samsung Galaxy S23 Ultra', 'price': 750000, 'specs': '200MP camera, 10x optical zoom'},
            ]
        },
        {
            'emoji': '🎮', 
            'name': 'Gaming', 
            'key': 'gaming', 
            'description': 'Best phones for mobile gaming performance',
            'phones': [
                {'name': 'ASUS ROG Phone 6', 'price': 450000, 'specs': '144Hz display, AirTrigger controls'},
                {'name': 'iPhone 13 Pro Max', 'price': 650000, 'specs': 'A15 Bionic, 120Hz ProMotion'},
                {'name': 'OnePlus 11', 'price': 420000, 'specs': 'Snapdragon 8 Gen 2, 100W charging'},
            ]
        },
        {
            'emoji': '💰', 
            'name': 'Resale Value', 
            'key': 'resale', 
            'description': 'Phones that retain the highest resale value',
            'phones': [
                {'name': 'iPhone 14 Pro', 'price': 750000, 'specs': 'Retains 85% value after 1 year'},
                {'name': 'iPhone 13', 'price': 550000, 'specs': 'Retains 78% value after 1 year'},
                {'name': 'Samsung Galaxy S23', 'price': 600000, 'specs': 'Retains 70% value after 1 year'},
            ]
        },
        {
            'emoji': '🔥', 
            'name': 'In-Demand', 
            'key': 'demand', 
            'description': 'Most sought-after phones in the market',
            'phones': [
                {'name': 'iPhone 12', 'price': 350000, 'specs': 'High demand for budget iPhone'},
                {'name': 'Samsung A54', 'price': 280000, 'specs': 'Popular mid-range option'},
                {'name': 'Tecno Spark 10', 'price': 100000, 'specs': 'Budget king, high sales volume'},
            ]
        }
    ]

    # Vendor assessment points
    assessment_points = {
        'left': [
            'Physical condition (screen, frame, water damage)',
            'Battery health (higher % = higher value)',
            'Functionality (camera, speaker, sensors, Face ID/Fingerprint)'
        ],
        'right': [
            'Market demand & age of device (newer + popular = higher price)',
            'Storage size & variant (higher storage often adds value)',
            'Lock status (iCloud/SIM locks reduce value significantly)'
        ]
    }

    # Market demand data
    market_demand = {
        'labels': ['iPhone 13', 'iPhone 12', 'Samsung A54', 'Tecno Spark', 'Infinix Hot'],
        'data': [90, 80, 70, 60, 55]
    }

    # Phone data for budget finder
    phones = [
        {'name': "iPhone 11", 'price': 230000, 'tags': ["resale", "demand"]},
        {'name': "Samsung A54", 'price': 180000, 'tags': ["demand"]},
        {'name': "Tecno Spark 10", 'price': 100000, 'tags': ["demand"]},
        {'name': "Infinix Hot 12", 'price': 95000, 'tags': ["demand"]},
        {'name': "iPhone 13", 'price': 350000, 'tags': ["camera", "resale", "demand"]},
    ]

    context = {
        'phone_categories': phone_categories,
        'phone_categories_json': json.dumps(phone_categories),  # Add this line
        'assessment_points': assessment_points,
        'market_demand': market_demand,
        'phones_json': json.dumps(phones),
        'chats': ChatRoom.objects.filter(vendor=request.user) | ChatRoom.objects.filter(customer=request.user) if request.user.is_authenticated else [],
    }

    return render(request, 'myapp/tips.html', context)

def about(request):
    context = {
        'chats': ChatRoom.objects.filter(vendor=request.user) | ChatRoom.objects.filter(customer=request.user) if request.user.is_authenticated else [],
    }
    return render(request, 'myapp/about.html', context)

# -----------------------
# Chat Views
# -----------------------

@login_required
def chat_list(request):
    # Just redirect to the main chat page
    return redirect("chat")

@login_required
def chat_detail(request, chat_id):
    user = request.user
    chat = get_object_or_404(ChatRoom, id=chat_id)

    if user != chat.vendor and user != chat.customer:
        return redirect("chat_list")

    messages = chat.messages.order_by("timestamp")
    chats = ChatRoom.objects.filter(vendor=user) | ChatRoom.objects.filter(customer=user)
    
    return render(request, "myapp/chat.html", {
        "active_chat": chat,
        "messages": messages,
        "chats": chats  
    })

@login_required
def start_chat(request, vendor_id):
    if not request.user.is_authenticated:
        # Store where they wanted to go
        request.session['redirect_after_login'] = f'/chat/start/{vendor_id}/'
        return redirect('auth')
    customer = request.user
    vendor = get_object_or_404(User, id=vendor_id)
    chat, created = ChatRoom.objects.get_or_create(vendor=vendor, customer=customer)
    return redirect("chat_detail", chat_id=chat.id)

@csrf_exempt
@login_required
def test_message_save(request, chat_id):
    if request.method == "POST":
        chat = get_object_or_404(ChatRoom, id=chat_id)
        message = Message.objects.create(
            chatroom=chat,
            sender=request.user,
            text=request.POST.get("message", "Test message")
        )
        return JsonResponse({"status": "success", "message_id": message.id})
    return JsonResponse({"status": "error"})

# -----------------------
# Phone Valuation Views
# -----------------------

logger = logging.getLogger(__name__)

# Paths
PROJECT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASEPRICES_PATH = os.path.join(PROJECT_DIR, "myapp", "static", "baseprices.json")


def load_base_prices():
    """Load base prices from JSON file."""
    try:
        with open(BASEPRICES_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        logger.warning(f"baseprices.json not found at {BASEPRICES_PATH}")
        return {}
    except json.JSONDecodeError:
        logger.error(f"baseprices.json is invalid JSON at {BASEPRICES_PATH}")
        return {}


# Load base prices once at module load
BASE_PRICES = load_base_prices()

# Issue deductions (base amounts)
ISSUE_DEDUCTIONS = {
    "noFaceId": 40000,
    "noTrueTone": 20000,
    "touchIdBad": 20000,
    "changedScreen": 50000,
    "changedBattery": 30000,
    "changedCamera": 40000,
    "changedIc": 70000,
    "passcodeLocked": 20000,
    "icloudLocked": 40000,
    "esimLocked": 10000,
    "simLocked": 80000,
    "icDamaged": 60000,
    "speakerBad": 25000,
    "cameraDamaged": 30000,
    "screenCracked": 50000,
    "backCracked": 10000,
    "bodyScratches": 10000,
}

# Model-specific multipliers
MODEL_MULTIPLIERS = {
    "iPhone 15 Pro Max": 2.5,
    "iPhone 15 Pro": 2.4,
    "iPhone 15": 2.0,
    "iPhone 14 Pro Max": 2.2,
    "iPhone 14 Pro": 2.1,
    "iPhone 14": 1.8,
    "iPhone 13 Pro Max": 1.9,
    "iPhone 13 Pro": 1.8,
    "iPhone 13": 1.6,
    "iPhone 12 Pro Max": 1.7,
    "iPhone 12 Pro": 1.6,
    "iPhone 12": 1.4,
    "iPhone 11 Pro Max": 1.5,
    "iPhone 11 Pro": 1.4,
    "iPhone 11": 1.2,
    "iPhone SE": 1.0,
    "Galaxy S23 Ultra": 2.3,
    "Galaxy S23": 2.0,
    "Galaxy S22 Ultra": 2.0,
    "Galaxy S22": 1.8,
    "Galaxy Z Fold5": 2.4,
    "Galaxy Z Flip5": 2.1,
    "Galaxy A54": 1.2,
    "Pixel 8 Pro": 2.0,
    "Pixel 8": 1.8,
    # Add all other models from your baseprices.json
}

STORAGE_MULTIPLIERS = {
    "32GB": 0.8,
    "64GB": 0.9,
    "128GB": 1.0,
    "256GB": 1.2,
    "512GB": 1.5,
    "1TB": 2.0,
}


def get_model_multiplier(model_name):
    """Get multiplier for a specific phone model"""
    if model_name in MODEL_MULTIPLIERS:
        return MODEL_MULTIPLIERS[model_name]
    for pattern, multiplier in MODEL_MULTIPLIERS.items():
        if pattern in model_name or model_name in pattern:
            return multiplier
    return 1.0


def get_storage_multiplier(storage):
    """Get multiplier for storage capacity"""
    return STORAGE_MULTIPLIERS.get(storage, 1.0)


def calculate_dynamic_deductions(issues, model):
    """
    Calculate deductions with model multipliers only.
    Storage multiplier is NOT applied to deductions (repairs don't depend on storage size).
    """
    model_multiplier = get_model_multiplier(model)
    total_deduction = Decimal(0)
    breakdown = []

    for issue in issues:
        base_deduction = ISSUE_DEDUCTIONS.get(issue, 0)
        if base_deduction > 0:
            final_deduction = Decimal(base_deduction) * Decimal(model_multiplier)
            total_deduction += final_deduction
            breakdown.append({
                "issue": issue,
                "label": issue.replace("_", " ").title(),
                "base_deduction": base_deduction,
                "model_multiplier": float(model_multiplier),
                "final_deduction": float(final_deduction),
            })

    return total_deduction, breakdown


@csrf_exempt
def get_valuation_config(request):
    """API endpoint to get valuation configuration for frontend"""
    return JsonResponse({
        "model_multipliers": MODEL_MULTIPLIERS,
        "storage_multipliers": STORAGE_MULTIPLIERS,
        "base_deductions": ISSUE_DEDUCTIONS,
    })


@csrf_exempt
def calculate_value(request):
    if request.method != "POST":
        return JsonResponse({"error": "Invalid request"}, status=400)

    # Extract POST data
    brand = request.POST.get("brand")
    model = request.POST.get("model")
    storage = request.POST.get("storage")
    battery = request.POST.get("battery", 100)
    issues = request.POST.getlist("issues[]", [])

    # Validate required fields
    if not all([brand, model, storage]):
        return JsonResponse({"error": "Missing required fields: brand, model, storage"}, status=400)

    try:
        battery = int(battery)
        if battery < 0 or battery > 100:
            return JsonResponse({"error": "Battery health must be between 0-100%"}, status=400)
    except ValueError:
        return JsonResponse({"error": "Battery health must be a valid number"}, status=400)

    # Get base value from JSON
    base_value = BASE_PRICES.get(brand, {}).get(model, {}).get(storage)
    if base_value is None:
        base_value = BASE_PRICES.get(model)
    if base_value is None:
        base_value = 400000  # fallback default

    base_value = Decimal(base_value)
    final_value = base_value

    # Apply battery deduction ONLY for iPhones below 80%
    if brand == "iPhone" and battery < 80:
        battery_multiplier = Decimal(battery) / Decimal(100)
        final_value *= battery_multiplier

    # Calculate dynamic deductions (using model multiplier only)
    issue_deduction_total, deduction_breakdown = calculate_dynamic_deductions(issues, model)
    final_value -= issue_deduction_total

    # Ensure final value not negative
    final_value = max(final_value, Decimal(0))

    # Health calculation
    health_data = {
        "battery": battery,
        "screen": 100 if "screenCracked" not in issues and "changedScreen" not in issues else 60,
        "speaker": 100 if "speakerBad" not in issues else 70,
        "camera": 100 if "cameraDamaged" not in issues and "changedCamera" not in issues else 65,
    }

    # Score calculation
    if brand == "iPhone" and battery < 80:
        original_value = base_value * (Decimal(battery) / Decimal(100))
    else:
        original_value = base_value

    deduction_percentage = (issue_deduction_total / original_value * 100) if original_value > 0 else 0
    score = max(0, 100 - int(deduction_percentage))

    # Improvement tips
    improvement_tips = []
    for d in deduction_breakdown:
        improvement_tips.append({
            "label": d["label"],
            "price": d["final_deduction"],
            "fix_cost": f"~₦{int(d['final_deduction']):,}",
        })

    if battery < 80 and brand == "iPhone":
        battery_replacement_cost = int(30000 * get_model_multiplier(model))
        improvement_tips.append({
            "label": "Battery Replacement",
            "price": battery_replacement_cost,
            "fix_cost": f"~₦{battery_replacement_cost:,}",
        })

    # Prepare response
    result = {
        "base_value": float(base_value),
        "final_value": float(final_value),
        "deduction": float(issue_deduction_total),
        "health": health_data,
        "tips": improvement_tips,
        "score": int(score),
        "brand": brand,
        "model": model,
        "storage": storage,
        "deduction_breakdown": deduction_breakdown,
        "multipliers": {
            "model": float(get_model_multiplier(model)),
            "storage": float(get_storage_multiplier(storage)),
        },
    }

    # Save valuation to DB if user authenticated
    if request.user.is_authenticated:
        try:
            Valuation.objects.create(
                user=request.user,
                brand=brand,
                model=model,
                storage=storage,
                battery_health=battery,
                issues=issues,
                base_value=base_value,
                final_value=final_value,
                health_data=health_data,
                improvement_tips=improvement_tips,
                score=score,
                deduction_breakdown=deduction_breakdown,
            )
        except Exception as e:
            logger.error(f"Error saving valuation: {e}")

    # Save to session for quick access
    request.session["last_valuation"] = result
    request.session["last_valuation_date"] = timezone.now().isoformat()

    return JsonResponse(result)
 