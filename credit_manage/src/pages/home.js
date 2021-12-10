import React, {Component} from "react";

class Home extends Component{
    render(){
        var student_id = new URLSearchParams(window.location.search).get('student_id');
        console.log(student_id);
        var manageUrl = "manage?student_id="+student_id;
        var graduateUrl = "graduate?student_id="+student_id;
        return(
            <div className="content">
                <button className="btn" onClick={function(){
                    if(student_id===null){
                        alert("로그인해주세요");
                    }else{
                        window.location.href=manageUrl;
                    }
                    
                }}>이수과목관리</button>
                <button className="btn" onClick={function(){
                    if(student_id===null){
                        alert("로그인해주세요");
                    }else{
                        window.location.href=graduateUrl;
                    }
                    
                }}>졸업시뮬레이션</button>
            </div>
        );

    }
}

export default Home;