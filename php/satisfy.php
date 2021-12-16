<?php
$request_body = file_get_contents('php://input');
$data = json_decode($request_body,true);
$id = $data["id"];

$servername = "localhost";
$username = "s201912352";
$password = "s201912352";
$dbname = "s201912352";

$conn = mysqli_connect($servername,$username,$password,$dbname);

$query = "select pc.student_id, pc.name, pc.grade, pc.course_id, pc.title, pc.year, pc.semester, pc.pcourse_id, pc.ptitle, st.year pyear, st.semester psemester,
            case when pc.cnt is null then 0
            else pc.cnt
            end cnt,
            case when pc.pcourse_id is null or concat(pc.year, pc.semester) > concat(st.year, st.semester) then 'Y'
            else 'N'
            end satisfy
            from
                (select st.*, pa.pcourse_id, pa.ptitle,
                    (select count(*) from course c, course pc, pre_subject p
                    where c.course_id = p.course_id and p.pre_course_id = pc.course_id and c.course_id = pa.course_id
                    group by c.course_id) cnt
                from
                    (select st.student_id, st.name, st.grade, c.course_id, c.title, s.year, s.semester, c.credit, t.GP
                    from student st, takes t, section s, course c
                    where c.course_id = s.course_id and s.course_id = t.course_id and s.year = t.year and s.semester = t.semester and st.student_id = t.student_id and st.student_id = $id) st
                left outer join
                    (select c.course_id, c.title, pc.course_id pcourse_id, pc.title ptitle
                    from course c, course pc, pre_subject p
                    where c.course_id = p.course_id and p.pre_course_id = pc.course_id) pa
                on st.course_id = pa.course_id) pc
            left outer join
                (select st.student_id, st.name, st.grade, c.course_id, c.title, s.year, s.semester, c.credit, t.GP
                from student st, takes t, section s, course c
                where c.course_id = s.course_id and s.course_id = t.course_id and s.year = t.year and s.semester = t.semester and st.student_id = t.student_id and st.student_id = $id) st
            on st.student_id = pc.student_id and st.course_id = pc.pcourse_id";

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
                        echo "\"course_id\":\"$row[course_id]\", \"title\":\"$row[title]\", \"year\":\"$row[year]\", \"semester\":\"$row[semester]\", \"pcourse_id\":\"$row[pcourse_id]\", \"ptitle\":\"$row[ptitle]\", \"pyear\":\"$row[pyear]\", \"psemester\":\"$row[psemester]\", \"cnt\":\"$row[cnt]\", \"satisfy\":\"$row[satisfy]\"";
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
