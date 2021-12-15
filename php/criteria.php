<?php
$request_body = file_get_contents('php://input');
$data = json_decode($request_body,true);
$year = $data["year"];

$servername = "localhost";
$username = "s201912352";
$password = "s201912352";
$dbname = "s201912352";

$conn = mysqli_connect($servername,$username,$password,$dbname);

$query = "select admission_year, c.criteria_cd, criteria_credit, criteria_name 
            from graduation_criteria c, grad_criteria_list l 
            where c.admission_year = $year and c.criteria_cd = l.criteria_cd";

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
                        echo "\"admission_year\":\"$row[admission_year]\", \"criteria_cd\":\"$row[criteria_cd]\", \"citeria_credit\":\"$row[criteria_credit]\", \"criteria_name\":\"$row[criteria_name]\"";
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
}

mysqli_close($conn);
?>
