import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    APP_NAME: str = "HealthOS"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = os.getenv("DEBUG", "True").lower() == "true"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-here")

settings = Settings()
