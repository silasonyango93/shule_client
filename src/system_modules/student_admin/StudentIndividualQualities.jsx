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


class StudentIndividualQualities extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        StudentTypeCategories: [],
		StudentTypes: [],
		SelectedStudentTypeCategory:'',
		SelectedStudentType:'',
		ClassNickName:'',
		ClassDescription:'',
		PhysicalAddress:'',
		ClassRefNo:''
		
		
    };

      
	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.handleChange = this.handleChange.bind(this);
	  this.handleParentDropDownChanged = this.handleParentDropDownChanged.bind(this);
	  
  }

  componentWillMount(){
	  
	  
	  
      var StaffNo=window.sessionStorage.getItem("StaffNo");
	  
	  if(StaffNo===null){this.props.history.push('/student_admin_login');}else{
    
		  
	//First axios for class streams	  
	  axios.post(ip+'/get_all_student_type_categories')
		.then((response) => {
        
		  var my_json=response.data.results;
		 
		  var jsonArray=[];
		  var jsonObject= null;
		  
		  my_json.forEach((item) => {
            
			  jsonObject={value:item.StudentTypeCategoryId,label:item.CategoryDescription}
			  jsonArray.push(jsonObject);
			  
        });
		    
		this.setState({
          ...this.state,
          StudentTypeCategories: jsonArray
        });
		  
		 
		  
        })
        
    
     .catch((response) => {
        //handle error
        console.log(response);
      });
	  
	//**********************************************************************************************
		  
		//Second axios for Academic class levels	  
	  axios.post(ip+'/get_all_academic_class_levels')
		.then((response) => {
        
		  var my_json=response.data.results;
		 
		  var jsonArray=[];
		  var jsonObject= null;
		  
		  my_json.forEach((item) => {
            
			  jsonObject={value:item.AcademicClassLevelId,label:item.AcademicClassLevelName}
			  jsonArray.push(jsonObject);
			  
        });
		    
		this.setState({
          ...this.state,
          AcademicClassLevels: jsonArray
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
		
		if(this.state.SelectedAcademicClassLevel===""||this.state.ClassStreamId===""||this.state.ClassNickName===""||this.state.ClassDescription===""||this.state.PhysicalAddress===""||this.state.ClassRefNo===""){alert("Kindly fill in every field on the form");}else{
		
      axios.post(ip+"/add_classes", querystring.stringify({ AcademicClassLevelId: this.state.SelectedAcademicClassLevel.value,
															ClassStreamId: this.state.SelectedClassStream.value,
															ClassNickName: this.state.ClassNickName,
															ClassDescription: this.state.ClassDescription,
															PhysicalAddress: this.state.PhysicalAddress,
															ClassRefNo: this.state.ClassRefNo}))
		.then((response) => {
        
		  alert(response.data.results.message);
		  
		  this.setState({
          ...this.state,
          SelectedAcademicClassLevel:'',
		  SelectedClassStream:'',
		  ClassNickName:'',
		  ClassDescription:'',
		  PhysicalAddress:'',
		  ClassRefNo:''
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
	
	
	
	
	handleParentDropDownChanged(value){
		
	  this.setState({
                      ...this.state,
                         SelectedStudentTypeCategory: value,
		                 SelectedStudentType:''
		                 
                    })
		
		
	  var selectedParentObject=value;
		
		
	axios.post(ip+"/get_specific_student_types", querystring.stringify({ column_name: "StudentTypeCategoryId",
															             search_value: selectedParentObject.value}))
		.then((response) => {
        
		  var my_json=response.data.results;
		 
		  var jsonArray=[];
		  var jsonObject= null;
		  
		  my_json.forEach((item) => {
            
			  
			  jsonObject={value:item.StudentTypeId,label:item.StudentTypeDescription}
			  jsonArray.push(jsonObject);
			  
        });
		    
		this.setState({
          ...this.state,
          StudentTypes: jsonArray
        });
		  
		 
		  
        })
        
    
     .catch((response) => {
        //handle error
        console.log(response);
});
	}
	
    

  render() {
    return (
      <div>
		<Row style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
		 <Col md="6">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Student Qualities</CardTitle>
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
                            name="SelectCategory"
                            closeMenuOnSelect={false}
                            value={this.state.SelectedStudentTypeCategory}
                            onChange={this.handleParentDropDownChanged}
                            options={this.state.StudentTypeCategories}
                          />
		            </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Label md="3">Student Type</Label>
                      <Col md="9">
                        <FormGroup>
		            <Select
                            className="react-select info"
                            classNamePrefix="react-select"
                            placeholder="Select Student Type"
                            name="SelectStudentType"
                            closeMenuOnSelect={false}
                            value={this.state.SelectedStudentType}
                            onChange={value =>
                              this.setState({
                              ...this.state,
                                      SelectedStudentType: value
                              })
	  
                            }
                            options={this.state.StudentTypes}
                          />
		            </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Label md="3">Nickname</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input placeholder="Nickname" type="text" name="ClassNickName" value={this.state.ClassNickName} type="text" onChange={this.handleChange} autofocus />
                        </FormGroup>
                      </Col>
                    </Row>
		            <Row>
                      <Label md="3">Description</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input placeholder="Description" type="text" name="ClassDescription" value={this.state.ClassDescription} type="text" onChange={this.handleChange} autofocus />
                        </FormGroup>
                      </Col>
                    </Row>
		            <Row>
                      <Label md="3">Physical Address</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input placeholder="Physical Address" type="text" name="PhysicalAddress" value={this.state.PhysicalAddress} type="text" onChange={this.handleChange} autofocus />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Label md="3">Reference No.</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input placeholder="Reference Number" type="text" name="ClassRefNo" value={this.state.ClassRefNo} type="text" onChange={this.handleChange} autofocus />
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

export default StudentIndividualQualities;