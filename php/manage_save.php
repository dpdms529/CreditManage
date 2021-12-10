<?php
$request_body=file_get_contents('php://input');
$data=json_decode($request_body, true);

header('Content-Type:application/json');
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:content-type');

$servername = "localhost";
$username = "s201912352";
$password = "s201912352";
$dbname = "s201912352";

$conn = mysqli_connect($servername, $username, $password, $dbname);

$student_id = $data['student_id'];

$self = $data['self'];
$self_count = count($self['self_insert']);
$complete = 'True';
$status = 0;

# course -> section -> takes

for($i =0; $i<$self_count; $i++) {

    $self_year = $self[$i]['year'];
    $self_semester = $self[$i]['semester'];
    $self_courseID = $self[$i]['courseID'];
    $self_title = $self[$i]['title'];
    $self_credit = $self[$i]['credit'];
    $self_divisionCD = $self[$i]['division_cd'];
    $self_GPA = $self[$i]['GPA'];

    $insert_into_takes = "insert into takes values ($self_year, $self_semester, '$self_courseID', '$student_id', '$self_GPA', T);"
    $insert_into_course = "insert into takes values ('$self_courseID', '$self_title', $self_credit);"
    $insert_into_section = "insert into takes values ($self_year, $semester, '$self_courseID', '$self_divisionCD');"
    if(!empty($self_courseID))
    {
        if(mysqli_query($conn, $insert_into_course)) {
            if(mysqli_query($conn, $insert_into_section)) {
                if(mysqli_query($conn, $insert_into_takes)) {
                    $status += 1;
                } else {
                    echo "failed to insert data into takes table"
                }
            } else {
                echo "failed to insert data into section table."
            }
        } else {
            echo "failed to insert data into course table";
        }
    }
    
}

$subject = $data['subject'];
$subject_count = count($subject['subject']);

$delete_query = 'delete from takes where (course_id, student_id, year, semester) not in (';

//

for($i = 0; $i<$subject_count; $i++) {
    $course_id = $subject[$i]['course_id'];
    $year = $subject[$i]['year'];
    $semester = $subject[$i]['semester'];
    $GAP = $subject[$i]['GPA'];
    $isExist_query = "select exists (select * from takes where course_id = '$course_id' and student_id='$student_id' and year=$year and semester=$semester limit 1) as isExist";
    $not_in = $not_in."('$course_id', '$student_id', $year, $semester),";


    if($result = mysqli_query($conn, $isExist_query)) {
        $row = mysqli_fetch_array($result);
        if($row[isExist] == 0) { // 리스트에는 있고 db에는 없는 data insert
            $query = "insert into takes values($year, $semester, '$course_id', '$student_id', '$GPA', T)";
            if(mysqli_query($conn, $query)) {
                $status += 1;
            } else {
                echo "failed to insert data to database"
            }
        }
    }
    if($i == $subject_count-1) {
        $delete_query = substr($not_in, 0, -1);
        $delete_query = $not_in.");"
        if(mysqli_query($conn, $delete_query) && $status == 2) {
            echo "{";
                echo "\"status\":\"OK\"";
            echo "}";
        } else {
            echo "failed to delete data from database."
        }
    }
}
mysqli_close($conn);
?>