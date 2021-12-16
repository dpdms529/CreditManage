<?php
$request_body = file_get_contents('php://input');
$data = json_decode($request_body,true);
$id = $data["id"];

$servername = "localhost";
$username = "s201912352";
$password = "s201912352";
$dbname = "s201912352";

$conn = mysqli_connect($servername,$username,$password,$dbname);

$query = "select ca.student_id, ca.course_id, ca.title, ca.year, ca.semester, ca.division_cd, ca.division_name, ca.credit, ca.GP, min(ca.abeek_cd) abeek_cd1, min(ca.abeek_name) abeek_name1, max(ca.abeek_credit) abeek_credit1, max(cb.abeek_cd) abeek_cd2, max(cb.abeek_name) abeek_name2, min(cb.abeek_credit) abeek_credit2
            from 
                (select c.student_id, c.course_id, c.title, c.year, c.semester, c.division_cd, c.division_name, c.credit, c.GP, a.abeek_cd, a.abeek_credit, a.abeek_name
                    from 
                    (select t.student_id, c.course_id, c.title, s.year, s.semester, s.division_cd, d.division_name, c.credit, t.GP
                        from course c, section s, takes t, division d 
                        where c.course_id = s.course_id and s.course_id = t.course_id and s.year = t.year and s.semester = t.semester and  s.division_cd = d.division_cd and t.student_id = $id) c
                    left outer join
                    (select a.course_id, a.abeek_cd, a.abeek_credit, ac.abeek_name from abeek a, abeek_code ac where a.abeek_cd = ac.abeek_cd) a
                    on c.course_id = a.course_id) ca 
            left outer join
                (select c.course_id, c.year, c.semester, a.abeek_cd, a.abeek_credit, a.abeek_name
                    from 
                    (select c.course_id, c.title, c.credit, s.year, s.semester, s.division_cd, d.division_name from course c, section s, division d where c.course_id = s.course_id and s.division_cd = d.division_cd) c
                    left outer join
                    (select a.course_id, a.abeek_cd, a.abeek_credit, ac.abeek_name from abeek a, abeek_code ac where a.abeek_cd = ac.abeek_cd) a
                    on c.course_id = a.course_id) cb
            on ca.course_id = cb.course_id and ca.year = cb.year and ca.semester = cb.semester and ca.abeek_cd != cb.abeek_cd
            group by student_id, course_id, title, year, semester, division_cd, credit, GP
            order by year desc, semester, course_id, min(ca.abeek_cd);";

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
