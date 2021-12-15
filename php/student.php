<?php
$request_body = file_get_contents('php://input');
$data = json_decode($request_body,true);
$id = $data["id"];

$servername = "localhost";
$username = "s201912352";
$password = "s201912352";
$dbname = "s201912352";

$conn = mysqli_connect($servername,$username,$password,$dbname);

$query = "select *
            from student
            where student_id = $id";

header('Content-Type:application/json;charset=utf-8');
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:content-type');

if($result = mysqli_query($conn, $query)){
    $row = mysqli_fetch_array($result);
    echo "{";
        echo "\"status\":\"OK\",";
        echo "\"result\":";
            echo "{";
                echo "\"student_id\":\"$row[student_id]\", \"name\":\"$row[name]\", \"grade\":\"$row[grade]\", \"total_credit\":\"$row[total_credit]\", \"GPA\":\"$row[GPA]\"";
            echo "}";
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
