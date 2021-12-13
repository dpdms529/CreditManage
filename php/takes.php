<?php
$request_body = file_get_contents('php://input');
$data = json_decode($request_body,true);
$id = $data["id"];

$servername = "localhost";
$username = "s201912352";
$password = "s201912352";
$dbname = "s201912352";

$conn = mysqli_connect($servername,$username,$password,$dbname);

$query = "select a.course_id, a.title, a.year, a.semester, a.credit, a.GP, a.division_cd, a.division_name, a.abeek_cd abeek_cd1, a.abeek_name abeek_name1, a.abeek_credit abeek_credit1,
            min(case 
                when a.abeek_cd = b.abeek_cd then null
                else b.abeek_cd
            end) abeek_cd2,
            min(case 
                when a.abeek_cd = b.abeek_cd then null
                else b.abeek_name
            end) abeek_name2,
            min(case 
                when a.abeek_cd = b.abeek_cd then null
                else b.abeek_credit
            end) abeek_credit2
            from
                (select ta.course_id, c.title, s.division_cd, d.division_name, ac.abeek_cd, ac.abeek_name, a.abeek_credit, ta.year, ta.semester, c.credit, ta.GP
                from takes ta, section s,course c, division d, abeek a, abeek_code ac 
                where ta.student_id = $id and s.course_id = c.course_id and ta.year = s.year and ta.semester = s.semester and ta.course_id = s.course_id and s.division_cd = d.division_cd and ta.course_id = a.course_id and a.abeek_cd = ac.abeek_cd) a,
                (select ta.course_id, c.title, s.division_cd, d.division_name, ac.abeek_cd, ac.abeek_name, a.abeek_credit, ta.year, ta.semester, c.credit, ta.GP
                from takes ta, section s,course c, division d, abeek a, abeek_code ac 
                where ta.student_id = $id and s.course_id = c.course_id and ta.year = s.year and ta.semester = s.semester and ta.course_id = s.course_id and s.division_cd = d.division_cd and ta.course_id = a.course_id and a.abeek_cd = ac.abeek_cd) b
            where a.course_id = b.course_id and a.year = b.year and a.semester = b.semester 
            group by a.course_id, a.title, a.year, a.semester, a.credit, a.GP, a.division_cd, a.division_name, a.abeek_cd
            order by a.year, a.semester, a.course_id, a.abeek_cd";

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
                        echo "\"course_id\":\"$row[course_id]\", \"title\":\"$row[title]\", \"year\":\"$row[year]\", \"semester\":\"$row[semester]\", \"credit\":\"$row[credit]\", \"GP\":\"$row[GP]\", \"division_cd\":\"$row[division_cd]\", \"division_name\":\"$row[division_name]\", \"abeek_cd1\":\"$row[abeek_cd1]\", \"abeek_name1\":\"$row[abeek_name1]\", \"abeek_credit1\":\"$row[abeek_credit1]\", \"abeek_cd2\":\"$row[abeek_cd2]\", \"abeek_name2\":\"$row[abeek_name2]\", \"abeek_credit2\":\"$row[abeek_credit2]\"";
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
        echo "\"result\":\"fail\",";
        echo "\"error\" :".mysqli_error($conn);
    echo "}";
};

mysqli_close($conn);
?>
