# ⚡ Resume-AI: Smart Hiring, Instantly ⚡

### 🏆 Submission for [Name of Hackathon]

**Tired of sifting through hundreds of resumes? Resume-AI uses the power of Large Language Models to screen, analyze, and score candidates in seconds, not hours.**

![dashboard_image (3)](https://github.com/user-attachments/assets/5296e4c2-0e7e-4b57-aafd-b6d74500f4aa)
![dashboard_image (4)](https://github.com/user-attachments/assets/71926067-fdae-44ca-a560-303e2246c726)
![dashboard_image (5)](https://github.com/user-attachments/assets/fe48120f-8b0f-4c29-9aec-b75a42886259)
![dashboard_image (2)](https://github.com/user-attachments/assets/3643bd3b-a9f0-4643-afda-b25158d475ab)


---

## 🤯 The Problem: The "Resume Black Hole"

Recruiters and hiring managers are overwhelmed. A single job opening can attract over 250 applications, leading to:
* **Hours Wasted:** Manually screening resumes is slow and inefficient.
* **Bias & Inconsistency:** Human screening can be subjective and prone to error.
* **Missed Talent:** Great candidates get overlooked in the flood of applications.

This broken process costs companies time, money, and top-tier talent.

## ✨ Our Solution: Resume-AI

Resume-AI is a web platform that acts as an intelligent co-pilot for hiring teams. By simply uploading a job description and a batch of resumes, our application leverages the **Mixtral 8x7B LLM** to provide a deep, contextual analysis for each candidate.

We go beyond simple keyword matching to understand the *nuance* of a candidate's experience, delivering a clear, data-driven summary that helps recruiters identify the best fits instantly.

---

## 🛠️ Tech Stack & Architecture

We chose a modern, scalable stack to build this powerful application over the hackathon weekend.

| Area          | Technology                                                                                                                                                             |
| :------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Backend** | **Python**, **FastAPI** (for a high-performance, scalable API)                                                                                                         |
| **AI/ML** | **Hugging Face Inference API** (running `mistralai/Mixtral-8x7B-Instruct-v0.1` for SOTA analysis)                                                                       |
| **Frontend** | **Next.js**, **React**, **TypeScript**, **Tailwind CSS**, **Shadcn/UI** (for a fully-responsive, modern UI)                                                              |
| **UI Prototyping** | **Gradio** (embedded directly in FastAPI for rapid testing and demos)                                                                                                |
| **Core Libs** | **PyMuPDF** (for robust PDF text extraction), **Pantic** (for data validation)                                                                                       |

---

## 🔥 Key Features Built During the Hackathon

* **PDF Upload:** Seamlessly upload multiple resumes and a single job description.
* **AI-Powered Analysis:** For each resume, the app generates:
    * A **Relevance Score (%)** for an at-a-glance comparison.
    * **Skill Gap Analysis:** A clear breakdown of required, found, and missing skills.
    * **Qualitative Feedback:** A concise, AI-generated summary of the candidate's strengths and weaknesses.
* **Intuitive Dashboard:** A clean, responsive interface to view and compare candidate results.
* **Robust API:** A well-documented FastAPI endpoint for potential integration with other systems.

---

## 🏃 Our Hackathon Journey

* **Challenge Accepted:** The main challenge was reliably parsing the unstructured JSON output from the LLM. We solved this by refining our prompt and implementing a robust regex-based extraction with a fallback mechanism, ensuring the UI never breaks.
* **What's Next:** We're just getting started!
    * **ATS Integration:** Connect directly with platforms like Greenhouse or Lever.
    * **Batch Analysis View:** A "Top Candidates" view to compare all uploaded resumes on a single screen.
    * **Custom Model Fine-tuning:** Fine-tune a smaller, specialized model to reduce API costs and improve accuracy for specific industries.

---

## ⚙️ How to Run It Locally

1.  **Clone the Repo**
    ```bash
    git clone [https://github.com/your-username/resume-ai.git](https://github.com/your-username/resume-ai.git)
    cd resume-ai
    ```

2.  **Setup the Backend**
    ```bash
    # Create and activate virtual environment
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate

    # Install dependencies
    pip install -r requirements.txt

    # Add your Hugging Face key to a new .env file
    echo "HUGGINGFACE_API_TOKEN=hf_YourSecretToken" > .env

    # Run the server!
    uvicorn main:app --reload
    ```
    Backend is now running at `http://127.0.0.1:8000`.

3.  **Setup the Frontend** (in a new terminal)
    ```bash
    # Navigate to the dashboard folder (adjust if needed)
    cd dashboard

    # Install dependencies
    npm install

    # Run the dev server
    npm run dev
    ```
    Dashboard is now live at `http://localhost:3000`.

---

**Built with ❤️ by 404 Found for the Code4Edtech Challenge by Innomatics Research Labs.**
