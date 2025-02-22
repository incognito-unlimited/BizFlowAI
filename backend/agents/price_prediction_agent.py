import os
import pandas as pd
from groq import Groq
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Load API key from environment variables for security
api_key = os.getenv("GROQ_API_KEY")
if not api_key:
    raise ValueError("GROQ_API_KEY environment variable not set.")

# Initialize Groq client
client = Groq(api_key=api_key)

# Function to predict the ideal price
def predict_ideal_price(current_price):
    # Load historical data from a CSV file
    historical_data = pd.read_csv("data/soapnutshistory.csv")

    # Define the prompt for price prediction
    prompt = """
    You are an AI agent trained to predict the ideal price for a product tomorrow using historical data.
    The goal is to maximize sales while balancing exploration (testing new price points) and exploitation (leveraging historical data).

    Historical Data:
    {historical_data}

    Current Price: ${current_price}

    Task:
    1. Predict the ideal price for tomorrow.
    2. Ensure the price is higher than the historical median price to encourage exploration.
    3. Maximize sales and conversion rates (organic and ad).
    4. Avoid getting stuck in historical median values.

    Output Format:
    - Only provide the predicted price in the format: $<predicted_price>
    - Do not include any additional text, explanations, or reasoning.
    """

    # Prepare the historical data for the prompt
    historical_data_str = historical_data.to_string()

    # Prepare the messages for the Groq API
    messages = [
        {"role": "system", "content": "You are an AI agent specialized in price prediction. Your response must ONLY contain the predicted price in the format: $<predicted_price>."},
        {"role": "user", "content": prompt.format(historical_data=historical_data_str, current_price=current_price)}
    ]

    # Generate the price prediction
    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",  # Use the correct model name
        messages=messages,
        temperature=0.7,  # Lower temperature for more deterministic output
        max_tokens=10,  # Strictly limit response length
        top_p=0.9,  # Balance between exploration and exploitation
        stream=False,  # Disable streaming for simplicity
        stop=None,  # No specific stop sequence
    )

    # Extract and return the predicted price
    prediction = completion.choices[0].message.content.strip()
    return prediction
