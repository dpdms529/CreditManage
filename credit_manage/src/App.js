import React from "react";
import Header from "./components/header";
import Pages from "./pages/pages";
import {BrowserRouter} from 'react-router-dom';

function App(){
    var content = [<Header key="header"/>,<Pages key="content"/>]
    var path = window.location.pathname;
    if(path==='/popup'){
        content = <Pages/>
    }
        
    return(
        <BrowserRouter>
            {content}
        </BrowserRouter>
    );
}

export default App;