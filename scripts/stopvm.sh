while getopts ":l:i:" OPTION; do
    case "$OPTION" in 
        l)
            lab_name="$OPTARG"
            ;;
        i)
            student_id="$OPTARG"
            ;;
        ?)
            echo "Usage: $0 [-i student_id] [-l lab_name]"
            exit 1
            ;;
    esac
done

# check if student_id is set
if [ -z "$student_id" ]
then
    echo "Error: missing student id"
    exit 1
fi

# check if student_id is set
if [ -z "$lab_name" ]
then
    echo "Error: missing lab name"
    exit 1
fi

root_dir="/home/will/Documents/Projects"

export VAGRANT_CWD="$root_dir/labs/$student_id/$lab_name"

vagrant halt