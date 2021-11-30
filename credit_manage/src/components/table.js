import React, {Component} from "react";
import '../stylesheets/table.css';
import PopupDom from "../pages/popupDom";
import Popup from '../components/popup';

class Table extends Component{
    constructor(props){
        super(props);
        this.state = {
            isOpenPopup: false
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

    render(){
        var data = this.props.data;
        var list = [];
        for(var i=0; i<data.length; i++){
            list.push(                        
            <tr key={data[i].id}>
                <td>{data[i].div}</td>
                <td>{data[i].abeek}</td>
                <td>{data[i].subject}</td>
                <td>{data[i].year}</td>
                <td>{data[i].semester}</td>
                <td>{data[i].credit}</td>
                <td>{data[i].score}</td>
                <td><button id={data[i].id} onClick={function(e){
                    e.preventDefault();
                    this.props.onDelete(e.target.id);
                    console.log(e.target.id);
                }.bind(this)}>삭제</button></td>
            </tr>);
        }

        return(
            <form>
                <div id="popup"></div>
                <table>
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
                <button className="center" onClick={function(e){
                    e.preventDefault();
                    this.openPopup();
                }.bind(this)}>추가</button>
                {this.state.isOpenPopup &&
                    <PopupDom>
                        <Popup data={data} onAdd={this.props.onAdd} onClose={this.closePopup}/>
                    </PopupDom>
                }
            </form>
        );
    }
}

export default Table;