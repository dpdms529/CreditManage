import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <React.StrictMode>
      <header>
      <a href="index.html">IT정보공학과 학점관리 시스템</a>
      <nav>
        <ul>
          <li><a href = "login.html">로그인/회원가입</a></li>
        </ul>
      </nav>
    </header>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();