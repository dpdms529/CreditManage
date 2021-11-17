import React from 'react';
import { Link } from 'react-router-dom';


function Header() {
    return (
        <header>
      <Link to="/">IT정보공학과 학점관리 시스템</Link>
      <nav>
        <ul>
          <li><Link to="/login">로그인/회원가입</Link></li>
        </ul>
      </nav>
    </header>
    )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
export default Header;