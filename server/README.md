# Cyber Ready VM Server

A python flask server that manages the virtual machines.

## Prerequisites

1. Make sure python3 and pip are installed on your machine.
2. Make a folder called `server` in the root directory.
3. Install pipenv: `pip -m install pipenv` ([docs](https://pipenv.pypa.io/en/latest/))
4. Change the current directory to `server`

## Flask

1. Download the flask package: `pipenv install flask`
2. Create a folder named `src`. This is where all your Flask code is going to go.
3. Create a file called `__init__.py`.
4. Inside the file, initialize the server and add our API endpoints

```python
from flask import Flask, request

app = Flask(__name__)

@app.route('/new_vm', methods=["POST"])
def new_vm():
    return "create new virtual machine"

@app.route('/start', methods=["POST"])
def start():
    return "start existing virtual machine"

@app.route('/stop', methods=["POST"])
def stop():
    return "stop a running vm"
```

### **/new_vm**

This function needs to do the following:

1. Create a new virtual machine.
2. Add the new vm to guacamole.

#### Create a new virtual machine

To do this we are going to use the `newvm.sh` script in scripts directory (Consider adding the scripts folder to PATH).

So we are first going to create a function, called `create_new_vm` that takes three parameters: `lab_name`, `student_id` and `static_ip`

```python
def create_new_vm(lab_name:str, student_id:str, static_ip:str):
    pass
```

Next we are going to execute the `newvm.sh` script using our parameters

```python
import os

def create_new_vm(lab_name:str, student_id:str, static_ip:str):
    success = os.system(f'newvm.sh -l {lab_name} -i {student_id} -p {static_ip}')
    if success == 0:
        return {"status": 200, "message": "success"}
    else:
        return {"status": 500, "message": "There was an issue creating the virtual machine."}
```

#### Add the new vm to Guacamole

install the `guacamole-api-wrapper` python package.

```bash
pipenv install guacamole-api-wrapper
```

import the package

```python
import os
import guacamole

def create_new_vm(lab_name:str, student_id:str, static_ip:str):
    success = os.system(f'newvm.sh -l {lab_name} -i {student_id} -p {static_ip}')
    if success == 0:
        session = guacamole.session("http://127.0.0.1:8080/guacamole", "mysql", "guacadmin", "guacadmin")
        parameters = {
            "hostname": static_ip,
            "port": "3389",
            "username": "vagrant",
            "password": "vagrant"
        }
        session.manage_connection(request="post", type="rdp", name=f"{student_id}-{lab_name}", parent_identifier="ROOT", parameters=parameters)
        return {"status": 200, "message": "success"}
    else:
        return {"status": 500, "message": "There was an issue creating the virtual machine."}
```

### **/start**

### **/stop**

## Status Codes

* 200 => success
* 400 => bad api request
* 404 => page not found
* 500 => internal server error
