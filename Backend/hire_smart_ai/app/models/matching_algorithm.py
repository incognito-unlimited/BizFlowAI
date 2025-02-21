from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd

def match_candidates(job_description, candidate_profiles):
    vectorizer = TfidfVectorizer()
    job_vec = vectorizer.fit_transform([job_description])
    candidate_vecs = vectorizer.transform(candidate_profiles)
    similarity_matrix = cosine_similarity(job_vec, candidate_vecs)
    return similarity_matrix.tolist()
