import React, {Component} from 'react';
import Table from './table';

class Manage extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[{id:1, div:'전공선택',abeek:'요소설계',subject:'데이터베이스',year:'2021',semester:'2',credit:'3',score:'A+'},
            {id:2, div:'전공선택',abeek:'요소설계',subject:'병렬분산시스템',year:'2021',semester:'2',credit:'3',score:'A+'}]
        }
    } 
    render(){
        return(
            <div class='content'>
                <h2 class='title'>{this.props.title}</h2>
                <Table data={this.state.data}></Table>
            </div>
        );

    }
}

export default Manage;