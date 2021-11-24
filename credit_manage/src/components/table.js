import React, {Component} from "react";
import '../stylesheets/table.css';

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
                <td><button id={data[i].id} onClick={function(e){
                    e.preventDefault();
                    this.props.onDelete(e.target.id);
                    console.log(e.target.id);
                }.bind(this)}>삭제</button></td>
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
                <button className="center" onClick={function(e){
                    e.preventDefault();
                    var _id;
                    if(data.length===0){
                        _id = 1;
                    }else{
                        _id = data[data.length-1].id+1;
                    }
                    this.props.onAdd({id:_id, div:'전공선택',abeek:'요소설계',subject:'병렬분산시스템',year:'2021',semester:'2',credit:'3',score:'A+'});
                    var option = "width = 1000, height = 500, top = 100, left = 200, location = no";
                    window.open('/popup','팝업',option);

                }.bind(this)}>추가</button>
                
            </form>
        );
    }
}

export default Table;