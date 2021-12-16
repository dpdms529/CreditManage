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
            var year = student_id.substring(0,4);
            console.log(year);
            axios.all([axios.post("http://210.117.182.234:8081/~s201912352/student.php",{id:student_id}),
                        axios.post("http://210.117.182.234:8081/~s201912352/takes.php",{id:student_id}),
                        axios.post("http://210.117.182.234:8081/~s201912352/criteria.php",{year:year})
            ]).then(
                axios.spread((res1, res2, res3)=>{
                    console.log(res1.data.result, res2.data.result, res3.data);
                    var result1 = res1.data.result;
                    var result2 = res2.data.result;
                    var result3 = res3.data.result;
                    console.log(result3);
                    var list = [];
                    var clist = [];
                    var _id = 0;
                    if(result1 !== "fail" && result2 !== "fail" && result3 !== "fail"){
                        for(var i = 0;i<result2.length;i++){
                            if(i > 0 && result2[i].course_id === result2[i-1].course_id && result2[i].year === result2[i-1].year && result2[i].semester === result2[i-1].semester) continue;
                            result2[i].id = _id;
                            result2[i].key = _id;
                            list.push(result2[i]);
                            _id++;
                        }
                        for(var j = 0;j<result3.length;j++){
                            result3[j].key = j;
                            clist.push(result3[j]);
                        }
                        this.onAddAll(result1,list,clist);
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
        }, () => { this.onCalc(); });
        console.log(this.state.data[0]);
        //console.log("criteria:",this.state.criteria[10]);
    }

    onAdd = (newData) => {
        var _data = this.state.data;
        for(var i = 0 ;i<newData.length;i++){
            var check = false;
            for(var j = 0;j<_data.length;j++){
                if(newData[i].course_id === _data[j].course_id && newData[i].year === _data[j].year && newData[i].semester === _data[j].semester) check = true;
            }
            if(check){
                alert("이미 추가된 과목입니다.");
            }else{
                _data.push(newData[i]);
            }
            
        }
        this.setState({data:_data}, () => { this.onCalc(); });
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
        this.setState({data:list}, () => { this.onCalc(); });
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
                var student_id = new URLSearchParams(window.location.search).get('student_id');
                window.location.href="/manage?student_id="+ student_id;
            }else{
                console.log(result);
                alert("저장 실패!");
            }     
        });

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
                default:
            }
        }

        this.setState({
            credit : _credit
        }, () => {
            console.log(this.state.credit)
        });
    }

    render(){
<<<<<<< HEAD

        if(this.props.id < 3) {
=======
        if(this.props.id < 3){
>>>>>>> cb1320ddd4a048547247fc9aff9a56325065b950
            var {criteria} = this.state;
            if(!criteria){
                return null;
            }
<<<<<<< HEAD
        }

=======
            console.log(criteria[10].criteria_credit);
        }
>>>>>>> cb1320ddd4a048547247fc9aff9a56325065b950
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
                                            <td className="criteria">{this.state.credit.required}/{this.state.criteria[5].criteria_credit}</td>
                                            <td className="criteria">{this.state.credit.selection}/{this.state.criteria[6].criteria_credit}</td>
                                            <td className="criteria">{this.state.credit.liberal}/{this.state.criteria[3].criteria_credit}</td>
                                            <td className="criteria">{this.state.credit.general_common}</td>
                                            <td className="criteria" style={{borderRight:"1px white solid"}}>{this.state.credit.total}/{this.state.criteria[11].criteria_credit}</td>
                                            <td className="criteria">{this.state.credit.abeek_bsm}/{this.state.criteria[7].criteria_credit}</td>
                                            <td className="criteria">{this.state.credit.abeek_liberal}/{this.state.criteria[8].criteria_credit}</td>
                                            <td className="criteria">{this.state.credit.abeek_tech}/{this.state.criteria[10].criteria_credit}</td>
                                            <td className="criteria">{this.state.credit.abeek_design}/{this.state.criteria[9].criteria_credit}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Table id={this.props.id} data={this.state.data} origin={this.state.orginData} onAdd={this.onAdd} onDelete={this.onDelete} onSave={this.onSave}></Table>
                            </div>;
                break;
            case 2:
                _content = <Table id={this.props.id} data={this.state.data} origin={this.state.orginData} criteria={this.state.criteria} credit={this.state.credit} onAdd={this.onAdd} onDelete={this.onDelete} onSave={this.onSave} onCalc={this.onCalc}></Table>;
                break;
            case 3:
                _content = <Login id={this.props.id} onLogin={this.onLogin}></Login>;
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