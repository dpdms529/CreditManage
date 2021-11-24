import React from "react";
import Home from "./home";
import Content from "./content";
import Popup from "../components/popup";
import {Routes, Route} from 'react-router-dom';

function Pages(){
    return(
        <Routes>
            <Route path="/" element={<Home />} exact></Route>
            <Route path="/manage" element={<Content id={1} title='이수과목관리'/>}></Route>
            <Route path="/graduate" element={<Content id={2} title='졸업시뮬레이션'/>}></Route>
            <Route path="/login" element={<Content id={3} title='로그인'/>}></Route>
            <Route path="/popup" element={<Popup/>}></Route>
        </Routes>
    );
}

export default Pages;
