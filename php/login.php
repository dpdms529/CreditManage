<?php
$request_body = file_get_contents('php://input');
$data = json_decode($request_body,true);
$id = $data["id"];
$pwd = $data["pwd"];

$servername = "localhost";
$username = "s201912352";
$password = "s201912352";
$dbname = "s201912352";

$conn = mysqli_connect($servername,$username,$password,$dbname);

$query = "select
            case
                when student_id = student_id and pwd = pwd then 1
                else 0
            end isMember
            from student
            where student_id = $id and pwd = $pwd";

header('Content-Type:application/json;charset=utf-8');
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:content-type');

if($result = mysqli_query($conn, $query)){
    $row = mysqli_fetch_array($result);
    if($row[isMember] == 1){
        $query = "select st.student_id, st.name, st.grade, st.total_credit, st.GPA, t.course_id, c.title, s.division_cd, d.division_name, ac.abeek_cd, ac.abeek_name, a.abeek_credit, t.year, t.semester, c.credit, t.GP
                    from takes t,section s,course c, student st, division d, abeek a, abeek_code ac 
                    where st.student_id = $id and st.student_id = t.student_id and s.course_id = c.course_id and t.year = s.year and t.semester = s.semester and t.course_id = s.course_id and s.division_cd = d.division_cd and t.course_id = a.course_id and a.abeek_cd = ac.abeek_cd";
                
        if($result = mysqli_query($conn, $query)){
            $row_num = mysqli_num_rows($result);
            echo "{";
                echo "\"status\":\"OK\",";
                echo "\"result\":";
                echo "[";
                for($i = 0; $i < $row_num; $i++){
                    $row = mysqli_fetch_array($result);
                    echo "{";
                        echo "\"student_id\":\"$row[student_id]\", \"name\":\"$row[name]\", \"grade\":\"$row[grade]\", \"total_credit\":\"$row[total_credit]\", \"GPA\":\"$row[GPA]\", \"course_id\":\"$row[course_id]\", \"title\":\"$row[title]\", \"division_cd\":\"$row[division_cd]\", \"division_name\":\"$row[division_name]\", \"abeek_cd\":\"$row[abeek_cd]\", \"abeek_name\":\"$row[abeek_name]\", \"abeek_credit\":\"$row[abeek_credit]\", \"year\":\"$row[year]\", \"semester\":\"$row[semester]\", \"credit\":\"$row[credit]\", \"GP\":\"$row[GP]\"";
                        echo "}";
                        if($i<$row_num-1){
                            echo ",";
                        }
                }
                echo "]";
            echo "}";
        }else{
            echo "failed to get data from database.";
        }              
                
    }else{
        echo "{";
            echo "\"status\":\"OK\",";
            echo "\"result\":\"fail\"";
        echo "}";
    }

}else{
    echo "failed to get data from database.";
};

mysqli_close($conn);
?>
