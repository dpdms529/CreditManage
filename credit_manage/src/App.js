import react from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Manage from "./pages/Manage"
import Login from "./pages/Login"
import Header from "./components/Header";

function App() {
    return (
        <BrowserRouter>
            <Header/>
        <Routes>
            <Route path="/" exact={true} element={<Home/>} />
            <Route path="/manage" element={<Manage/>} />
            <Route path="/login" element={<Login/>} />
        </Routes>
        </BrowserRouter>
    );
}

export default App;