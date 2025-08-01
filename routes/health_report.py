from fastapi import APIRouter, Query
from services.mongo_service import get_invoice_health_data, get_report_health_data
from datetime import datetime, timedelta
from services.mongo_service import get_weekly_summary_data


router = APIRouter()

@router.get("/invoice")
def invoice_health_summary(portal: str = Query(None)):
    data = get_invoice_health_data(portal)
    total = len(data)
    success = len([d for d in data if d.get("status") == "Success"])
    failed = len([d for d in data if d.get("status") == "Failed"])
    return {
        # "total": total,
        # "success": success,
        # "failed": failed,
        # "success_rate": round((success / total) * 100, 2) if total else 0,
        "data": data
    }

@router.get("/report")
def report_health_summary(portal: str = Query(None)):
    data = get_report_health_data(portal)
    total = len(data)
    success = len([d for d in data if d.get("status") == "Success"])
    failed = len([d for d in data if d.get("status") == "Failed"])
    return {
        # "total": total,
        # "success": success,
        # "failed": failed,
        # "success_rate": round((success / total) * 100, 2) if total else 0,
        "data": data
    }

@router.get("/weekly-trends")
def get_weekly_summary():
    return {"data": get_weekly_summary_data()}