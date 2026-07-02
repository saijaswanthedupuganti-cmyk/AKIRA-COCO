from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
import datetime

app = Flask(__name__)
CORS(app)

DB_FILE = 'crm_leads.json'

def load_leads():
    if os.path.exists(DB_FILE):
        with open(DB_FILE, 'r') as f:
            return json.load(f)
    return []

def save_leads(leads):
    with open(DB_FILE, 'w') as f:
        json.dump(leads, f, indent=4)

@app.route('/api/chat-sessions/sync', methods=['POST'])
def sync_lead():
    data = request.json
    leads = load_leads()
    
    # Check if session exists
    existing = next((l for l in leads if l['sessionId'] == data.get('sessionId')), None)
    if existing:
        existing.update(data)
        existing['lastUpdated'] = datetime.datetime.now().isoformat()
    else:
        data['createdAt'] = datetime.datetime.now().isoformat()
        leads.append(data)
        
    save_leads(leads)
    return jsonify({"status": "success"})

if __name__ == '__main__':
    print("Starting AKIRA CRM Backend on port 5000...")
    app.run(port=5000, debug=True)
