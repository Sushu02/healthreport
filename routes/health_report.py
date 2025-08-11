from fastapi import APIRouter, Query
from services.mongo_service import get_invoice_health_data, get_report_health_data
from datetime import datetime, timedelta
from services.mongo_service import get_weekly_summary_data, get_unique_portals
# from fastapi import Body
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

@router.get("/invoice")
def invoice_health_summary(portal: str = Query(None)):
    data = get_invoice_health_data(portal)
    return {
        # "total": total,
        # "success": success,
        # "failed": failed,
        # "success_rate": round((success / total) * 100, 2) if total else 0,
        "data": data
    }

class PortalPayload(BaseModel):
    portal: Optional[str] = None

@router.post("/invoice")
def invoice_health_summary_post(payload: PortalPayload):
    data = get_invoice_health_data(payload.portal)
    # print(f"Received portal: {payload.portal} , data: {data}")
    return {"data": data}


@router.get("/report")
def report_health_summary(portal: str = Query(None)):
    data = get_report_health_data(portal)
    return {
        # "total": total,
        # "success": success,
        # "failed": failed,
        # "success_rate": round((success / total) * 100, 2) if total else 0,
        "data": data
    }

class PortalPayload(BaseModel):
    portal: Optional[str] = None

@router.post("/report")
def report_health_summary_post(payload: PortalPayload):
    data = get_report_health_data(payload.portal)
    # print(f"Received portal: {payload.portal} , data: {data}")
    return {"data": data}


@router.get("/weekly-trends")
def get_weekly_summary():
    return {"data": get_weekly_summary_data()}


@router.get("/api/portals")
def list_unique_portals():
    return {"portals": get_unique_portals()}
