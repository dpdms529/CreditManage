import React from "react";
import Header from "./components/header";
import Home from "./pages/home";
import Content from "./pages/content";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App(){
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>} exact></Route>
                <Route path="/manage" element={<Content id={1} title='이수과목관리'/>}></Route>
                <Route path="/graduate" element={<Content id={2} title='졸업시뮬레이션'/>}></Route>
                <Route path="/login" element={<Content id={3} title='로그인'/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;