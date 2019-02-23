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


class AssignTeachersSubjects extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        StaffMembers: [],
		ClassSubjects: [],
		SelectedStaffMember:'',
		SelectedClassSubjects:'',
		ClassNickName:'',
		ClassDescription:'',
		PhysicalAddress:'',
		ClassRefNo:''
		
		
    };

      
	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.handleChange = this.handleChange.bind(this);
	  
  }

  componentWillMount(){
	  
	  
	  
      var StaffNo=window.sessionStorage.getItem("StaffNo");
	  
	  if(StaffNo===null){this.props.history.push('/staff_admin_login');}else{
    
		  
	//First axios for class streams	  
	  axios.post(ip+'/get_all_users')
		.then((response) => {
        
		  var my_json=response.data.results;
		 
		  var jsonArray=[];
		  var jsonObject= null;
		  var staff_full_reference="";
		  
		  my_json.forEach((item) => {
            
			  staff_full_reference=item.Surname+" "+item.FirstName+" ("+item.StaffNo+")";
			
			  jsonObject={value:item.StaffNo,label:staff_full_reference}
			  jsonArray.push(jsonObject);
			  
        });
		    
		this.setState({
          ...this.state,
          StaffMembers: jsonArray
        });
		  
		 
		  
        })
        
    
     .catch((response) => {
        //handle error
        console.log(response);
      });
	  
	//**********************************************************************************************
		  
		//Second axios for Class Subjects	  
	  axios.post(ip+"/get_all_class_subjects_by_full_reference", querystring.stringify({ TableTwo: "subjects",
	                                                                                     JoiningKeyOne: "SubjectId",
																			             TableThree: "classes",
															                             JoiningKeyTwo: "ClassId",
																						 TableFour: "academic_class_levels",
																						 JoiningKeyThree: "AcademicClassLevelId",
																						 TableFive: "class_streams",
																						 JoiningKeyFour: "ClassStreamId"}))
		.then((response) => {
        
		  var my_json=response.data.results;
		 
		  var jsonArray=[];
		  var jsonObject= null;
		  var class_subject_full_reference="";
		  
		  my_json.forEach((item) => {
		  
		      class_subject_full_reference=item.SubjectName+" - "+item.AcademicClassLevelName+" "+item.ClassStreamName;
            
			  jsonObject={value:item.ClassSpecificSubjectId,label:class_subject_full_reference}
			  jsonArray.push(jsonObject);
			  
        });
		    
		this.setState({
          ...this.state,
          ClassSubjects: jsonArray
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
	
	
	
	
    

  render() {
    return (
      <div>
		<Row style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
		 <Col md="6">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Assign Subjects</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form className="form-horizontal" >
				  
				    <Row>
                      <Label md="3">Staff No</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input placeholder="Staff Number" type="text" name="StaffNo" value={this.state.StaffNo} type="text" onChange={this.handleChange} autofocus />
                        </FormGroup>
                      </Col>
                    </Row>
				  
		            <Row>
                      <Label md="3">Staff</Label>
                      <Col md="9">
                        <FormGroup>
		            <Select
                            className="react-select info"
                            classNamePrefix="react-select"
                            placeholder="Select Staff"
                            name="SelectStaffMember"
                            closeMenuOnSelect={false}
                            value={this.state.SelectedStaffMember}
                            onChange={value =>
                              this.setState({
                              ...this.state,
                                      SelectedStaffMember: value
                              })
	  
                            }
                            options={this.state.StaffMembers}
                          />
		            </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Label md="3">Subjects</Label>
                      <Col md="9">
                        <FormGroup>
		            <Select
                            className="react-select info"
                            classNamePrefix="react-select"
                            placeholder="Select Class Subjects"
                            name="SelectClassSubjects"
                            closeMenuOnSelect={false}
                            value={this.state.SelectedClassSubjects}
                            onChange={value =>
                              this.setState({
                              ...this.state,
                                      SelectedClassSubjects: value
                              })
	  
                            }
                            options={this.state.ClassSubjects}
                          />
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

export default AssignTeachersSubjects;