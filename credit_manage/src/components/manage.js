import React, {Component} from 'react';
import Table from './table';

class Manage extends Component{
    render(){
        return(
            <div class='content'>
                <h2 class='title'>이수과목관리</h2>
                <Table></Table>
            </div>
        );

    }
}

export default Manage;