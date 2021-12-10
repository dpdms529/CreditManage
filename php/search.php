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

$query = "select c.course_id, c.title, d.division_name, ac.abeek_name, s.year, s.semester, c.credit from course c, section s, division d, abeek a, abeek_code ac where c.course_id = s.course_id and a.course_id = c.course_id and d.division_cd = s.division_cd and a.abeek_cd = ac.abeek_cd";

header('Content-Type:application/json');
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:content-type');

if($content != "") {
    $query = $query." and c.title like '%$content%'";
}

if($division == '전공필수') {
    $query = $query." and s.division_cd = '02'";
} else if($division == '전공선택') {
    $query = $query." and s.division_cd = '03'";
} else if($division == '일반선택') {
    $query = $query." and s.division_cd = '05'";
} else if($division == '교양') {
    $query = $query." and s.division_cd like '01%'";
} else { // 전체
}

if($year == '전체') {
} else {
	$query = $query." and s.year = $year";
}

if($abeek_bsm) $abeek = $abeek.'01';
if($abeek_tech) $abeek = $abeek.'02';
if($abeek_liberal) $abeek = $abeek.'03';
if($abeek_design) $abeek = $abeek.'04';

$len = strlen($abeek)/2;

for($i = 0; $i<$len; $i++) {
    $abeek = substr_replace($abeek, "|", $i*2+$i, 0);
}

$abeek = substr($abeek, 1, strlen($abeek));

if(!$abeek_bsm && !$abeek_tech && !$abeek_liberal && !$abeek_design) {
} else {
    $query = $query." and a.abeek_cd regexp "."'$abeek'";
}

$query = $query." oreder by s.year, s.semester, c.course_id;";

if($result = mysqli_query($conn, $query)) {
    $row_num = mysqli_num_rows($result);
    echo "{";
        echo "\"status\":\"OK\",";
        echo "\"result\":";
        echo "[";
    //course_id, title, credit, year, semester, division_cd, division_name, abbek_cd, abeek_credit, abeek_name
        for($i = 0; $i < $row_num; $i++) {
            $row = mysqli_fetch_array($result);
            echo "{";
                echo "\"course_id\":\"$row[course_id]\", \"title\":\"$row[title]\", \"credit\":\"$row[credit]\", \"year\":\"$row[year]\", \"semester\":\"$row[semester]\", \"division_cd\":\"$row[division_cd]\", \"division_name\":\"$row[division_name]\", \"abeek_cd\":\"$row[abeek_cd]\", \"abeek_credit\":\"$row[abeek_credit]\", \"abeek_name\":\"$row[abeek_name]\"";
                echo "}";
                if($i<$row_num-1) {
                    echo ",";
                }
        }
        echo "]";
    echo "}";
} else {
    echo "failed to get data from database.";
}
mysqli_close($conn);
?>