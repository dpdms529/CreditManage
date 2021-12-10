import React, {Component} from 'react';
import "../stylesheets/header.css"

class Header extends Component{
    render(){
        var student_id = new URLSearchParams(window.location.search).get('student_id');
        var homeUrl = "/";
        var manageUrl = "manage?student_id="+student_id;
        var graduateUrl = "graduate?student_id="+student_id;
        var list = <li className="horizon" key={0}><a href = "login">로그인</a></li>;
        if(student_id !== null){
            homeUrl = "/?student_id=" + student_id;
            list = [<li className="horizon" key={1}><a href = {manageUrl}>이수과목관리</a></li>,
                    <li className="horizon" key={2}><a href = {graduateUrl}>졸업시뮬레이션</a></li>,
                    <li className="horizon" key={3}><a href = "/">로그아웃</a></li>];
        }
        return(
            <header>
                <a className='title' href={homeUrl}>IT정보공학과 학점관리 시스템</a>
                <nav>
                    <ul>
                        {list}
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;