# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from pymongo import MongoClient
# import os
# from dotenv import load_dotenv
# from services.mongo_service import get_weekly_trends_collection

# load_dotenv()
# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Allow all origins for development
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # MongoDB credentials from environment
# mongo_db_username = os.environ.get("MONGO_DB_USERNAME")
# mongo_db_password = os.environ.get("MONGO_DB_PASSWORD")

# # Connection string
# connection_string = (
#     f"mongodb://{mongo_db_username}:{mongo_db_password}"
#     "@mongodb.centralindia.cloudapp.azure.com/admin?"
#     "directConnection=true&serverSelectionTimeoutMS=5000&appName=mongosh+2.2.3"
# )

# client = MongoClient(connection_string)
# db = client['gstservice']
# collection = db['invoice_weekly_summary']  # Adjust if your collection name differs

# @app.get("/weekly-trends")
# def get_weekly_trends():
#     try:
#         data = []
#         cursor = collection.find({}, {"_id": 0})  # Exclude _id
#         for doc in cursor:
#             data.append(doc)
#         return data
#     except Exception as e:
#         return {"error": str(e)}




from fastapi import APIRouter
from services.mongo_service import get_weekly_summary_data

router = APIRouter()

@router.get("/weekly-trends")
def get_weekly_trends():
    try:
        data = get_weekly_summary_data()
        return {"message": "Weekly trends data fetched!", "data": data}
    except Exception as e:
        return {"error": str(e)}
