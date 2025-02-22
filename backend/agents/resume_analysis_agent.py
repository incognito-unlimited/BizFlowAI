import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
import PyPDF2
from groq import Groq

# Load environment variables from .env file
load_dotenv()

# Debugging: Print environment variables
print("Environment Variables:")
print(f"GROQ_API_KEY: {'***' if os.getenv('GROQ_API_KEY') else 'Not Set'}")
print(f"EMAIL_ADDRESS: {'***' if os.getenv('EMAIL_ADDRESS') else 'Not Set'}")
print(f"EMAIL_PASSWORD: {'***' if os.getenv('EMAIL_PASSWORD') else 'Not Set'}")

# Load API key from environment variables for security
api_key = os.getenv("GROQ_API_KEY")
if not api_key:
    raise ValueError("GROQ_API_KEY environment variable not set.")

# Initialize Groq client
client = Groq(api_key=api_key)

# Email credentials (use environment variables for security)
email_address = os.getenv("EMAIL_ADDRESS")
email_password = os.getenv("EMAIL_PASSWORD")
if not email_address or not email_password:
    raise ValueError("Email credentials not set in environment variables.")

# Function to extract text from a PDF file
def extract_text_from_pdf(pdf_path):
    print(f"Extracting text from: {pdf_path}")
    with open(pdf_path, "rb") as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
    return text

# Function to analyze a resume and calculate relevance score
def analyze_resume(job_description, resume_text):
    print("Analyzing resume...")
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
    print(f"API Response: {response}")

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

# Function to generate detailed rejection email content
def generate_rejection_email_content(job_description, resume_text):
    print("Generating rejection email content...")
    prompt = f"""
    You are an AI agent trained to provide detailed feedback to candidates who were not selected for a job role.
    Job Description:
    {job_description}

    Resume Text:
    {resume_text}

    Task:
    1. Analyze the resume and identify specific areas where the candidate fell short.
    2. Provide detailed feedback on what went wrong with the resume.
    3. Offer actionable suggestions for how the candidate can improve their skills and resume to be better suited for this role.
    4. Return the feedback in the following format:
       - Reasons for Rejection: <detailed_reasons>
       - Suggestions for Improvement: <detailed_suggestions>
    """

    # Prepare the messages for the Groq API
    messages = [
        {"role": "system", "content": "You are an AI agent specialized in providing detailed feedback to candidates. Your response must strictly follow the format: Reasons for Rejection: <detailed_reasons>, Suggestions for Improvement: <detailed_suggestions>."},
        {"role": "user", "content": prompt}
    ]

    # Generate the feedback
    completion = client.chat.completions.create(
        model="qwen-2.5-32b",  # Use the correct model name
        messages=messages,
        temperature=0.8,  # Slightly higher temperature for more creative output
        max_tokens=512,  # Allow more tokens for detailed feedback
        top_p=0.9,  # Balance between exploration and exploitation
        stream=False,  # Disable streaming for simplicity
        stop=None,  # No specific stop sequence
    )

    # Extract and return the feedback
    response = completion.choices[0].message.content.strip()
    print(f"API Response: {response}")

    # Parse the response
    try:
        reasons = response.split("Reasons for Rejection: ")[1].split(", Suggestions for Improvement: ")[0]
        suggestions = response.split("Suggestions for Improvement: ")[1]
    except (IndexError, ValueError):
        # Handle cases where the response does not match the expected format
        print(f"Error parsing response: {response}")
        reasons = "Unable to parse reasons for rejection."
        suggestions = "Unable to parse suggestions for improvement."

    return reasons, suggestions

# Function to send a rejection email
def send_rejection_email(candidate_email, reasons, suggestions):
    print(f"Sending rejection email to: {candidate_email}")
    # Create the email content
    subject = "Application Status Update"
    body = f"""
    Dear Candidate,

    Thank you for applying for the role. After careful consideration, we regret to inform you that your application was not selected for further processing.

    **Reasons for Rejection:**
    {reasons}

    **Suggestions for Improvement:**
    {suggestions}

    We encourage you to apply for future roles that match your skills and experience.

    Best regards,
    The Hiring Team
    """

    # Create the email message
    msg = MIMEMultipart()
    msg["From"] = email_address
    msg["To"] = candidate_email
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "plain"))

    # Send the email
    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(email_address, email_password)
            server.sendmail(email_address, candidate_email, msg.as_string())
        print(f"Rejection email sent to {candidate_email}")
    except Exception as e:
        print(f"Failed to send email to {candidate_email}: {e}")

