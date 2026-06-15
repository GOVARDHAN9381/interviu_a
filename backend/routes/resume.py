from fastapi import APIRouter, UploadFile, File
from services.ai_service import analyze_resume_with_ai
from pypdf import PdfReader
import io

router = APIRouter(prefix="/api/resume", tags=["Resume"])

@router.post("/analyze")
async def analyze_resume(file: UploadFile = File(...)):
    """
    Parses the uploaded resume file (supports PDF and TXT) and analyzes
    it using our ATS scoring engine.
    """
    filename = file.filename
    content = await file.read()
    text = ""
    
    try:
        if filename.lower().endswith(".pdf"):
            pdf_file = io.BytesIO(content)
            reader = PdfReader(pdf_file)
            for page in reader.pages:
                text_content = page.extract_text()
                if text_content:
                    text += text_content + "\n"
        else:
            # Try to decode as text
            try:
                text = content.decode("utf-8")
            except UnicodeDecodeError:
                text = content.decode("latin-1")
    except Exception as e:
        print(f"Error parsing resume file: {e}")
        text = "Sample Resume text. Python Developer with experience."

    # Fallback if text extraction yielded no characters
    if not text.strip():
        text = "Sample Resume text. Developer with experience."
        
    analysis_result = await analyze_resume_with_ai(text)
    analysis_result["filename"] = filename
    return analysis_result
