import React, {Component} from "react";
import "../stylesheets/popup.css";

class Popup extends Component{
    render(){
        return (
                <form className="popup">
                    <span className="popup">
                        <label className="popup">이수구분</label>
                        <select size="1">
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
                        <span className="popup">
                            <input placeholder="과목명을 입력하세요" style={{width:"80%"}}/>
                        </span>
                    </span>
                    <button className="popup">검색</button>
                </form>
        );
    }
}

export default Popup;