# Function to send a selection email
def send_selection_email(candidate_email, resume_filename, relevance_score, summary):
    print(f"Sending selection email to: {candidate_email}")
    # Create the email content
    subject = "Interview Selection Notification"
    body = f"""
    Dear Candidate,

    We are pleased to inform you that your application for the role has been shortlisted for an interview.

    **Resume Details:**
    - File: {resume_filename}
    - Relevance Score: {relevance_score}%
    - Summary: {summary}

    Our team will contact you shortly to schedule the interview. Please ensure your availability.

    Best regards,
    The Hiring Team
    """

    # Create the email message
    msg = MIMEMultipart()
    msg["From"] = email_address
    msg["To"] = candidate_email
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "plain"))

    # Send the email
    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(email_address, email_password)
            server.sendmail(email_address, candidate_email, msg.as_string())
        print(f"Selection email sent to {candidate_email}")
    except Exception as e:
        print(f"Failed to send email to {candidate_email}: {e}")

# Function to rank resumes in a folder
def rank_resumes(job_description, resume_folder, candidate_emails):
    print(f"Processing resumes in folder: {resume_folder}")
    # Lists to store results
    top_resumes = []  # Resumes with 80-95% relevance
    high_resumes = []  # Resumes with >95% relevance
    mid_resumes = []  # Resumes with 50-80% relevance

    # Iterate through all PDF files in the folder
    for filename, candidate_email in zip(os.listdir(resume_folder), candidate_emails):
        if filename.endswith(".pdf"):
            pdf_path = os.path.join(resume_folder, filename)
            resume_text = extract_text_from_pdf(pdf_path)

            # Analyze the resume
            relevance_score, summary = analyze_resume(job_description, resume_text)

            # Categorize the resume based on relevance score
            if relevance_score > 95:
                high_resumes.append((filename, relevance_score, summary, candidate_email))
            elif 80 <= relevance_score <= 95:
                top_resumes.append((filename, relevance_score, summary, candidate_email))
            elif 50 <= relevance_score < 80:
                mid_resumes.append((filename, relevance_score, summary, candidate_email))

    # Sort top resumes by relevance score (descending order)
    top_resumes.sort(key=lambda x: x[1], reverse=True)
    high_resumes.sort(key=lambda x: x[1], reverse=True)

    # Save selected resumes to a text file
    with open("selected_resumes.txt", "w") as file:
        file.write("Top 3 Resumes:\n")
        for resume in top_resumes[:3]:
            file.write(f"{resume[0]}, {resume[1]}%, {resume[2]}, {resume[3]}\n")
        file.write("\nHigh Relevance Resumes:\n")
        for resume in high_resumes:
            file.write(f"{resume[0]}, {resume[1]}%, {resume[2]}, {resume[3]}\n")

    # Send selection emails to top 3 and high relevance candidates
    for resume in top_resumes[:3] + high_resumes:
        send_selection_email(resume[3], resume[0], resume[1], resume[2])

    # Send rejection emails to mid-relevance candidates
    for resume in mid_resumes:
        pdf_path = os.path.join(resume_folder, resume[0])
        resume_text = extract_text_from_pdf(pdf_path)
        reasons, suggestions = generate_rejection_email_content(job_description, resume_text)
        send_rejection_email(resume[3], reasons, suggestions)

# Example usage
job_description = """
We are looking for a software engineer with expertise in Python, machine learning, and cloud computing.
The ideal candidate should have at least 3 years of experience and a strong background in data science.
"""

resume_folder = r"test data"  # Use raw string to avoid escape sequence issues
candidate_emails = [
    "yagsduigasyifgvyhusavbh@gmail.com",
    "dewanshshekharsingh@gmail.com",
    "yagsduigasyifgvyhusavbh@gmail.com",
    "yagsduigasyifgvyhusavbh@gmail.com",
    "yagsduigasyifgvyhusavbh@gmail.com",
    "yagsduigasyifgvyhusavbh@gmail.com",
    "aditeymehra.id@gmail.com",
    "yagsduigasyifgvyhusavbh@gmail.com",
    "yagsduigasyifgvyhusavbh@gmail.com",
    "yagsduigasyifgvyhusavbh@gmail.com",
    "chiragcodes0@gmail.com",
    "yagsduigasyifgvyhusavbh@gmail.com"
]

rank_resumes(job_description, resume_folder, candidate_emails)
