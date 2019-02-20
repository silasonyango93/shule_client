import React from "react";
import axios from "axios";
import querystring from "querystring";
import  { Redirect } from 'react-router-dom'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ip from "../../common/EndPoints.js";
import Button from "components/CustomButtons/Button.jsx";


// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  FormText,
  Row,
  Col
} from "reactstrap";


class AcademicClassLevelConfig extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        AcademicClassLevelName: '',
		AcademicClassLevelDescription: '',
		HierarchyCode: ''
		
    };

      
	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.handleChange = this.handleChange.bind(this);
	  
  }

  componentWillMount() {
	  
	  
      var StaffNo=window.sessionStorage.getItem("StaffNo");
	  
	  if(StaffNo===null){this.props.history.push('/tuition_admin_login');}
	  
	  

  }
	
	handleSubmit(event){ 
      event.preventDefault();
		
		if(this.state.AcademicClassLevelName===""||this.state.AcademicClassLevelDescription===""||this.state.HierarchyCode===""){alert("Kindly fill in every field on the form");}else if(this.state.HierarchyCode !== parseInt(this.state.HierarchyCode, 10)){
		 alert("The hierarchy code must strictly be an integer");
		
		}else{
		
      axios.post(ip+"/add_academic_class_levels", querystring.stringify({ AcademicClassLevelName: this.state.AcademicClassLevelName,
																          AcademicClassLevelDescription: this.state.AcademicClassLevelDescription,
																		  HierarchyCode: this.state.HierarchyCode}))
		.then((response) => {
		  
		  alert(response.data.results.message);
		  
		  this.setState({
          ...this.state,
          AcademicClassLevelName: '',
		  AcademicClassLevelDescription: '',
		  HierarchyCode: ''
          });
		 
    
    } )
     .catch((response) => {
        //handle error
        console.log(response);
      });
	} 
 }
   
	
	
	handleChange(event) {    
    let newState = this.state
    newState[event.target.name] = event.target.value
    let prop = event.target.name
        this.setState({
          ...newState     
        });
		
	}
	
	
	
	
    

  render() {
    return (
      <div>
		<Row style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
		 <Col md="6">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Class levels Configuration</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form className="form-horizontal" >
                    <Row>
                      <Label md="3">Class Level</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input placeholder="Academic Class Level" type="text" name="AcademicClassLevelName" value={this.state.AcademicClassLevelName} type="text" onChange={this.handleChange} autofocus />
                        </FormGroup>
                      </Col>
                    </Row>
		
		            <Row>
                      <Label md="3">Description</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input placeholder="Description" type="text" name="AcademicClassLevelDescription" value={this.state.AcademicClassLevelDescription} type="text" onChange={this.handleChange} autofocus />
                        </FormGroup>
                      </Col>
                    </Row>
		
		            <Row>
                      <Label md="3">Hierarchy</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input placeholder="Hierarchy Number" type="text" name="HierarchyCode" value={this.state.HierarchyCode} type="text" onChange={this.handleChange} autofocus />
                        </FormGroup>
                      </Col>
                    </Row>
                    
                  </Form>
                </CardBody>
                <CardFooter>
                  <Row>
                    <Col md="3" />
                    <Col md="9">
                      <Button className="btn-round" color="info" type="submit" onClick={this.handleSubmit}>
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
		</Row>
      
      </div>
    );
  }
}

export default AcademicClassLevelConfig;