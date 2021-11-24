import axios from "axios";
import React,{Component} from "react";
import "../stylesheets/login.css";

class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            id:"",
            pwd:""
        }
    }

    handleChange = (e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        console.log(e.target.id.value);
        if(e.target.id.value==="") alert("학번을 입력하세요");
        else if(e.target.pwd.value==="") alert("비밀번호를 입력하세요");
        else{
            axios.post("http://210.117.182.234:8080/~s201912352/login.php",
            {
                id:this.state.id,
                pwd:this.state.pwd
            }).then(function(response){
                console.log(response.data.result.id);
                window.location.href="/?user_id="+response.data.result.id;
            });

        }
    }
    
    render(){
        return(
            <form className="login" onSubmit={this.handleSubmit}>
                <div className="login">
                    <label className="login">학번</label>
                    <input name="id" type="text" onChange={this.handleChange}/>
                </div>
                <div className="login">
                    <label className="login">비밀번호</label>
                    <input name="pwd" type="password" onChange={this.handleChange}/>
                </div>     
                <button className="login" type="submit">로그인</button>
            </form>
        );
    }
}

export default Login;