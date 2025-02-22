from agents.price_prediction_agent import predict_ideal_price
from agents.resume_analysis_agent import rank_resumes

# Example usage of price prediction agent
current_price = 14.0  # Replace with the actual current price
predicted_price = predict_ideal_price(current_price)
print("Predicted Price:", predicted_price)

# Example usage of resume analysis agent
job_description = """
We are looking for a software engineer with expertise in Python, machine learning, and cloud computing.
The ideal candidate should have at least 3 years of experience and a strong background in data science.
"""
resume_folder = r"data\resumes"  # Use raw string to avoid escape sequence issues
results = rank_resumes(job_description, resume_folder)

# Print results
print("Top 3 Resumes:")
for resume in results["top_3_resumes"]:
    print(f"File: {resume[0]}, Relevance: {resume[1]}%, Summary: {resume[2]}")

print("\nHigh Relevance Resumes (>95%):")
for resume in results["high_resumes"]:
    print(f"File: {resume[0]}, Relevance: {resume[1]}%")

print("\nMid Relevance Resumes (50-80%):")
for resume in results["mid_resumes"]:
    print(f"File: {resume[0]}, Relevance: {resume[1]}%")
