from flask import Blueprint, request, jsonify
from ..models.matching_algorithm import match_candidates

bp = Blueprint('job_routes', __name__)

@bp.route('/match_candidates', methods=['POST'])
def match_candidates_route():
    data = request.json
    matches = match_candidates(data['job_description'], data['candidate_profiles'])
    return jsonify(matches)
