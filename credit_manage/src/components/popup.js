import React, {Component} from "react";
import "../stylesheets/popup.css";

class Popup extends Component{
    render(){
        var data = this.props.data;
        var len = data.length;
        var _id = len===0?1:data[len-1].id+1;
        var list = [
        <tr key={1}>
            <td>00001234</td>
            <td>수치해석</td>
            <td>전공선택</td>
            <td>공학주제</td>
            <td>2021</td>
            <td>2</td>
            <td>3</td>
            <td><button onClick={function(e){
                        e.preventDefault();
                        this.props.onAdd({id:_id, div:'전공선택',abeek:'요소설계',subject:'수치해석',year:'2021',semester:'2',credit:'3',score:'A+'});
                    }.bind(this)}>추가</button></td>
        </tr>,
        <tr key={2}>
            <td>00001234</td>
            <td>프로그래밍언어론</td>
            <td>전공선택</td>
            <td>공학주제</td>
            <td>2021</td>
            <td>2</td>
            <td>3</td>
            <td><button onClick={function(e){
                        e.preventDefault();
                        this.props.onAdd({id:_id, div:'전공선택',abeek:'요소설계',subject:'수치해석',year:'2021',semester:'2',credit:'3',score:'A+'});
                    }.bind(this)}>추가</button></td>
        </tr>,
        ];
        return (
            <div className="popupWrapper">
                <h2 className="title popup">과목 검색</h2>
                <form className="popup search">
                    <div className="popup">
                        <div>
                            <label className="popup">연도</label>
                            <select size="1">
                                <option>전체</option>
                                <option>2021</option>
                                <option>2020</option>
                                <option>2019</option>
                                <option>2018</option>
                                <option>2017</option>
                            </select>
                            <label className="popup">이수구분</label>
                            <select size="1">
                                <option>전체</option>
                                <option>전공필수</option>
                                <option>전공선택</option>
                                <option>교양</option>
                                <option>일반선택</option>
                            </select>
                            <label className="popup">공학구분</label>
                            <span className="popup checkbox">
                                <label><input type="checkbox" name="abeek" value="BSM"/>BSM</label>
                                <label><input type="checkbox" name="abeek" value="전문교양"/>전문교양</label>
                                <label><input type="checkbox" name="abeek" value="공학주제"/>공학주제</label>
                                <label><input type="checkbox" name="abeek" value="설계"/>설계</label>
                            </span>
                            
                        </div>
                        <div>
                            <span className="popup">
                                <label className="popup">과목명</label>
                                <input placeholder="과목명을 입력하세요" style={{margin:"10px", padding:"5px", width:"550px"}}/>
                            </span>
                            <button className="popup" onClick={function(){
                                
                            }}>검색</button>
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
                                <th>이수년도</th>
                                <th>이수학기</th>
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


