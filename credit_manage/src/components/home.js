import React, {Component} from "react";

class Home extends Component{
    render(){
        return(
            <div class="content">
                <div class="btn">
                    <a href="manage" onClick={function(e){
                        e.preventDefault();
                        this.props.onChangeMode('manage');
                    }.bind(this)}>이수과목관리</a>
                </div>
                <div class="btn">
                    <a href="graduate" onClick={function(e){
                        e.preventDefault();
                        this.props.onChangeMode('graduate');
                    }.bind(this)}>졸업시뮬레이션</a>
                </div>
            </div>
        );

    }
}

export default Home;