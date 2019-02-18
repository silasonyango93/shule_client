import React from "react";
import axios from "axios";
import querystring from "querystring";
import  { Redirect } from 'react-router-dom'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ip from "../../common/EndPoints.js";
import Select from "react-select";


// reactstrap components
import {
  Button,
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


class AdminLogin extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        DepartmentTypes: [],
		SelectedDepartmentType:'',
		DepartmentName:'',
		DepartmentDescription:'',
		DepartmentRefNo:'',
		
		
    };

      
	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.handleChange = this.handleChange.bind(this);
	  
  }

  componentWillMount(){
    
	  axios.post(ip+'/get_all_department_types')
		.then((response) => {
        
		  var my_json=response.data.results;
		 
		  var jsonArray=[];
		  var jsonObject= null;
		  
		  my_json.forEach((item) => {
            
			  jsonObject={value:item.DepartmentTypeId,label:item.DepartmentTypeDescription}
			  jsonArray.push(jsonObject);
			  
        });
		    
		this.setState({
          ...this.state,
          DepartmentTypes: jsonArray
        });
		  
		 console.log(jsonArray);
		  
        })
        
    
     .catch((response) => {
        //handle error
        console.log(response);
      });
	  
	  

  }
	
	handleSubmit(event){ 
      event.preventDefault();
		
		
		
      axios.post(ip+"/add_departments", querystring.stringify({ DepartmentTypeId: this.state.SelectedDepartmentType.value,
															    DepartmentName: this.state.DepartmentName,
															    DepartmentDescription: this.state.DepartmentDescription,
															    DepartmentRefNo: this.state.DepartmentRefNo}))
		.then((response) => {
        alert("Department added succesfully");
		  
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
	
	
	
	
    

  render() {
    return (
      <div>
		<Row style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
		 <Col md="6">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Department Registration</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form className="form-horizontal" >
		            <Row>
                      <Label md="3">Type</Label>
                      <Col md="9">
                        <FormGroup>
		            <Select
                            className="react-select info"
                            classNamePrefix="react-select"
                            placeholder="Choose Type"
                            name="SelectDepartmentType"
                            closeMenuOnSelect={false}
                            value={this.state.SelectedDepartmentType}
                            onChange={value =>
                              this.setState({
                              ...this.state,
                                      SelectedDepartmentType: value
                              })
	  
                            }
                            options={this.state.DepartmentTypes}
                          />
		            </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">Name</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input placeholder="Department Name" type="text" name="DepartmentName" value={this.state.DepartmentName} type="text" onChange={this.handleChange} autofocus />
                        </FormGroup>
                      </Col>
                    </Row>
		            <Row>
                      <Label md="3">Description</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input placeholder="Description" type="text" name="DepartmentDescription" value={this.state.DepartmentDescription} type="text" onChange={this.handleChange} autofocus />
                        </FormGroup>
                      </Col>
                    </Row>
		            <Row>
                      <Label md="3">Reference No.</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input placeholder="Reference Number" type="text" name="DepartmentRefNo" value={this.state.DepartmentRefNo} type="text" onChange={this.handleChange} autofocus />
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

export default AdminLogin;