import React, {Component} from 'react';
import Home from './home'
import Manage from './manage'
import Login from './login';

class Content extends Component{
    constructor(props){
        super(props);
        this.state={
            mode:'home',
            manage:{title:'이수과목관리'},
            graduate:{title:'졸업시뮬레이션'}
        }
    }

    getContent(){
        var _content = null;
        if(this.state.mode === 'home'){
            _content = <Home onChangeMode={function(_mode){
                this.setState({mode:_mode});
            }.bind(this)}></Home>
        }else if(this.state.mode === 'manage'){
            _content = <Manage title={this.state.manage.title}></Manage>
        }else if(this.state.mode === 'graduate'){
            _content = <Manage title={this.state.graduate.title}></Manage>
        }else if(this.state.mode === 'login'){
            _content = <Login></Login>
        }
        return _content;
    }

    render(){
        return(
            this.getContent()
        );
    }
}

export default Content;