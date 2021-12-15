<?php
$request_body=file_get_contents('php://input');
$data=json_decode($request_body, true);

$servername = "localhost";
$username = "s201912352";
$password = "s201912352";
$dbname = "s201912352";

$conn = mysqli_connect($servername, $username, $password, $dbname);

$content = $data["content"];
$year = $data["year"];
$division = $data["division"];
$abeek_bsm = $data["abeek_bsm"];
$abeek_liberal = $data["abeek_liberal"];
$abeek_tech = $data["abeek_tech"];
$abeek_design = $data["abeek_design"];

if($division == "전체"){
    $divisionStr = "1";
}else{
    $divisionStr = "ca.division_cd like '$division%'";
}

if($year == "전체"){
    $yearStr = "1";
}else{
    $yearStr = "ca.year = '$year'";
}

if($abeek_bsm){
    $abeek = $abeek.'01|';
}

if($abeek_liberal){
    $abeek = $abeek.'03|';
}

if($abeek_tech){
    $abeek = $abeek.'02|';
}

if($abeek_design){
    $abeek = $abeek.'04|';
}

$abeek = substr($abeek, 0, strlen($abeek)-1);

if(empty($abeek)){
    $abeekStr = "1";
}else{
    $abeekStr = "((ca.abeek_cd is not null and ca.abeek_cd regexp '$abeek') or (cb.abeek_cd is not null and cb.abeek_cd regexp '$abeek'))";
}

$query = "select ca.course_id, ca.title, ca.credit, ca.year, ca.semester, ca.division_cd, ca.division_name, min(ca.abeek_cd) abeek_cd1, min(ca.abeek_name) abeek_name1, min(ca.abeek_credit) abeek_credit1, max(cb.abeek_cd) abeek_cd2, max(cb.abeek_name) abeek_name2, max(cb.abeek_credit) abeek_credit2
            from 
                (select c.course_id, c.title, c.credit, c.year, c.semester, c.division_cd, c.division_name, a.abeek_cd, a.abeek_credit, a.abeek_name
                    from 
                    (select c.course_id, c.title, c.credit, s.year, s.semester, s.division_cd, d.division_name from course c, section s, division d where c.course_id = s.course_id and s.division_cd = d.division_cd) c
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
            where ca.title like '%$content%' and $divisionStr and $yearStr and $abeekStr
            group by course_id, title, credit, year, semester, division_cd
            order by year desc, semester, course_id, min(ca.abeek_cd)";

header('Content-Type:application/json');
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:content-type');

if($result = mysqli_query($conn, $query)) {
    $row_num = mysqli_num_rows($result);
    echo "{";
        echo "\"status\":\"OK\",";
        echo "\"result\":";
        echo "[";
        //course_id, title, year, semester, credit, division_cd, division_name, abbek_cd1, abeek_name1, abeek_credit1,  abbek_cd2, abeek_name2, abeek_credit2
        for($i = 0; $i < $row_num; $i++) {
            $row = mysqli_fetch_array($result);
            echo "{";
                echo "\"course_id\":\"$row[course_id]\", \"title\":\"$row[title]\", \"year\":\"$row[year]\", \"semester\":\"$row[semester]\", \"credit\":\"$row[credit]\", \"division_cd\":\"$row[division_cd]\", \"division_name\":\"$row[division_name]\", \"abeek_cd1\":\"$row[abeek_cd1]\", \"abeek_name1\":\"$row[abeek_name1]\", \"abeek_credit1\":\"$row[abeek_credit1]\", \"abeek_cd2\":\"$row[abeek_cd2]\", \"abeek_name2\":\"$row[abeek_name2]\", \"abeek_credit2\":\"$row[abeek_credit2]\"";
            echo "}";
            if($i<$row_num-1) {
                echo ",";
            }
        }
        echo "]";
    echo "}";
} else {
    echo "{";
        echo "\"status\":\"OK\",";
        echo "\"result\":\"fail\",";
        echo "\"error\" :".mysqli_error($conn);
    echo "}";
}
mysqli_close($conn);
?>