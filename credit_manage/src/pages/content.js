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
            credit:{
                "abeek_bsm" : 0,
                "abeek_tech" : 0,
                "abeek_liberal" : 0,
                "abeek_design" : 0,
                "required" : 0,
                "selection" : 0,
                "general_common" : 0,
                "liberal" : 0,
                "total" : 0
            }
        }
        if(props.id < 3){
            var student_id = new URLSearchParams(window.location.search).get('student_id');
            axios.post("http://210.117.182.234:8081/~s201912352/takes.php",{id:student_id})
            .then(function(response){
                console.log(response.data);
                var list = response.data.result;
                if(list !== "fail"){
                    for(var i = 0;i<list.length;i++){
                        list[i].id= i;
                        list[i].key = i;
                    }
                    this.onAddAll(list);
                    this.onCalc();
                }  
                
            }.bind(this));
        }

    }
    
    onLogin = (loginData) => {
        this.setState({login : loginData});
    }

    onAddAll = (dataList) => {
        this.setState({
            data : dataList,
            orginData : dataList
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
        insert = _data.filter(x=>!_origin.includes(x));
        remove = _origin.filter(x=>!_data.includes(x));
        
    }

    onCalc = () => {
        var _data = this.state.data;
        var _credit = {
            "abeek_bsm" : 0,
            "abeek_tech" : 0,
            "abeek_liberal" : 0,
            "abeek_design" : 0,
            "required" : 0.0,
            "selection" : 0.0,
            "general_common" : 0.0,
            "liberal" : 0.0,
            "total": 0.0
        }

        for(var i = 0; i<_data.length; i++) {
            switch (_data[i].abeek_cd1) {
                case '01': // bsm
                    _credit.abeek_bsm += Number(_data[i].abeek_credit1);
                    break;
                case '02': //공학주제
                    _credit.abeek_tech += Number(_data[i].abeek_credit1);
                    break;
                case '03': // 전문교양
                    _credit.abeek_liberal += Number(_data[i].abeek_credit1);
                    break;
                case '041':
                case '042':
                case '043': // 설계
                    _credit.abeek_design += Number(_data[i].abeek_credit1);
                    break;
                default:
                    break;
            }
            switch (_data[i].abeek_cd2) {
                case '01': // bsm
                    _credit.abeek_bsm += Number(_data[i].abeek_credit2);
                    break;
                case '02': //공학주제
                    _credit.abeek_tech += Number(_data[i].abeek_credit2);
                    break;
                case '03': // 전문교양
                    _credit.abeek_liberal += Number(_data[i].abeek_credit2);
                    break;
                case '041':
                case '042':
                case '043': // 설계
                    _credit.abeek_design += Number(_data[i].abeek_credit2);
                    break;
                default:
                    break;
            }
            switch(_data[i].division_cd) {
                case '011':
                case '012':
                case '013':
                case '014': // 교양
                    _credit.liberal += parseFloat(_data[i].credit);
                    _credit.total += parseFloat(_data[i].credit);
                    break;
                case '02': // 전필
                    _credit.required += parseFloat(_data[i].credit);
                    _credit.total += parseFloat(_data[i].credit);
                    break;
                case '03': // 전선
                    _credit.selection += parseFloat(_data[i].credit);
                    _credit.total += parseFloat(_data[i].credit);
                    break;
                case '04': // 공필
                    _credit.general_common += parseFloat(_data[i].credit);
                    _credit.total += parseFloat(_data[i].credit);
                    break;
                case '05': // 일선
                    _credit.general_common += parseFloat(_data[i].credit);
                    _credit.total += parseFloat(_data[i].credit);
                    break;
            }
        }

        this.setState({
            credit : _credit
        }, () => {
            console.log(this.state.credit)
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
                                            <td className="criteria">{this.state.credit.required}</td>
                                            <td className="criteria">{this.state.credit.selection}</td>
                                            <td className="criteria">{this.state.credit.liberal}</td>
                                            <td className="criteria">{this.state.credit.general_common}</td>
                                            <td className="criteria" style={{borderRight:"1px white solid"}}>{this.state.credit.total}/140</td>
                                            <td className="criteria">{this.state.credit.abeek_bsm}</td>
                                            <td className="criteria">{this.state.credit.abeek_liberal}</td>
                                            <td className="criteria">{this.state.credit.abeek_tech}</td>
                                            <td className="criteria">{this.state.credit.abeek_design}</td>
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