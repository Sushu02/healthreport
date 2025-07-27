# from pymongo import MongoClient
# from dotenv import load_dotenv
# import os

# load_dotenv()

# MONGO_URI = os.getenv("MONGO_CONNECT")
# MONGO_DB_NAME = os.getenv("MONGO_DB_NAME")
# MONGO_COLLECTION_NAME_1 = os.getenv("MONGO_COLLECTION_NAME_1")
# MONGO_COLLECTION_NAME_2 = os.getenv("MONGO_COLLECTION_NAME_2")

# client = MongoClient(MONGO_URI)
# db = client[MONGO_DB_NAME]

# def get_invoice_data(portal=None):
#     query = {}
#     if portal and portal.lower() != 'all':
#         query = {"portalName": portal}
#     return list(db[MONGO_COLLECTION_NAME_1].find(query, {"_id": 0}))

# def get_report_data(portal=None):
#     query = {}
#     if portal and portal.lower() != 'all':
#         query = {"portalName": portal}
#     return list(db[MONGO_COLLECTION_NAME_2].find(query, {"_id": 0}))

# def get_unique_portals():
#     coll1 = db[MONGO_COLLECTION_NAME_1].distinct("portalName")
#     coll2 = db[MONGO_COLLECTION_NAME_2].distinct("portalName")
#     return sorted(set(coll1 + coll2))



from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv(MONGO_URI)
client = MongoClient(MONGO_URI)
db = client["health_reports_db"]  # Change as needed

def get_invoice_health_data(portal: str = None):
    query = {}
    if portal:
        query["portal"] = portal
    return list(db.invoice_health.find(query))

def get_report_health_data(portal: str = None):
    query = {}
    if portal:
        query["portal"] = portal
    return list(db.report_health.find(query))
