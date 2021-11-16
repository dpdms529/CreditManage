import React, {Component} from "react";

class Table extends Component{
    render(){
        return(
            <form>
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
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>전공선택</td>
                            <td>요소설계</td>
                            <td>데이터베이스</td>
                            <td>2021</td>
                            <td>2</td>
                            <td>3</td>
                            <td>A+</td>
                        </tr>
                    </tbody>
                </table>
            </form>
        );
    }
}

export default Table;