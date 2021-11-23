import React, {Component} from "react";

class Home extends Component{
    render(){
        var user_id = new URLSearchParams(window.location.search).get('user_id');
        console.log(user_id);
        var manageUrl = "manage?user_id="+user_id;
        var graduateUrl = "graduate?user_id="+user_id;
        return(
            <div className="content">
                <button className="btn" onClick={function(){
                    if(user_id===null){
                        alert("로그인해주세요");
                    }else{
                        window.location.href=manageUrl;
                    }
                    
                }}>이수과목관리</button>
                <button className="btn" onClick={function(){
                    if(user_id===null){
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