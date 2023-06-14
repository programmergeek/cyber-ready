from flask import Flask, request
from .controllers.create_new_vm import create_vm  
app = Flask(__name__)


@app.route('/')
def hello():
    return {'value': 'Hello World!'}

@app.route('/new_vm', methods=["POST","GET"])
def new_vm():
    if request.method == "POST":
        data = request.get_json()
        return create_vm(lab_name=data['lab_name'], student_id=data['id'], static_ip=data['ip'])
    else:
        return "meep"