import React from 'react'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import {Home, Login, Manage} from './index'

const Pages = () => (
    <BrowserRouter>
    <Routes>
        <Route path="/" exact={true} element={<Home/>} />
        <Route path="/manage" element={<Manage/>} />
    </Routes>
    </BrowserRouter>
);

export default Pages;