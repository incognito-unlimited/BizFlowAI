from flask import Flask

def create_app():
    app = Flask(__name__)
    from .routes import job_routes, candidate_routes
    app.register_blueprint(job_routes.bp)
    app.register_blueprint(candidate_routes.bp)
    return app
