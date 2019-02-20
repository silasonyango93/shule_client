import React from "react";
import axios from "axios";
import querystring from "querystring";
import  { Redirect } from 'react-router-dom'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ip from "../../common/EndPoints.js";
import Select from "react-select";
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


class FieldRegistration extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        FieldCategories: [],
		Departments: [],
		SelectedFieldCategory:'',
		SelectedDepartment:'',
		FieldName:'',
		FieldDescription:'',
		FieldRefNo:''
		
		
    };

      
	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.handleChange = this.handleChange.bind(this);
	  
  }

  componentWillMount(){
	  
	  
	  
      var StaffNo=window.sessionStorage.getItem("StaffNo");
	  
	  if(StaffNo===null){this.props.history.push('/tuition_admin_login');}else{
    
		  
	//First axios for Field categories  
	  axios.post(ip+'/get_all_field_categories')
		.then((response) => {
        
		  var my_json=response.data.results;
		 
		  var jsonArray=[];
		  var jsonObject= null;
		  
		  my_json.forEach((item) => {
            
			  jsonObject={value:item.FieldCategoryId,label:item.FieldCategoryDescription}
			  jsonArray.push(jsonObject);
			  
        });
		    
		this.setState({
          ...this.state,
          FieldCategories: jsonArray
        });
		  
		 
		  
        })
        
    
     .catch((response) => {
        //handle error
        console.log(response);
      });
	  
	//**********************************************************************************************
		  
		//Second axios for Departments	  
	  axios.post(ip+'/get_all_departments')
		.then((response) => {
        
		  var my_json=response.data.results;
		 
		  var jsonArray=[];
		  var jsonObject= null;
		  
		  my_json.forEach((item) => {
            
			  jsonObject={value:item.DepartmentId,label:item.DepartmentName}
			  jsonArray.push(jsonObject);
			  
        });
		    
		this.setState({
          ...this.state,
          Departments: jsonArray
        });
		  
		 
		  
        })
        
    
     .catch((response) => {
        //handle error
        console.log(response);
      });
		  
		  
		  
	  }  

  }
	
	handleSubmit(event){ 
      event.preventDefault();
		
		if(this.state.SelectedFieldCategory===""||this.state.SelectedDepartment===""||this.state.FieldName===""||this.state.FieldDescription===""||this.state.FieldRefNo===""){alert("Kindly fill in every field on the form");}else{
		
      axios.post(ip+"/add_fields_", querystring.stringify({ FieldCategoryId: this.state.SelectedFieldCategory.value,
															DepartmentId: this.state.SelectedDepartment.value,
															FieldName: this.state.FieldName,
															FieldDescription: this.state.FieldDescription,
															FieldRefNo: this.state.FieldRefNo}))
		.then((response) => {
        
		  alert(response.data.results.message);
		  
		  this.setState({
          ...this.state,
          SelectedFieldCategory:'',
		  SelectedDepartment:'',
		  FieldName:'',
		  FieldDescription:'',
		  FieldRefNo:''
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
                  <CardTitle tag="h4">Field Registration</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form className="form-horizontal" >
		            <Row>
                      <Label md="3">Category</Label>
                      <Col md="9">
                        <FormGroup>
		            <Select
                            className="react-select info"
                            classNamePrefix="react-select"
                            placeholder="Select Category"
                            name="SelectFieldCategory"
                            closeMenuOnSelect={false}
                            value={this.state.SelectedFieldCategory}
                            onChange={value =>
                              this.setState({
                              ...this.state,
                                      SelectedFieldCategory: value
                              })
	  
                            }
                            options={this.state.FieldCategories}
                          />
		            </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Label md="3">Department</Label>
                      <Col md="9">
                        <FormGroup>
		            <Select
                            className="react-select info"
                            classNamePrefix="react-select"
                            placeholder="Select Department"
                            name="SelectDepartment"
                            closeMenuOnSelect={false}
                            value={this.state.SelectedDepartment}
                            onChange={value =>
                              this.setState({
                              ...this.state,
                                      SelectedDepartment: value
                              })
	  
                            }
                            options={this.state.Departments}
                          />
		            </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Label md="3">Name</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input placeholder="E.g Mathematics" type="text" name="FieldName" value={this.state.FieldName} type="text" onChange={this.handleChange} autofocus />
                        </FormGroup>
                      </Col>
                    </Row>
		            <Row>
                      <Label md="3">Description</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input placeholder="Description" type="text" name="FieldDescription" value={this.state.FieldDescription} type="text" onChange={this.handleChange} autofocus />
                        </FormGroup>
                      </Col>
                    </Row>
		            <Row>
                      <Label md="3">Ref No.</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input placeholder="Reference Number" type="text" name="FieldRefNo" value={this.state.FieldRefNo} type="text" onChange={this.handleChange} autofocus />
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

export default FieldRegistration;