import axios from "axios";
import React, {Component} from "react";
import "../stylesheets/popup.css";

class Popup extends Component{
    constructor(props) {
        super(props);
        this.state={
            content:"", // 검색어
            division:"", //이숙구분
            year:"전체",
            abeek_bsm:false, // BSM
            abeek_liberal:false, // 전문교양
            abeek_tech:false, // 공학주제
            abeek_design:false, // 설계
            data: []
        }
    }

    handleChangeCheck = (e) => {
        this.setState({
            [e.target.value]:e.target.checked
        })

        console.log(e.target.value, e.target.checked);

    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
        console.log(e.target.value);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.content, this.state.year, this.state.division, this.state.abeek_bsm, this.state.abeek_liberal, this.state.abeek_tech, this.state.abeek_design);

        axios.post("http://210.117.182.234:8080/~s201912352/search.php",
        {
            content:this.state.content, // 검색어
            division:this.state.division,
            year:this.state.year,
            abeek_bsm:this.state.abeek_bsm, // BSM
            abeek_liberal:this.state.abeek_liberal, // 전문교양
            abeek_tech:this.state.abeek_tech, // 공학주제
            abeek_design:this.state.abeek_design // 설계
        }).then((response) => {
            console.log(response.data);
            this.setState({
                data: response.data.result
            })
        });

    }

    render(){
        var propsData = this.props.data;
        var data = this.state.data;
        var len = propsData.length;
        var _id = len===0?1:propsData[len-1].id+1;
        var list = [];
        for(var i = 0;i<data.length;i++) {
            if(i !== data.length-1 && data[i].course_id === data[i+1].course_id && data[i].year === data[i+1].year && data[i].semester === data[i+1].semester) {
                list.push(
                    <tr key = {i}>
                        <td>{data[i].course_id}</td>
                        <td>{data[i].title}</td>
                        <td>{data[i].division_name}</td>
                        <td>{data[i].abeek_name + "\n" + data[i+1].abeek_name}</td>
                        <td>{data[i].year}</td>
                        <td>{data[i].semester}</td>
                        <td>{data[i].credit}</td>
                        <td><button id={i} onClick={function(e){
                            e.preventDefault();
                            this.props.onAdd({id:_id, division_name: data[e.target.id].division_name ,abeek_name: `${data[e.target.id].abeek_name + data[e.target.id+1].abeek_name}` , title:data[e.target.id].title, year: data[e.target.id].year, semester:data[e.target.id].semester, credit: data[e.target.id].credit, GP:'A+'});
                        }.bind(this)}>추가</button></td>
                    </tr>
                )
                i++;
            } else {
                list.push(
                    <tr key = {i}>
                        <td>{data[i].course_id}</td>
                        <td>{data[i].title}</td>
                        <td>{data[i].division_name}</td>
                        <td>{data[i].abeek_name}</td>
                        <td>{data[i].year}</td>
                        <td>{data[i].semester}</td>
                        <td>{data[i].credit}</td>
                        <td><button id={i} onClick={function(e){
                            e.preventDefault();
                            this.props.onAdd({id:_id, division_name: data[e.target.id].division_name ,abeek_name: data[e.target.id].abeek_name,title:data[e.target.id].title,year: data[e.target.id].year, semester:data[e.target.id].semester, credit: data[e.target.id].credit, GP:'A+'});
                        }.bind(this)}>추가</button></td>
                    </tr>
                )
            }

        }
        return (
            <div className="popupWrapper">
                <h2 className="title popup">과목 검색</h2>
                <form className="popup search">
                    <div className="popup">
                        <div>
                            <label className="popup">연도</label>
                            <select size="1" onChange={this.handleChange} name="year">
                                <option>전체</option>
                                <option>2021</option>
                                <option>2020</option>
                                <option>2019</option>
                                <option>2018</option>
                                <option>2017</option>
                            </select>
                            <label className="popup">이수구분</label>
                            <select size="1"onChange={this.handleChange} name="division">
                                <option>전체</option>
                                <option>전공필수</option>
                                <option>전공선택</option>
                                <option>교양</option>
                                <option>일반선택</option>
                            </select>
                            <label className="popup">공학구분</label>
                            <span className="popup checkbox">
                                <label><input type="checkbox" name="abeek" value="abeek_bsm" onChange={this.handleChangeCheck}/>BSM</label>
                                <label><input type="checkbox" name="abeek" value="abeek_liberal" onChange={this.handleChangeCheck}/>전문교양</label>
                                <label><input type="checkbox" name="abeek" value="abeek_tech" onChange={this.handleChangeCheck}/>공학주제</label>
                                <label><input type="checkbox" name="abeek" value="abeek_design" onChange={this.handleChangeCheck}/>설계</label>
                            </span>
                            
                        </div>
                        <div>
                            <span className="popup">
                                <label className="popup">과목명</label>
                                <input placeholder="과목명을 입력하세요" onChange={this.handleChange} name="content" style={{margin:"10px", padding:"5px", width:"550px"}}/>
                            </span>
                            <button className="popup" onClick={this.handleSubmit}>검색</button>
                        </div>
                    </div>
                </form>

                <form className="popup content">
                    <table>
                        <thead>
                            <tr>
                                <th>과목코드</th>
                                <th>과목명</th>
                                <th>이수구분</th>
                                <th>공학인증</th>
                                <th>개설년도</th>
                                <th>개설학기</th>
                                <th>학점</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody id="tbody">
                            {list}
                        </tbody>
                    </table>
                </form>
                <button className="popup close" onClick={this.props.onClose}>닫기</button>

            </div>
                
        );
    }
}

export default Popup;


