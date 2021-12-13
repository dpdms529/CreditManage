<?php
$request_body = file_get_contents('php://input');
$data = json_decode($request_body,true);
$id = $data["id"];
$course_id = $data["course_id"];
$year = $data["year"];
$semester = $data["semester"];

$servername = "localhost";
$username = "s201912352";
$password = "s201912352";
$dbname = "s201912352";

$conn = mysqli_connect($servername,$username,$password,$dbname);

$query = "insert into takes
            values('$year','$semester','$course_id','$id','A+','1')";

header('Content-Type:application/json;charset=utf-8');
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:content-type');

if($result = mysqli_query($conn, $query)){
    echo "{";
        echo "\"status\":\"OK\",";
        echo "\"result\":\"success\"";
    echo "}";
                    
}else{
    echo "{";
        echo "\"status\":\"OK\",";
        echo "\"result\":\"fail\"";
    echo "}";
};

mysqli_close($conn);
?>
