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
    $divisionStr = "sa.division_cd like '$division%'";
}

if($year == "전체"){
    $yearStr = "1";
}else{
    $yearStr = "sa.year = '$year'";
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
    $abeekStr = "a.abeek_cd regexp '$abeek'";
}

$query = "select a.course_id, a.title, a.year, a.semester, a.credit, a.division_cd, a.division_name, a.abeek_cd abeek_cd1, a.abeek_name abeek_name1, a.abeek_credit abeek_credit1,
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
                (select ca.course_id, ca.title, ca.credit, sa.year, sa.semester, d.division_cd, d.division_name, a.abeek_cd, a.abeek_credit, ac.abeek_name
                from course ca, section sa, division d, abeek a, abeek_code ac
                where ca.course_id = sa.course_id and a.course_id = ca.course_id and d.division_cd = sa.division_cd and a.abeek_cd = ac.abeek_cd 
                    and ca.title like '%$content%' and $divisionStr and $yearStr and $abeekStr) a,
                (select ca.course_id, ca.title, ca.credit, sa.year, sa.semester, d.division_cd, d.division_name, a.abeek_cd, a.abeek_credit, ac.abeek_name
                from course ca, section sa, division d, abeek a, abeek_code ac
                where ca.course_id = sa.course_id and a.course_id = ca.course_id and d.division_cd = sa.division_cd and a.abeek_cd = ac.abeek_cd ) b
            where a.course_id = b.course_id and a.year = b.year and a.semester = b.semester
            group by a.course_id, a.title, a.year, a.semester, a.credit, a.division_cd, a.division_name, a.abeek_cd
            order by a.year, a.semester, a.course_id, a.abeek_cd";

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