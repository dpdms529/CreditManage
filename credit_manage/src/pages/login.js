import React,{Component} from "react";
import "../stylesheets/login.css";

class Login extends Component{
    render(){
        return(
            <form class="login" action="/">
                <table>
                    <tbody>
                        <tr>
                            <th>학번</th>
                            <td><input></input></td>
                        </tr>
                        <tr>
                            <th>비밀번호</th>
                            <td><input></input></td>
                        </tr>
                    </tbody>
                </table>
                <button>버튼</button>
            </form>
        );
    }
}

export default Login;