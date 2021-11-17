import React from 'react';
import './Home.css'
import { Link, BrowserRouter } from 'react-router-dom';

class Home extends React.Component {
    render() {
        return (
            <div class="content">
                <div class="btn"><Link to ="/manage">이수과목관리</Link></div>
                <div class="btn"><Link to="/simulate">졸업시뮬레이션</Link></div>
            </div>
        );
    }
}

export default Home;