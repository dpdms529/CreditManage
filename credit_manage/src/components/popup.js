import axios from "axios";
import React, {Component} from "react";
import "../stylesheets/popup.css";

class Popup extends Component{
    constructor(props) {
        super(props);
        this.state={
            content:"", // 검색어
            division:"", //이숙구분
            year:this.props.id===1?"전체":"2021",
            GP:'A+',
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

        axios.post("http://210.117.182.234:8081/~s201912352/search2.php",
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
        var _id = len===0?0:propsData[len-1].id+1;
        var list = [];
        for(var i = 0;i<data.length;i++) {
            if(i > 0 && data[i].course_id === data[i-1].course_id && data[i].year === data[i-1].year && data[i].semester === data[i-1].semester) continue;
            if(this.props.id === 1){
                list.push(
                    <tr key = {i}>
                        <td>{data[i].course_id}</td>
                        <td>{data[i].title}</td>
                        <td>{data[i].division_name}</td>
                        <td>{data[i].abeek_name1 + " " + data[i].abeek_name2}</td>
                        <td>{data[i].year}</td>
                        <td>{data[i].semester}</td>
                        <td>{data[i].credit}</td>
                        <td>
                            <select size="1" onChange={this.handleChange} name="GP">
                                <option>A+</option>
                                <option>A</option>
                                <option>B+</option>
                                <option>B</option>
                                <option>C+</option>
                                <option>C</option>
                                <option>D</option>
                                <option>D+</option>
                                <option>F</option>
                            </select>
                        </td>
                        <td><button id={i} onClick={function(e){
                            e.preventDefault();
                            data[e.target.id].id = _id;
                            data[e.target.id].key = _id;
                            data[e.target.id].GP = this.state.GP;
                            this.props.onAdd([data[e.target.id]]);
                        }.bind(this)}>추가</button></td>
                    </tr>
                )
            }else if(this.props.id === 2){
                list.push(
                    <tr key = {i}>
                        <td>{data[i].course_id}</td>
                        <td>{data[i].title}</td>
                        <td>{data[i].division_name}</td>
                        <td>{data[i].abeek_name1 + " " + data[i].abeek_name2}</td>
                        <td><input name="year" type="number" min={2021} defaultValue={2021} style={{width:"60px"}} onChange={this.handleChange}></input></td>
                        <td>{data[i].semester}</td>
                        <td>{data[i].credit}</td>
                        <td>
                            <select size="1" onChange={this.handleChange} name="GP">
                                <option>A+</option>
                                <option>A</option>
                                <option>B+</option>
                                <option>B</option>
                                <option>C+</option>
                                <option>C</option>
                                <option>D</option>
                                <option>D+</option>
                                <option>F</option>
                            </select>
                        </td>
                        <td><button id={i} onClick={function(e){
                            e.preventDefault();
                            data[e.target.id].id = _id;
                            data[e.target.id].key = _id;
                            data[e.target.id].GP = this.state.GP;
                            data[e.target.id].year = this.state.year;
                            this.props.onAdd([data[e.target.id]]);
                        }.bind(this)}>추가</button></td>
                    </tr>
                )
            }
            

        }
        var _content;
        if(this.props.id === 1){
            _content = <div>
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
                                            <option value='02'>전공필수</option>
                                            <option value='03'>전공선택</option>
                                            <option value='01'>교양</option>
                                            <option value='05'>일반선택</option>
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
                                            <th>등급</th>
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
        }else if(this.props.id === 2){
            _content = <div>
                            <h2 className="title popup">과목 검색</h2>
                            <form className="popup search">
                                <div className="popup">
                                    <div>
                                        <label className="popup">이수구분</label>
                                        <select size="1"onChange={this.handleChange} name="division">
                                            <option>전체</option>
                                            <option value='02'>전공필수</option>
                                            <option value='03'>전공선택</option>
                                            <option value='01'>교양</option>
                                            <option value='05'>일반선택</option>
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
                                            <th>예상연도</th>
                                            <th>예상학기</th>
                                            <th>학점</th>
                                            <th>등급</th>
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
        }else if(this.props.id === 3){
            _content = <div>
                            <h2 className="title popup">졸업 시뮬레이션 결과</h2>
                            <form className="popup">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="result" colSpan="5" style={{borderRight:"1px grey solid"}}>졸업구분</th>
                                            <th className="result" colSpan="4">공학인증 구분</th>
                                        </tr>
                                        <tr>
                                            <th className="result">전공필수</th>
                                            <th className="result">전공선택</th>
                                            <th className="result">교양</th>
                                            <th className="result">공필/일선</th>
                                            <th className="result" style={{borderRight:"1px grey solid"}}>취득학점</th>
                                            <th className="result">BSM</th>
                                            <th className="result">전문교양</th>
                                            <th className="result">공학주제</th>
                                            <th className="result">설계</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td style={{borderRight:"1px grey solid"}}>0/140</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                            <button className="popup close" onClick={this.props.onClose}>닫기</button>
                        </div>
        }
        return (
            <div className="popupWrapper">
                {_content}  
            </div>   
        );
    }
}

export default Popup;


