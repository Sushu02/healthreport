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
mongo_db_username = os.environ.get("MONGO_DB_USERNAME")
mongo_db_password = os.environ.get("MONGO_DB_PASSWORD")
MONGO_COLLECTION_NAME_1 = os.getenv("MONGO_COLLECTION_NAME_1")
MONGO_COLLECTION_NAME_2 = os.getenv("MONGO_COLLECTION_NAME_2")

connection_string = os.getenv("connection_string")
client = MongoClient(connection_string)
db = client['gstservice']

# def get_invoice_health_data(portal=None):
#     query = {}
#     if portal and portal.lower() != 'all':
#         query = {"portalName": portal}
#     return list(db[MONGO_COLLECTION_NAME_1].find(query, {"_id": 0}))


PORTAL_MAP = {
    "mmt": "MakeMyTrip",
    "makemytrip": "MakeMyTrip",
    "make my trip": "MakeMyTrip",
    "myyatra": "Yatra",
    "pyt": "Pickyourtrail",
    "pickyourtrail": "Pickyourtrail",
}

def get_invoice_health_data(portal=None):
    query = {}
    if portal and portal.lower() != 'all data':
        normalized_portal = PORTAL_MAP.get(portal.lower(), portal)
        query = {"portalName": {"$regex": f"^{normalized_portal}$", "$options": "i"}}
    return list(db[MONGO_COLLECTION_NAME_1].find(query, {"_id": 0}))


def get_report_health_data(portal=None):
    query = {}
    if portal and portal.lower() != 'all data':
        normalized_portal = PORTAL_MAP.get(portal.lower(), portal)
        query = {"portalName": {"$regex": f"^{normalized_portal}$", "$options": "i"}}
    return list(db[MONGO_COLLECTION_NAME_2].find(query, {"_id": 0}))

# def get_unique_portals():
#     coll1 = db[MONGO_COLLECTION_NAME_1].distinct("portalName")
#     coll2 = db[MONGO_COLLECTION_NAME_2].distinct("portalName")
#     return sorted(set(coll1 + coll2))


# Collection references
WEEKLY_SUMMARY_COLLECTION = db['invoice_weekly_summary']

def get_weekly_summary_data(run_type: str = None):
    """
    Fetch weekly summary data from MongoDB.
    If run_type is provided, filter data accordingly.
    """
    query = {}
    if run_type:
        query["run_type"] = run_type  # make sure this field exists in your collection

    data = list(WEEKLY_SUMMARY_COLLECTION.find(query, {"_id": 0}))
    return data


def get_unique_portals():
    # Portal alias mapping (all keys in lowercase)
    alias_map = {
        "mmt": "MakeMyTrip",
        "makemytrip": "MakeMyTrip",
        "make my trip": "MakeMyTrip",
        "myyatra": "Yatra",
        "PYT":"Pickyourtrail",
        "Pyt":"Pickyourtrail",
        "pyt": "Pickyourtrail",
        "pickyourtrail": "Pickyourtrail"
    }

    coll1 = db[MONGO_COLLECTION_NAME_1].distinct("portalName")
    coll2 = db[MONGO_COLLECTION_NAME_2].distinct("portalName")

    cleaned_portals = set()

    for p in (coll1 + coll2):
        if not p or not isinstance(p, str) or not p.strip():
            continue  # skip None/empty

        p_clean = p.strip().lower()  # normalize for matching

        # Apply alias mapping
        if p_clean in alias_map:
            cleaned_portals.add(alias_map[p_clean])
        else:
            # Keep original name but unify case for known portals
            cleaned_portals.add(p.strip().title())

    return sorted(cleaned_portals)



