import axios from "axios";
import React,{Component} from "react";
import "../stylesheets/login.css";

class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            id:"",
            name:"",
            grade:"",
            pwd:"",
        }
    }

    handleChange = (e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleLoginSubmit = (e)=>{
        e.preventDefault();
        // console.log(e.target.id.value);
        if(e.target.id.value==="") alert("학번을 입력하세요");
        else if(e.target.pwd.value==="") alert("비밀번호를 입력하세요");
        else{
            axios.post("http://210.117.182.234:8081/~s201912352/login.php",
            {
                id:this.state.id,
                pwd:this.state.pwd
            }).then(function(response){
                console.log(response);
                var result = response.data.result;
                console.log(result);
                if(result === "fail") alert("로그인 실패");
                else if(result === "not") alert("아이디/비밀번호를 다시 확인해주세요!");
                else {
                    this.props.onLogin(result);
                    window.location.href="/?student_id="+ result.student_id;
                }
            }.bind(this));

        }
    }

    handleRegisterSubmit = (e)=>{
        e.preventDefault();
        console.log(e.target.id.value);
        if(e.target.id.value==="") alert("학번을 입력하세요");
        else if(e.target.name.value==="") alert("이름을 입력하세요");
        else if(e.target.grade.value==="") alert("학년을 입력하세요");
        else if(e.target.pwd.value==="") alert("비밀번호를 입력하세요");
        else{
            axios.post("http://210.117.182.234:8081/~s201912352/register.php",
            {
                id:this.state.id,
                name:this.state.name,
                grade:this.state.grade,
                pwd:this.state.pwd
            }).then(function(response){
                console.log(response);
                if(response.data.result === "fail") alert("회원가입 실패");
                // else alert("회원가입");
                else window.location.href="/login";
            });

        }
    }
    
    render(){
        var _content = null;
        switch(this.props.id){
            case 3:
                _content = <form className="login" onSubmit={this.handleLoginSubmit}>
                                <div className="login">
                                    <label className="login">학번</label>
                                    <input className="login" name="id" type="text" onChange={this.handleChange}/>
                                </div>
                                <div className="login">
                                    <label className="login">비밀번호</label>
                                    <input className="login" name="pwd" type="password" onChange={this.handleChange}/>
                                </div>     
                                <button className="login" type="submit">로그인</button>
                                <a className="login" href = "register">회원가입</a>
                            </form>
                break;
            case 4: 
                _content = <form className="login" onSubmit={this.handleRegisterSubmit}>
                                <div className="login">
                                    <label className="login">학번</label>
                                    <input className="login" name="id" type="text" onChange={this.handleChange}/>
                                </div>
                                <div className="login">
                                    <label className="login">이름</label>
                                    <input  className="login" name="name" type="text" onChange={this.handleChange}/>
                                </div>
                                <div className="login">
                                    <label className="login">학년</label>
                                    <input className="login" name="grade" type="text" onChange={this.handleChange}/>
                                </div>
                                <div className="login">
                                    <label className="login">비밀번호</label>
                                    <input className="login" name="pwd" type="password" onChange={this.handleChange}/>
                                </div>     
                                <button className="login" type="submit">회원가입</button>
                            </form>
                break;
            default:

        }
        return(
            <div>
                {_content}
            </div>
        );
    }
}

export default Login;