import React, {Component} from 'react';
import axios from "axios";
import Table from '../components/table';
import Login from './login';

class Content extends Component{
    constructor(props){
        super(props);
        this.state={
            login:{},
            orginData:[],
            data:[],
            criteria:[]
        }
        if(props.id < 3){
            var student_id = new URLSearchParams(window.location.search).get('student_id');
            var year = student_id.substring(0,4);
            console.log(year);
            axios.all([axios.post("http://210.117.182.234:8081/~s201912352/student.php",{id:student_id}),
                        axios.post("http://210.117.182.234:8081/~s201912352/takes.php",{id:student_id}),
                        axios.post("http://210.117.182.234:8081/~s201912352/criteria.php",{year:year})
            ]).then(
                axios.spread((res1, res2, res3)=>{
                    console.log(res1.data.result, res2.data.result, res3.data.result);
                    var result1 = res1.data.result;
                    var result2 = res2.data.result;
                    var result3 = res3.data.result;
                    console.log(result3);
                    var list = [];
                    var _id = 0;
                    if(result1 !== "fail" && result2 !== "fail" && result3 !== "fail"){
                        for(var i = 0;i<result2.length;i++){
                            if(i > 0 && result2[i].course_id === result2[i-1].course_id && result2[i].year === result2[i-1].year && result2[i].semester === result2[i-1].semester) continue;
                            result2[i].id = _id;
                            result2[i].key = _id;
                            list.push(result2[i]);
                            _id++;
                        }
                        // for(var j = 0;j<result3.length;j++){
                        //     result3[i].key = j;
                        // }
                        this.onAddAll(result1,list,result3);
                    }  

                })
            );
        }

    }

    onAddAll = (loginData,dataList,criteriaList) => {
        console.log("onAddAll",loginData, dataList, criteriaList);
        var _data = JSON.stringify(dataList);
        _data = JSON.parse(_data);
        this.setState({
            login: loginData,
            data : dataList,
            orginData : _data,
            criteria : criteriaList
        });
        console.log(this.state.data);
    }

    onAdd = (newData) => {
        var _data = this.state.data;
        for(var i = 0 ;i<newData.length;i++){
            _data.push(newData[i]);
        }
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

    onSave = () => {
        var _data = this.state.data;
        var _origin = this.state.orginData;
        var insert = [];
        var remove = [];
        for(var i = 0;i<_data.length;i++){
            var _new = true;
            for(var j = 0;j<_origin.length;j++){
                if(_data[i].course_id === _origin[j].course_id && _data[i].year === _origin[j].year && _data[i].semester === _origin[j].semester){
                    _new = false;
                }
            }
            if(_new) insert.push(_data[i]);
        }
        for(var k = 0;k<_origin.length;k++){
            var _deleted = true;
            for(var l = 0;l<_data.length;l++){
                if(_origin[k].course_id === _data[l].course_id && _origin[k].year === _data[l].year && _origin[k].semester === _data[l].semester){
                    _deleted = false;
                }
            }
            if(_deleted) remove.push(_origin[k]);
        }
        console.log("data : ", _data,"origin : ", _origin);
        console.log("insert : ", insert);
        console.log("remove : ", remove);
        var student_id = new URLSearchParams(window.location.search).get('student_id');
        axios.post("http://210.117.182.234:8081/~s201912352/save.php",{
            id:student_id,
            insert:insert,
            remove:remove
        })
        .then(function(response){
            console.log("response", response);
            var result = response.data.result;
            if(result === "success"){
                alert("저장 성공!");
            }else{
                console.log(result);
                alert("저장 실패!");
            }     
        });

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
                                <Table data={this.state.data} onAdd={this.onAdd} onDelete={this.onDelete} onSave={this.onSave}></Table>
                            </div>;
                break;
            case 2:
                _content = <Table data={this.state.data} onAdd={this.onAdd} onDelete={this.onDelete} onSave={this.onSave}></Table>;
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