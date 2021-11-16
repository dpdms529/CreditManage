import React, {Component} from 'react';
import "../stylesheets/header.css"

class Header extends Component{
    render(){
        return(
            <header>
                <a class='title' href="/">IT정보공학과 학점관리 시스템</a>
                <nav>
                    <ul>
                        <li><a href = "login" onClick={function(e){
                            e.preventDefault();
                            alert("로그인");
                        }}>로그인/회원가입</a></li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;