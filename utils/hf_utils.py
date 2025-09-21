import os
import requests
import json
from dotenv import load_dotenv

load_dotenv()

MODEL_URL = "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1"
API_TOKEN = os.environ.get("HUGGINGFACE_API_TOKEN")
headers = {"Authorization": f"Bearer {API_TOKEN}"}

PROMPT_TEMPLATE = """[INST] You are an expert AI for analyzing job descriptions and resumes.
Return ONLY a valid JSON object. Do not add any extra text, explanations, or markdown.

Schema:
{{
  "relevance_score": <int 0-100>,
  "verdict": "<High|Medium|Low>",
  "required_skills": [<list of strings>],
  "found_skills": [<list of strings>],
  "missing_skills": [<list of strings>],
  "feedback": "<string>"
}}

JOB DESCRIPTION:
{jd_text}

RESUME:
{resume_text}
[/INST]"""

def get_analysis_from_hf(jd_text: str, resume_text: str) -> dict:
    if not API_TOKEN:
        return {"error": "Hugging Face API token not found."}

    prompt = PROMPT_TEMPLATE.format(jd_text=jd_text, resume_text=resume_text)
    payload = {
        "inputs": prompt,
        "parameters": {"return_full_text": False, "max_new_tokens": 1500}
    }

    try:
        response = requests.post(MODEL_URL, headers=headers, json=payload, timeout=60)
        
        if response.status_code != 200:
            return {"error": f"HF API request failed: {response.text}", "status_code": response.status_code}

        data = response.json()

        # --- Original, simpler JSON extraction ---
        try:
            generated_text = data[0].get('generated_text', '')
            start_index = generated_text.find('{')
            end_index = generated_text.rfind('}')
            if start_index != -1 and end_index != -1:
                json_text = generated_text[start_index:end_index+1]
                parsed = json.loads(json_text)
            else:
                parsed = {}
        except (KeyError, IndexError, json.JSONDecodeError):
            parsed = {}

        # Always return complete schema with defaults
        return {
            "relevance_score": parsed.get("relevance_score", 0),
            "verdict": parsed.get("verdict", "Unknown"),
            "required_skills": parsed.get("required_skills", []),
            "found_skills": parsed.get("found_skills", []),
            "missing_skills": parsed.get("missing_skills", []),
            "feedback": parsed.get("feedback", "No feedback generated.")
        }

    except Exception as e:
        return {"error": f"An unexpected error occurred with the HF API call: {e}"}