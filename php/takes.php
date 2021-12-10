<?php
$request_body = file_get_contents('php://input');
$data = json_decode($request_body,true);
$id = $data["id"];

$servername = "localhost";
$username = "s201912352";
$password = "s201912352";
$dbname = "s201912352";

$conn = mysqli_connect($servername,$username,$password,$dbname);

$query = "select t.course_id, c.title, s.division_cd, d.division_name, ac.abeek_cd, ac.abeek_name, a.abeek_credit, t.year, t.semester, c.credit, t.GP, t.complete
            from takes t, section s,course c, division d, abeek a, abeek_code ac 
            where t.student_id = $id and s.course_id = c.course_id and t.year = s.year and t.semester = s.semester and t.course_id = s.course_id and s.division_cd = d.division_cd and t.course_id = a.course_id and a.abeek_cd = ac.abeek_cd
            order by year, semester, course_id";

header('Content-Type:application/json;charset=utf-8');
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:content-type');

if($result = mysqli_query($conn, $query)){
    $row_num = mysqli_num_rows($result);
    echo "{";
        echo "\"status\":\"OK\",";
        echo "\"result\":";
            echo "[";
                for($i = 0; $i < $row_num; $i++){
                    $row = mysqli_fetch_array($result);
                    echo "{";
                        echo "\"course_id\":\"$row[course_id]\", \"title\":\"$row[title]\", \"division_cd\":\"$row[division_cd]\", \"division_name\":\"$row[division_name]\", \"abeek_cd\":\"$row[abeek_cd]\", \"abeek_name\":\"$row[abeek_name]\", \"abeek_credit\":\"$row[abeek_credit]\", \"year\":\"$row[year]\", \"semester\":\"$row[semester]\", \"credit\":\"$row[credit]\", \"GP\":\"$row[GP]\"";
                    echo "}";
                    if($i<$row_num-1){
                        echo ",";
                    }
                }
            echo "]";
    echo "}";
}else{
    echo "{";
        echo "\"status\":\"OK\",";
        echo "\"result\":\"fail\"";
    echo "}";
};

mysqli_close($conn);
?>
