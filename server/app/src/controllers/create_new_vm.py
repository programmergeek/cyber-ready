import os
import guacamole as guacamole

def create_vm(lab_name:str, student_id:str, static_ip:str):
    success = os.system(f"newvm.sh -l {lab_name} -i {student_id} -p {static_ip}")
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