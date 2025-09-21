import os
from dotenv import load_dotenv

# --- Load environment variables at the very start ---
load_dotenv()

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import fitz  # PyMuPDF
import gradio as gr

# Import your Hugging Face utility function
# This path might need to be corrected if you have a 'utils' folder.
# If hf_utils.py is in the same directory, it should be: from hf_utils import get_analysis_from_hf
from utils.hf_utils import get_analysis_from_hf


# --- CONFIGURATION ---
app = FastAPI(
    title="Resume Matcher API & UI",
    description="An API and web interface that analyzes a resume against a job description."
)

# --- MIDDLEWARE ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- RESPONSE MODEL FOR API ---
class AnalysisResult(BaseModel):
    relevance_score: int
    verdict: str
    required_skills: list[str]
    found_skills: list[str]
    missing_skills: list[str]
    feedback: str

# --- CORE LOGIC FUNCTIONS ---
def extract_text_from_pdf(file_content: bytes) -> str:
    try:
        with fitz.open(stream=file_content, filetype="pdf") as doc:
            return "".join(page.get_text() for page in doc)
    except Exception:
        return ""

# --- API ENDPOINT ---
@app.post("/analyze/", response_model=AnalysisResult)
async def analyze_documents_api(
    resume: UploadFile = File(...),
    jd: UploadFile = File(...)
):
    resume_content = await resume.read()
    jd_content = await jd.read()
    resume_text = extract_text_from_pdf(resume_content)
    jd_text = extract_text_from_pdf(jd_content)

    if not resume_text or not jd_text:
        raise HTTPException(status_code=400, detail="Could not extract text from PDFs.")

    analysis = get_analysis_from_hf(jd_text, resume_text)
    if "error" in analysis:
        raise HTTPException(status_code=500, detail=analysis["error"])
    return analysis

# --- GRADIO FUNCTION DEFINITION ---
def analyze_and_format(resume, jd):
    """Function to be called by the Gradio interface."""
    if resume is None or jd is None:
        return "Please upload both a resume and a job description.", "", "", ""

    resume_path = resume.name
    jd_path = jd.name

    try:
        with open(resume_preath, "rb") as resume_file, open(jd_path, "rb") as jd_file:
            resume_text = extract_text_from_pdf(resume_file.read())
            jd_text = extract_text_from_pdf(jd_file.read())

        if not resume_text or not jd_text:
            return "Error: Could not extract text from one or both PDFs.", "", "", ""
        
        analysis = get_analysis_from_hf(jd_text, resume_text)

        if "error" in analysis:
            return f"API Error: {analysis['error']}", "", "", ""

        relevance_score = f"**Relevance Score:** {analysis['relevance_score']}% ({analysis['verdict']})"
        found_skills_str = "\n".join([f"- {skill.strip()}" for skill in analysis['found_skills']])
        missing_skills_str = "\n".join([f"- {skill.strip()}" for skill in analysis['missing_skills']])
        feedback = f"**Feedback:**\n{analysis['feedback']}"

        return relevance_score, found_skills_str, missing_skills_str, feedback
    except Exception as e:
        return f"An unexpected error occurred: {str(e)}", "", "", ""

# --- GRADIO INTERFACE BLOCK ---
with gr.Blocks(theme=gr.themes.Soft()) as demo:
    gr.Markdown("# 📄 Resume Matcher Pro")
    gr.Markdown("Upload a resume and a job description to see the match analysis.")

    with gr.Row():
        with gr.Column():
            gr.Markdown("### Inputs")
            resume_input = gr.File(label="Upload Resume (PDF)")
            jd_input = gr.File(label="Upload Job Description (PDF)")
            analyze_btn = gr.Button("Analyze Match", variant="primary")
        
        with gr.Column():
            gr.Markdown("### Analysis Results")
            score_output = gr.Markdown(label="Overall Score")
            feedback_output = gr.Markdown(label="General Feedback")
            
            with gr.Row():
                found_skills_output = gr.Markdown(label="✅ Skills Found")
                missing_skills_output = gr.Markdown(label="❌ Skills Missing")

    analyze_btn.click(
        fn=analyze_and_format, 
        inputs=[resume_input, jd_input], 
        outputs=[score_output, found_skills_output, missing_skills_output, feedback_output]
    )

# --- MOUNT THE GRADIO APP ---
app = gr.mount_gradio_app(app, demo, path="/")