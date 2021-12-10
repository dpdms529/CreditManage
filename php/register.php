<?php
$request_body = file_get_contents('php://input');
$data = json_decode($request_body,true);
$id = $data["id"];
$name = $data["name"];
$grade = $data["grade"];
$pwd = $data["pwd"];

$servername = "localhost";
$username = "s201912352";
$password = "s201912352";
$dbname = "s201912352";

$conn = mysqli_connect($servername,$username,$password,$dbname);

$query = "insert into student
values($id,$name,$grade,null,null,$pwd)";

header('Content-Type:application/json;charset=utf-8');
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:content-type');

if($result = mysqli_query($conn, $query)){             
    echo "{";
        echo "\"status\":\"OK\",";
        echo "\"result\":\"success\"";
    echo "}";
}else{
    echo "failed to get data from database.";
};

mysqli_close($conn);
?>
