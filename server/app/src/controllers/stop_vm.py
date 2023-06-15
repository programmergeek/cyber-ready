import os

def stop_vm(lab_name:str, student_id:str):
    success = os.system(f"stopvm.sh -l {lab_name} -i {student_id}")
    if success == 0:
        return {"status": 200, "message": "success"}
    else:
        return {"status": 400, "message": "There was an issue stopping the machine."}