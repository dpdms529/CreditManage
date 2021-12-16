import React, {Component} from "react";
import axios from "axios";
import '../stylesheets/table.css';
import PopupDom from "../pages/popupDom";
import Popup from '../components/popup';

class Table extends Component{
    constructor(props){
        super(props);
        this.state = {
            isOpenPopup: false,
            isOpenResult: false,
            self_insert: [],
            subject: [],
            credit: this.props.credit
        };
        if(this.props.id === 2){
            var student_id = new URLSearchParams(window.location.search).get('student_id');
            axios.post("http://210.117.182.234:8081/~s201912352/satisfy.php",
            {
                id:student_id
            }).then(function(response){
                console.log(response);
                var result = response.data.result;
                console.log("satisfy",result);
                this.setState({satisfy:result});
                console.log(this.state.satisfy);
            }.bind(this));
        }
    }

    openPopup = () => {
        this.setState({
            isOpenPopup: true
        })
    }
    closePopup = () => {
        this.setState({
            isOpenPopup: false
        })
    }

    openResult = () => {
        this.setState({
            isOpenResult: true
        })
    }
    closeResult = () => {
        this.setState({
            isOpenResult: false
        })
    }

    render(){
        var data = this.props.data;
        var origin = this.props.origin;
        var list = [];
        for(var i=0; i<data.length; i++){
            var abeekStr = data[i].abeek_name1 + "\n" + data[i].abeek_name2;
            var check = false;
            for(var j = 0;j<origin.length;j++){
                if(data[i].course_id === origin[j].course_id && data[i].year === origin[j].year && data[i].semester === origin[j].semester) check = true;
            }
            if(this.props.id === 2 && check){
                list.push(                        
                    <tr key={data[i].id}>
                        <td>{data[i].division_name}</td>
                        <td>{abeekStr}</td>
                        <td>{data[i].title}</td>
                        <td>{data[i].year}</td>
                        <td>{data[i].semester}</td>
                        <td>{data[i].credit}</td>
                        <td>{data[i].GP}</td>
                        <td></td>
                    </tr>);

            }else{
                list.push(                        
                    <tr key={data[i].id}>
                        <td>{data[i].division_name}</td>
                        <td>{abeekStr}</td>
                        <td>{data[i].title}</td>
                        <td>{data[i].year}</td>
                        <td>{data[i].semester}</td>
                        <td>{data[i].credit}</td>
                        <td>{data[i].GP}</td>
                        <td><button id={data[i].id} onClick={function(e){
                            e.preventDefault();
                            this.props.onDelete(e.target.id);
                            console.log(e.target.id);
                        }.bind(this)}>삭제</button></td>
                    </tr>);
            }
        }
        var _button = this.props.id === 1 ? 
        <button className="table" onClick={function(e){
            e.preventDefault();
            this.props.onSave();
        }.bind(this)}>저장</button>
        : <button className="table" onClick={function(e){
            e.preventDefault();
            this.openResult();
        }.bind(this)}>결과</button>

        return(
            <form className="table">
                    <div id="popup"></div>
                    <table className="tb">
                        <thead>
                            <tr>
                                <th>이수구분</th>
                                <th>공학인증</th>
                                <th>과목명</th>
                                <th>이수년도</th>
                                <th>이수학기</th>
                                <th>학점</th>
                                <th>등급</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody id="tbody">
                            {list}
                        </tbody>
                    </table>
                    <div className="table">
                        <button className="table" onClick={function(e){
                            e.preventDefault();
                            this.openPopup();
                        }.bind(this)}>추가</button>
                        {this.state.isOpenPopup &&
                            <PopupDom>
                                <Popup id={this.props.id} data={data} onAdd={this.props.onAdd} onClose={this.closePopup} credit={this.props.credit}/>
                            </PopupDom>
                        }
                        {_button}
                        {this.state.isOpenResult &&
                            <PopupDom>
                                <Popup id={3} data={data} onClose={this.closeResult} criteria={this.props.criteria} credit={this.props.credit} satisfy={this.state.satisfy}/>
                            </PopupDom>
                        }
                    </div>
                </form>
            
        );
    }
}

export default Table;