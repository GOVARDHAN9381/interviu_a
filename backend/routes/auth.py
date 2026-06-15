from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel

router = APIRouter()

class UserCreate(BaseModel):
    email: str
    password: str
    full_name: str

class UserLogin(BaseModel):
    email: str
    password: str

@router.post("/register")
async def register_user(user: UserCreate):
    # In a real app, hash the password and store in MongoDB
    return {"message": "User registered successfully", "user": user.email}

@router.post("/login")
async def login_user(user: UserLogin):
    # In a real app, verify password and return JWT
    return {"access_token": "fake-jwt-token-for-dev", "token_type": "bearer"}

@router.get("/me")
async def get_current_user():
    return {"email": "user@example.com", "full_name": "Test User"}
