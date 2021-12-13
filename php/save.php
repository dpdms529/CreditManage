<?php
$request_body = file_get_contents('php://input');
$data = json_decode($request_body,true);
$id = $data["id"];
$insert = $data["insert"];
$remove = $data["remove"];

$servername = "localhost";
$username = "s201912352";
$password = "s201912352";
$dbname = "s201912352";

$conn = mysqli_connect($servername,$username,$password,$dbname);

$insertState = false;
$removeState = false;

header('Content-Type:application/json;charset=utf-8');
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:content-type');

if(!empty($insert)){
    $query = "insert into takes values";
    for($i=0;$i<count($insert);$i++){
        $year = $insert[$i]['year'];
        $semester = $insert[$i]['semester'];
        $course_id = $insert[$i]['course_id'];
        $GP = $insert[$i]['GP'];
        $query = $query."(\"$year\", \"$semester\", \"$course_id\", \"$id\", \"$GP\", 1),";
    }
    
    $query = substr($query, 0, strlen($abeek)-1);

    if($result = mysqli_query($conn, $query)){
        $insertState = true;
    }
}else $insertState = true;

if(!empty($remove)){
    $query = "delete from takes where student_id = \"$id\" and (";
    for($i=0;$i<count($remove);$i++){
        $course_id = $remove[$i]['course_id'];
        $year = $remove[$i]['year'];
        $semester = $remove[$i]['semester'];
        $query = $query."(course_id = \"$course_id\" and year = \"$year\" and semester = \"$semester\") or ";
    }
    $query = substr($query, 0, strlen($abeek)-4);
    $query = $query.")";

    if($result = mysqli_query($conn, $query)){
        $removeState = true;
    }
}else $removeState = true;

if($insertState && $removeState){
    echo "{";
        echo "\"status\":\"OK\",";
        echo "\"result\":\"success\"";
    echo "}";
}else if($insertState){
    echo "{";
        echo "\"status\":\"OK\",";
        echo "\"result\":\"fail remove\",";
        echo "\"error\" :".mysqli_error($conn);
    echo "}";
}else if($removeState){
    echo "{";
        echo "\"status\":\"OK\",";
        echo "\"result\":\"fail insert\",";
        echo "\"error\" :".mysqli_error($conn);
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
