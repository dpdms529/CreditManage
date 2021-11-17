import React, {Component} from "react";
import '../stylesheets/table.css'

class Table extends Component{
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
                <td>X</td>
            </tr>);
        }
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
                        {list}
                    </tbody>
                </table>
            </form>
        );
    }
}

export default Table;