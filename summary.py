# from pymongo import MongoClient
# from datetime import datetime, timedelta, timezone
# import os
# from dotenv import load_dotenv

# load_dotenv()

# # MongoDB connection
# mongo_db_username = os.environ.get("MONGO_DB_USERNAME")
# mongo_db_password = os.environ.get("MONGO_DB_PASSWORD")

# connection_string = (
#     f"mongodb://{mongo_db_username}:{mongo_db_password}"
#     "@mongodb.centralindia.cloudapp.azure.com/admin?"
#     "directConnection=true&serverSelectionTimeoutMS=5000&appName=mongosh+2.2.3"
# )

# client = MongoClient(connection_string)
# db = client["gstservice"]
# source_collection = db["selenium-summary-report"]

# # Get yesterday's date range
# yesterday = (datetime.now(timezone.utc) - timedelta(days=1)).date()
# print("Yesterday's date:", yesterday)
# start_date = datetime.combine(yesterday, datetime.min.time())
# end_date = datetime.combine(yesterday + timedelta(days=1), datetime.min.time())


# # Initialize summary dictionary
# summary = {}

# # Helper to parse both datetime formats
# def parse_date(date_str):
#     for fmt in ("%d-%b-%Y %I:%M %p", "%Y-%m-%d"):
#         try:
#             return datetime.strptime(date_str, fmt)
#         except (ValueError, TypeError):
#             continue
#     return None

# # Iterate documents
# for doc in source_collection.find({}, {
#     "portalName": 1,
#     "invoice_initialization_date_time": 1,
#     "TestStausAsPerInvCount": 1,
#     "TestStausAsPerInvTime": 1
# }):
#     raw_date = doc.get("invoice_initialization_date_time")
#     parsed_date = parse_date(raw_date)
    
#     if not parsed_date:
#         continue

#     if parsed_date.date() != yesterday:
#         continue

#     portal = doc.get("portalName", "Unknown")
#     run_type = "Morning" if parsed_date.hour < 12 else "Afternoon"
#     key = (portal, run_type)

#     if key not in summary:
#         summary[key] = {
#             "count": 0,
#             "last_run": parsed_date,
#             "TestStausAsPerInvCount": set(),
#             "TestStausAsPerInvTime": set()
#         }

#     summary[key]["count"] += 1
#     if parsed_date > summary[key]["last_run"]:
#         summary[key]["last_run"] = parsed_date

#     # Add status values safely
#     inv_count = doc.get("TestStausAsPerInvCount")
#     inv_time = doc.get("TestStausAsPerInvTime")

#     if inv_count:
#         summary[key]["TestStausAsPerInvCount"].add(inv_count)
#     if inv_time:
#         summary[key]["TestStausAsPerInvTime"].add(inv_time)

# # Print the summary
# for (portal, run_type), data in summary.items():
#     print(
#         f"{portal} - {run_type}: {data['count']} invoices, "
#         f"last run at {data['last_run'].strftime('%Y-%m-%d %I:%M %p')}, "
#         f"InvCount Statuses: {list(data['TestStausAsPerInvCount'])}, "
#         f"InvTime Statuses: {list(data['TestStausAsPerInvTime'])}"
#     )



# YESTERDAY's # SUMMARY REPORT GENERATION SCRIPT

# from pymongo import MongoClient
# from datetime import datetime, timedelta, timezone
# import os
# from dotenv import load_dotenv

# load_dotenv()

# # MongoDB connection
# mongo_db_username = os.environ.get("MONGO_DB_USERNAME")
# mongo_db_password = os.environ.get("MONGO_DB_PASSWORD")

# connection_string = (
#     f"mongodb://{mongo_db_username}:{mongo_db_password}"
#     "@mongodb.centralindia.cloudapp.azure.com/admin?"
#     "directConnection=true&serverSelectionTimeoutMS=5000&appName=mongosh+2.2.3"
# )

# client = MongoClient(connection_string)
# db = client["gstservice"]
# source_collection = db["selenium-summary-report"]
# summary_collection = db["invoice_weekly_summary"]  # ✅ Store summaries here

# # Get yesterday's date
# yesterday = (datetime.now(timezone.utc) - timedelta(days=1)).date()
# print("Yesterday's date:", yesterday)
# start_date = datetime.combine(yesterday, datetime.min.time())
# end_date = datetime.combine(yesterday + timedelta(days=1), datetime.min.time())

# # Initialize summary dictionary
# summary = {}

# # Helper to parse datetime strings
# def parse_date(date_str):
#     for fmt in ("%d-%b-%Y %I:%M %p", "%Y-%m-%d"):
#         try:
#             return datetime.strptime(date_str, fmt)
#         except (ValueError, TypeError):
#             continue
#     return None

# # Read and categorize documents
# for doc in source_collection.find({}, {
#     "portalName": 1,
#     "invoice_initialization_date_time": 1,
#     "TestStausAsPerInvCount": 1,
#     "TestStausAsPerInvTime": 1
# }):
#     raw_date = doc.get("invoice_initialization_date_time")
#     parsed_date = parse_date(raw_date)
    
#     if not parsed_date or parsed_date.date() != yesterday:
#         continue

#     portal = doc.get("portalName", "Unknown")
#     run_type = "Morning" if parsed_date.hour < 12 else "Afternoon"
#     key = (portal, run_type)

#     if key not in summary:
#         summary[key] = {
#             "count": 0,
#             "last_run": parsed_date,
#             "TestStausAsPerInvCount": set(),
#             "TestStausAsPerInvTime": set()
#         }

