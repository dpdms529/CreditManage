import React, {Component} from 'react';
import Table from '../components/table';
import Login from './login';

class Content extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[{id:1, div:'전공선택',abeek:'요소설계',subject:'데이터베이스',year:'2021',semester:'2',credit:'3',score:'A+'},
            {id:2, div:'전공선택',abeek:'요소설계',subject:'병렬분산시스템',year:'2021',semester:'2',credit:'3',score:'A+'}]
        }
    } 
    render(){
        var _content = null;
        switch(this.props.id){
            case 1:
            case 2:
                _content = <Table data={this.state.data}></Table>;
                break;
            case 3:
                _content = <Login></Login>;
                break;
            default:
        }

        return(
            <div class='content'>
                <h2 class='title'>{this.props.title}</h2>
                {_content}
            </div>
        );

    }
}

export default Content;