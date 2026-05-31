from fastapi import APIRouter

router = APIRouter()

@router.get("/test")
def health_test():
    return {
        "status": "ok",
        "message": "HealthOS backend is running successfully",
    }
