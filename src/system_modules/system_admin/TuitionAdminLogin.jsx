import React from "react";
import axios from "axios";
import querystring from "querystring";
import  { Redirect } from 'react-router-dom'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
  Row
} from "reactstrap";

class TuitionAdminLogin extends React.Component {
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
	
	
	
	
  componentDidMount() {
    document.body.classList.toggle("login-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("login-page");
  }
  render() {
    return (
      <div className="login-page" style={{backgroundColor: 'black',top:'0', bottom:'0', left:'0', right:'0', position: 'absolute'}} >
		<br/>
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="4" md="6">
              <Form action="" className="form" method="">
                <Card className="card-login">
                  <CardHeader>
                    <CardHeader>
                      <h3 className="header text-center">Tuition Admin Login</h3>
                    </CardHeader>
                  </CardHeader>
                  <CardBody>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="nc-icon nc-single-02" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Staff Number" type="text" name="AttemptedUserName" value={this.state.AttemptedUserName} onChange={this.handleChange} autofocus />
                    </InputGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="nc-icon nc-key-25" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        autoComplete="off"
		                name="AttemptedPassword"
		                value={this.state.AttemptedPassword}
		                onChange={this.handleChange}
                      />
                    </InputGroup>
                    <br />
                    <FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input
                            defaultChecked
                            defaultValue=""
                            type="checkbox"
                          />
                          <span className="form-check-sign" />
                          Subscribe to newsletter
                        </Label>
                      </FormGroup>
                    </FormGroup>
                  </CardBody>
                  <CardFooter>
                    <Button
                      block
                      className="btn-round mb-3"
                      color="warning"
                      href="#pablo"
                      onClick={this.handleSubmit}
                    >
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
              </Form>
            </Col>
          </Row>
        </Container>
        
          
      </div>
    );
  }
}

export default TuitionAdminLogin;
