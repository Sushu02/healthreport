# # from fastapi import FastAPI , Query
# # from fastapi.middleware.cors import CORSMiddleware
# # from pymongo import MongoClient
# # from dotenv import load_dotenv
# # import os
# # from fastapi.responses import JSONResponse

# # load_dotenv()

# # app = FastAPI()

# # # CORS settings for frontend
# # app.add_middleware(
# #     CORSMiddleware,
# #     allow_origins=["http://localhost:3000"],
# #     allow_credentials=True,
# #     allow_methods=["*"],
# #     allow_headers=["*"],
# # )

# # # MongoDB config
# # MONGO_URI = os.getenv("MONGO_CONNECT")
# # MONGO_DB_NAME = os.getenv("MONGO_DB_NAME")
# # MONGO_COLLECTION_NAME_1 = os.getenv("MONGO_COLLECTION_NAME_1")
# # MONGO_COLLECTION_NAME_2 = os.getenv("MONGO_COLLECTION_NAME_2")
# # client = MongoClient(MONGO_URI)
# # db = client[MONGO_DB_NAME]


# # # ✅ 1. Invoice Report Endpoint
# # @app.get("/invoice-health")
# # def get_invoice_data(portal: str = Query(None)):
# #     collection = db[MONGO_COLLECTION_NAME_1]

# #     query = {}
# #     if portal and portal.lower() != 'all':
# #         query = {"portalName": portal}  # <- updated key

# #     data = list(collection.find(query, {"_id": 0}))
# #     return JSONResponse(content=data)

# # # ✅ 2. Excel Report Endpoint
# # @app.get("/report-health")
# # def get_excel_data(portal: str = Query(None)):
# #     collection = db[MONGO_COLLECTION_NAME_2]

# #     query = {}
# #     if portal and portal.lower() != 'all':
# #         query = {"portalName": portal}  # <- updated key

# #     data = list(collection.find(query, {"_id": 0}))
# #     return JSONResponse(content=data)

# # # ✅ 3. Unique Portal List
# # @app.get("/portals")
# # def get_unique_portals():
# #     coll1_portals = db[MONGO_COLLECTION_NAME_1].distinct("portalName")  # <- updated key
# #     coll2_portals = db[MONGO_COLLECTION_NAME_2].distinct("portalName")  # <- updated key
# #     all_portals = sorted(set(coll1_portals + coll2_portals))
# #     return JSONResponse(content={"portals": all_portals})


# from fastapi import FastAPI, Query
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.responses import JSONResponse
# from mongo_service import get_invoice_data, get_report_data, get_unique_portals

# app = FastAPI()

# # CORS setup
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# @app.get("/invoice-health")
# def invoice_health(portal: str = Query(None)):
#     return JSONResponse(content=get_invoice_data(portal))

# @app.get("/report-health")
# def report_health(portal: str = Query(None)):
#     return JSONResponse(content=get_report_data(portal))

# @app.get("/portals")
# def get_portals():
#     return JSONResponse(content={"portals": get_unique_portals()})



from fastapi import FastAPI
from routes.health_report import router as health_report_router
from fastapi.middleware.cors import CORSMiddleware
from routes.health_report import router as health_report_router

app = FastAPI()

# Optional: CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health routes
app.include_router(health_report_router, prefix="/api/health", tags=["Health Report"])

@app.get("/")
def read_root():
    return {"message": "Invoice Health Checkup API Running"}
