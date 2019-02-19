import React from "react";
import axios from "axios";
import querystring from "querystring";
import  { Redirect } from 'react-router-dom'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class AdminLogin extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        AttemptedUserName: '',
		AttemptedPassword: '',
		login_error:true,
		login_credentials:[]
		
    };

      
	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.handleChange = this.handleChange.bind(this);
	  
  }

  componentDidUpdate() {
    //console.log(this.state.login_credentials);

  }
	
	handleSubmit(event){ 
      event.preventDefault();
		
		
		
      axios.post('http://127.0.0.1:5000/user_login', querystring.stringify({ AttemptedStaffNo: this.state.AttemptedUserName,AttemptedPassword: this.state.AttemptedPassword }))
		.then((response) => {
        this.setState({
          ...this.state,
          login_credentials: response.data,login_error:response.data.error
			
        });
		  console.log(response);
        window.sessionStorage.setItem("StaffNo", response.data.StaffNo);
		window.sessionStorage.setItem("Surname", response.data.Surname); 
		this.my_router();
    } )
     .catch((response) => {
        //handle error
        console.log(response);
      });
     
 }
   
	
	
	handleChange(event) {    
    let newState = this.state
    newState[event.target.name] = event.target.value
    let prop = event.target.name
        this.setState({
          ...newState     
        });
		
	}
	
	
	my_router = () => {
		if(!(this.state.login_error)){this.props.history.push('/Admin/config_department_types');}else{alert("Wrong credentials!\nKindly try again.");}
    
  }
	
    

  render() {
    return (
      <div>
		
        <div class="container">
		<br/>
		<br/>
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <div class="login-panel panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">Please Sign In</h3>
                    </div>
                    <div class="panel-body">
                        <form action="" method="POST" onSubmit={this.handleSubmit} encType="multipart/form-data">
                            <fieldset>
                                <div class="form-group">
                                    <input name="AttemptedUserName" class="form-control" placeholder="UserName" value={this.state.AttemptedUserName} type="text" onChange={this.handleChange} autofocus />
                                </div>
                                <div class="form-group">
                                    <input name="AttemptedPassword" class="form-control" placeholder="Password" value={this.state.AttemptedPassword} type="password" onChange={this.handleChange} />
                                </div>
                                <div class="checkbox">
                                    <label>
                                        <input name="remember" type="checkbox" value="Remember Me" />Remember Me
                                    </label>
                                </div>
                                
                                 <button type="submit" class="btn btn-lg btn-success btn-block">Login</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
        
      
      </div>
    );
  }
}

export default AdminLogin;