#     summary[key]["count"] += 1
#     if parsed_date > summary[key]["last_run"]:
#         summary[key]["last_run"] = parsed_date

#     # Add status values
#     inv_count = doc.get("TestStausAsPerInvCount")
#     inv_time = doc.get("TestStausAsPerInvTime")
#     if inv_count:
#         summary[key]["TestStausAsPerInvCount"].add(inv_count)
#     if inv_time:
#         summary[key]["TestStausAsPerInvTime"].add(inv_time)

# # Save and print summary to 'invoice_weekly_summary'
# for (portal, run_type), data in summary.items():
#     doc_to_insert = {
#         "portalName": portal,
#         "run_type": run_type,
#         "date": yesterday.strftime("%Y-%m-%d"),
#         "TestStausAsPerInvCount": list(data["TestStausAsPerInvCount"]),
#         "TestStausAsPerInvTime": list(data["TestStausAsPerInvTime"]),
#         "created_at": datetime.now(timezone.utc)
#     }

#     summary_collection.insert_one(doc_to_insert)  # ✅ Inserting into new collection

#     print(
#         f"{portal} - {run_type}: {data['count']} invoices, "
#         f"last run at {data['last_run'].strftime('%Y-%m-%d %I:%M %p')}, "
#         f"InvCount Statuses: {list(data['TestStausAsPerInvCount'])}, "
#         f"InvTime Statuses: {list(data['TestStausAsPerInvTime'])}"
#     )



# WEEKLY SUMMARY REPORT GENERATION SCRIPT

from pymongo import MongoClient
from datetime import datetime, timedelta, timezone
import os
from dotenv import load_dotenv

load_dotenv()

# MongoDB connection
mongo_db_username = os.environ.get("MONGO_DB_USERNAME")
mongo_db_password = os.environ.get("MONGO_DB_PASSWORD")

connection_string = (
    f"mongodb://{mongo_db_username}:{mongo_db_password}"
    "@mongodb.centralindia.cloudapp.azure.com/admin?"
    "directConnection=true&serverSelectionTimeoutMS=5000&appName=mongosh+2.2.3"
)

client = MongoClient(connection_string)
db = client["gstservice"]
source_collection = db["selenium-summary-report"]
summary_collection = db["invoice_weekly_summary"]  # Weekly summary target

# Date range: Last 7 days (excluding today)
today = datetime.now(timezone.utc).date()
start_date = today - timedelta(days=7)
end_date = today

print(f"📆 Weekly Summary Date Range: {start_date} to {end_date - timedelta(days=1)}")

# Initialize summary dictionary
summary = {}

# Date parser
def parse_date(date_str):
    if isinstance(date_str, datetime):
        return date_str
    for fmt in ("%d-%b-%Y %I:%M %p", "%Y-%m-%d"):
        try:
            return datetime.strptime(date_str, fmt)
        except (ValueError, TypeError):
            continue
    return None

# Fetch and group documents
for doc in source_collection.find({}, {
    "portalName": 1,
    "invoice_initialization_date_time": 1,
    "TestStausAsPerInvTime": 1,
    "perInvoiceDownloadTimeBasedOnDB" : 1
}):
    raw_date = doc.get("invoice_initialization_date_time")
    parsed_date = parse_date(raw_date)
    
    if not parsed_date:
        continue

    parsed_date = parsed_date.replace(tzinfo=timezone.utc)
    if not (start_date <= parsed_date.date() < end_date):
        continue

    date_str = parsed_date.date().isoformat()
    portal = doc.get("portalName", "Unknown")
    run_type = "Morning" if parsed_date.hour < 12 else "Afternoon"
    key = (portal, run_type, date_str)

    if key not in summary:
        summary[key] = {
            "count": 0,
            "last_run": parsed_date,
            "TestStausAsPerInvTime": set(),
            "perInvoiceDownloadTimeBasedOnDB" : set()
        }

    summary[key]["count"] += 1
    if parsed_date > summary[key]["last_run"]:
        summary[key]["last_run"] = parsed_date


    inv_time_result = doc.get("TestStausAsPerInvTime")
    inv_time = doc.get("perInvoiceDownloadTimeBasedOnDB")

    if inv_time:
        summary[key]["perInvoiceDownloadTimeBasedOnDB"].add(inv_time)
    if inv_time_result:
        summary[key]["TestStausAsPerInvTime"].add(inv_time_result)

# Store into invoice_weekly_summary with upsert
for (portal, run_type, date_str), data in summary.items():
    doc_to_insert = {
        "portalName": portal,
        "run_type": run_type,
        "date": date_str,
        "count": data["count"],
        "last_run": data["last_run"],
        "perInvoiceDownloadTimeBasedOnDB": list(data["perInvoiceDownloadTimeBasedOnDB"]),
        "TestStausAsPerInvTime": list(data["TestStausAsPerInvTime"]),
        "created_at": datetime.now(timezone.utc)
    }

    # Upsert to avoid duplicates
    summary_collection.update_one(
        {
            "portalName": portal,
            "run_type": run_type,
            "date": date_str
        },
        {"$set": doc_to_insert},
        upsert=True
    )

    print(
        f"✅ {portal} | {run_type} | {date_str} → "
        f"{data['count']} invoices, last run: {data['last_run'].strftime('%Y-%m-%d %I:%M %p')}, "
        f"InvTime: {list(data['perInvoiceDownloadTimeBasedOnDB'])}, InvTimeResult: {list(data['TestStausAsPerInvTime'])}"
    )
