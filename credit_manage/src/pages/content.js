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

    onAdd = (newData) => {
        var _data = this.state.data;
        _data.push(newData);
        this.setState({data:_data});
    }

    onDelete = (_id) => {
        var _data = this.state.data;
        var list = [];
        for(var i = 0 ;i<_data.length;i++){
            if(_data[i].id !== Number(_id)){
                console.log("_data[i].id: "+_data[i].id);
                console.log("_id: " +_id);
                list.push(_data[i]);
            }
            
        }
        console.log(list);
        this.setState({data:list});
    }

    render(){
        var _content = null;
        switch(this.props.id){
            case 1:
            case 2:
                _content = <Table data={this.state.data} onAdd={this.onAdd} onDelete={this.onDelete}></Table>;
                break;
            case 3:
            case 4:
                _content = <Login id={this.props.id}></Login>;
                break;
            default:
        }

        return(
            <div className='content'>
                <h2 className='title'>{this.props.title}</h2>
                {_content}
            </div>
        );

    }
}

export default Content;