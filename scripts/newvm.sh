#!/bin/bash

while getopts ":l:i:p:" OPTION; do
    case "$OPTION" in 
        l)
            lab_name="$OPTARG"
            ;;
        i)
            student_id="$OPTARG"
            ;;
        p)
            static_ip="$OPTARG"
            ;;
        ?)
            echo "Usage: $0 [-l lab_name] [-i student_id] [-p static_ip_address]"
            exit 1
            ;;
    esac
done

# check static_ip has been set
if [ -z "$static_ip" ]
then 
    echo "Error: missing ip address"
    exit 1
fi

# check if student_id is set
if [ -z "$lab_name" ]
then
    echo "Error: missing lab name"
    exit 1
fi

# check if student_id is set
if [ -z "$student_id" ]
then
    echo "Error: missing student id"
    exit 1
fi


current_dir="$PWD"
parent_dir="$(dirname "$current_dir")"

# create lab folder
mkdir -p "$parent_dir/labs/$student_id/$lab_name"

# copy files in template folder into lab folder
cp -r "$parent_dir/vm-template/." "$parent_dir/labs/$student_id/$lab_name"

# give the virtal machine a name
sed -i "4 i v.name=\"$student_id-$lab_name\"" $parent_dir/labs/$student_id/$lab_name/Vagrantfile

# set the static ip address of the machine
sed -i "9 i config.vm.network \"private_network\", ip: \"$static_ip\"" $parent_dir/labs/$student_id/$lab_name/Vagrantfile

export VAGRANT_CWD="$parent_dir/labs/$student_id/$lab_name"

vagrant up