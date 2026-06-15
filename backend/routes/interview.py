from fastapi import APIRouter
from pydantic import BaseModel
# from services.ai_service import get_ai_response

router = APIRouter()

class InterviewMessage(BaseModel):
    role: str
    content: str

class InterviewRequest(BaseModel):
    type: str # hr, tech, mixed
    history: list[InterviewMessage]
    new_message: str

@router.post("/chat")
async def chat_with_ai(request: InterviewRequest):
    # This would call the AI service to get the response
    # ai_reply = await get_ai_response(request.history, request.new_message)
    ai_reply = "This is a placeholder AI response. Tell me more about your experience."
    return {"reply": ai_reply}

@router.post("/feedback")
async def get_interview_feedback(history: list[InterviewMessage]):
    # Call AI service to evaluate the interview
    feedback = {
        "overall": 85,
        "contentKnowledge": 80,
        "communication": 85,
        "confidence": 90,
        "fluency": 82,
        "answerStructure": 88,
        "notes": "Excellent overall delivery! Your content knowledge and communication skills are well above average."
    }
    return feedback

