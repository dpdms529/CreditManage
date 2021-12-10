import React, {Component} from 'react';
import axios from "axios";
import Table from '../components/table';
import Login from './login';

class Content extends Component{
    constructor(props){
        super(props);
        this.state={
            login:{},
            data:[]
        }
        var student_id = new URLSearchParams(window.location.search).get('student_id');
        axios.post("http://210.117.182.234:8080/~s201912352/takes.php",{id:student_id})
        .then(function(response){
            var list = response.data.result;
            for(var i = 0;i<list.length;i++){
                list[i]['id'] = i;
                list[i]['key'] = i;
            }
            this.onAddAll(list);
        }.bind(this));

    }
    
    onLogin = (loginData) => {
        this.setState({login : loginData});
    }

    onAddAll = (dataList) => {
        this.setState({data : dataList});
        console.log(this.state.data);
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
                _content =  <div>
                                <table className="criteria">
                                    <thead className="criteria">
                                        <tr className="criteria">
                                            <th colSpan="5" style={{borderRight:"1px white solid"}}>졸업구분</th>
                                            <th colSpan="4">공학인증 구분</th>
                                        </tr>
                                        <tr className="criteria">
                                            <th className="criteria">전공필수</th>
                                            <th className="criteria">전공선택</th>
                                            <th className="criteria">교양</th>
                                            <th className="criteria">공필/일선</th>
                                            <th className="criteria" style={{borderRight:"1px white solid"}}>취득학점</th>
                                            <th className="criteria">BSM</th>
                                            <th className="criteria">전문교양</th>
                                            <th className="criteria">공학주제</th>
                                            <th className="criteria">설계</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="criteria">0</td>
                                            <td className="criteria">0</td>
                                            <td className="criteria">0</td>
                                            <td className="criteria">0</td>
                                            <td className="criteria" style={{borderRight:"1px white solid"}}>0/140</td>
                                            <td className="criteria">0</td>
                                            <td className="criteria">0</td>
                                            <td className="criteria">0</td>
                                            <td className="criteria">0</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Table data={this.state.data} onAdd={this.onAdd} onDelete={this.onDelete}></Table>
                            </div>;
                break;
            case 2:
                _content = <Table data={this.state.data} onAdd={this.onAdd} onDelete={this.onDelete}></Table>;
                break;
            case 3:
                _content = <Login id={this.props.id} onLogin={this.onLogin} onAddAll={this.onAddAll}></Login>;
                break;
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