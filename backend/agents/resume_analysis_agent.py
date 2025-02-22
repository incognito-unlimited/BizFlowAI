import os
import time
from dotenv import load_dotenv
import PyPDF2
from groq import Groq
from utils.pdf_extractor import extract_text_from_pdf

# Load environment variables from .env file
load_dotenv()

# Load API key from environment variables for security
api_key = os.getenv("GROQ_API_KEY")
if not api_key:
    raise ValueError("GROQ_API_KEY environment variable not set.")

# Initialize Groq client
client = Groq(api_key=api_key)

# Function to analyze a resume and calculate relevance score
def analyze_resume(job_description, resume_text):
    prompt = f"""
    You are an AI agent trained to analyze resumes and calculate their relevance to a job description.
    Job Description:
    {job_description}

    Resume Text:
    {resume_text}

    Task:
    1. Analyze the resume for skills, accomplishments, summary, experience, education, certifications, and publications.
    2. Calculate a relevance score (0-100%) based on how well the resume matches the job description.
    3. Provide a brief summary of the resume's relevance to the job description.
    4. Return the relevance score and summary in the following format:
       - Relevance Score: <score>%
       - Summary: <summary>
    - Do not include any additional text, explanations, or reasoning.
    """

    # Prepare the messages for the Groq API
    messages = [
        {"role": "system", "content": "You are an AI agent specialized in resume analysis and job matching. Your response must strictly follow the format: Relevance Score: <score>%, Summary: <summary>."},
        {"role": "user", "content": prompt}
    ]

    # Generate the analysis
    try:
        completion = client.chat.completions.create(
            model="qwen-2.5-32b",  # Use the correct model name
            messages=messages,
            temperature=0.7,  # Lower temperature for more deterministic output
            max_tokens=256,  # Limit response length
            top_p=0.9,  # Balance between exploration and exploitation
            stream=False,  # Disable streaming for simplicity
            stop=None,  # No specific stop sequence
        )

        # Extract and return the relevance score and summary
        response = completion.choices[0].message.content.strip()

        # Parse the response
        try:
            relevance_score = int(response.split("Relevance Score: ")[1].split("%")[0])
            summary = response.split("Summary: ")[1].strip()
        except (IndexError, ValueError):
            # Handle cases where the response does not match the expected format
            print(f"Error parsing response: {response}")
            relevance_score = 0  # Default score if parsing fails
            summary = "Unable to parse summary from the response."

        return relevance_score, summary

    except Exception as e:
        # Handle rate limit errors
        if "Rate limit reached" in str(e):
            print("Rate limit reached. Waiting for 5 minutes before retrying...")
            time.sleep(300)  # Wait for 5 minutes
            return analyze_resume(job_description, resume_text)  # Retry the request
        else:
            raise e

# Function to rank resumes in a folder
def rank_resumes(job_description, resume_folder, batch_size=50):
    # Lists to store results
    top_resumes = []  # Resumes with 80-95% relevance
    high_resumes = []  # Resumes with >95% relevance
    mid_resumes = []  # Resumes with 50-80% relevance

    # Get list of PDF files in the folder
    pdf_files = [f for f in os.listdir(resume_folder) if f.endswith(".pdf")]

    # Process resumes in batches
    for i in range(0, len(pdf_files), batch_size):
        batch = pdf_files[i:i + batch_size]
        for filename in batch:
            pdf_path = os.path.join(resume_folder, filename)
            resume_text = extract_text_from_pdf(pdf_path)

            # Analyze the resume
            relevance_score, summary = analyze_resume(job_description, resume_text)

            # Categorize the resume based on relevance score
            if relevance_score > 95:
                high_resumes.append((filename, relevance_score, summary))
            elif 80 <= relevance_score <= 95:
                top_resumes.append((filename, relevance_score, summary))
            elif 50 <= relevance_score < 80:
                mid_resumes.append((filename, relevance_score, summary))

    # Sort top resumes by relevance score (descending order)
    top_resumes.sort(key=lambda x: x[1], reverse=True)

    # Return the top 3 resumes and categorized lists
    return {
        "top_3_resumes": top_resumes[:3],
        "high_resumes": high_resumes,
        "mid_resumes": mid_resumes
    }
