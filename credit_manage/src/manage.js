import React, {Component} from 'react';
import "../stylesheets/header.css"

class Header extends Component{
    render(){
        return(
            <header>
                <a href="index.html">IT정보공학과 학점관리 시스템</a>
                <nav>
                    <ul>
                        <li><a href = "login.html">로그인/회원가입</a></li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;