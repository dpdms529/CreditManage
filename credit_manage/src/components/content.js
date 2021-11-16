import React, {Component} from 'react';
import Home from './home'
import Manage from './manage'
import Graduate from './graduate';

class Content extends Component{
    constructor(props){
        super(props);
        this.state={
            mode:'home'
        }
    }

    getContent(){
        var _content = null;
        if(this.state.mode === 'home'){
            _content = <Home onChangeMode={function(_mode){
                this.setState({mode:_mode});
            }.bind(this)}></Home>
        }else if(this.state.mode === 'manage'){
            _content = <Manage></Manage>
        }else if(this.state.mode === 'graduate'){
            _content = <Graduate></Graduate>
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