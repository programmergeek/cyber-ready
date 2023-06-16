from flask import Flask, request
from .controllers.create_new_vm import create_vm
from .controllers.stop_vm import stop_vm  
from .controllers.start_vm import start_vm
from .helper_functions.generate_addresses import generate_addresses
from .models.ip_addresses import db_init, add_addresses, assign_new_address

app = Flask(__name__)

@app.route('/')
def hello():
    return {'value': 'Hello World!'}

@app.route('/new_vm', methods=["POST"])
def new_vm():
    if request.method == "POST":
        data = request.get_json()
        return create_vm(lab_name=data['lab_name'], student_id=data['id'])
    return {"status": 404, "message": "Page not Found"} 

@app.route('/stop', methods=["POST"])
def stop():
    if request.method == "POST":
        data = request.get_json()
        return stop_vm(lab_name=data['lab_name'], student_id=data['id'])

@app.route('/start', methods=["POST"])
def start():
    if request.method == "POST":
        data = request.get_json()
        return start_vm(lab_name=data['lab_name'], student_id=data['id'])