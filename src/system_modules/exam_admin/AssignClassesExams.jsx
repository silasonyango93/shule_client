import React from "react";
import axios from "axios";
import querystring from "querystring";
import  { Redirect } from 'react-router-dom'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ip from "../../common/EndPoints.js";
import Select from "react-select";
import Button from "components/CustomButtons/Button.jsx";
import ReactDatetime from "react-datetime";

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


class AssignClassesExams extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        ConfiguredExams: [],
		Classes: [],
		SelectedClasses:'',
		SelectedExam:'',
		CurrentSessionId:'',
		ExamStartDate:'',
		ExamEndDate:''
		
		
		
    };

      
	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.handleChange = this.handleChange.bind(this);
	  this.getSelectedClassSubjects = this.getSelectedClassSubjects.bind(this);
	  this.assignClassesExamPapers = this.assignClassesExamPapers.bind(this);
	  this.getSelectedClassStudents = this.getSelectedClassStudents.bind(this);
	  this.assignStudentsExamPapers = this.assignStudentsExamPapers.bind(this);
	  this.assignApaperToTheStudent = this.assignApaperToTheStudent.bind(this);
	  
  }

  componentWillMount(){
	  
	  
	  
      var StaffNo=window.sessionStorage.getItem("StaffNo");
	  
	  if(StaffNo===null){this.props.history.push('/exam_admin_login');}else{
    
	
	/**************************************************************************************
	 First Axios for Configured Exams
	*/
	
	  var CurrentYear=new Date().getFullYear();
	  axios.post(ip+"/get_all_current_year_configured_exams_by_full_reference", querystring.stringify({TableTwo: "exam_types",
															                                           JoiningKeyOne: "ExamTypeId",
															                                           TableThree: "actual_terms",
																		                               JoiningKeyTwo: "ActualTermId",
															                                           TableFour: "term_iterations",
															                                           JoiningKeyThree: "TermIterationId",
																		                               SearchColumn: "Year",
                                                                                                       SearchValue: CurrentYear}))
		.then((response) => {
        
		  var my_json=response.data.results;
		 
		  var jsonArray=[];
		  var jsonObject= null;
		  var exam_by_full_reference="";
		  
		  my_json.forEach((item) => {
		  
		      exam_by_full_reference=item.ExamTypeDescription+"  -  ("+item.IterationDescription+" - "+item.Year+")";
            
			  jsonObject={value:item.ExamId,label:exam_by_full_reference}
			  jsonArray.push(jsonObject);
			  
        });
		    
		this.setState({
          ...this.state,
          ConfiguredExams: jsonArray,
		  CurrentSessionId:StaffNo
        });
		  
		 
		  
        })
        
    
     .catch((response) => {
        //handle error
        console.log(response);
      });
	  
	  /**************************************************************************************
	 Second Axios for classes
	*/
	  
	  axios.post(ip+"/get_all_class_by_full_reference", querystring.stringify({ TableTwo: "academic_class_levels",
															                    JoiningKeyOne: "AcademicClassLevelId",
															                    TableThree: "class_streams",
															                    JoiningKeyTwo: "ClassStreamId"}))
		.then((response) => {
        
		  var my_json=response.data.results;
		 
		  var jsonArray=[];
		  var jsonObject= null;
		  var full_class_reference="";
		  
		  my_json.forEach((item) => {
            
			  full_class_reference=item.AcademicClassLevelName+" "+item.ClassStreamName
			  
			  jsonObject={value:item.ClassId,label:full_class_reference}
			  jsonArray.push(jsonObject);
			  
        });
		    
		this.setState({
          ...this.state,
          Classes: jsonArray
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
		
		if(this.state.SelectedClasses===""||this.state.SelectedExam===""){alert("Kindly fill in every field on the form");}else{
		

             this.getSelectedClassSubjects();
			 alert("Examination papers have been assigned to students in the selected classes");
			 


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
	
	
	
	
	
	getSelectedClassSubjects(){
	
	
	  this.state.SelectedClasses.forEach((item) => {
	  
	     axios.post(ip+"/get_specific_class_specific_subjects", querystring.stringify({ column_name: "ClassId",
															                             search_value: item.value}))
		.then((response) => {
        
		  var current_class_subjects=response.data.results;
		 
		  
		  
		   current_class_subjects.forEach((item) => {
            
			  this.assignClassesExamPapers(item.ClassSpecificSubjectId);
			  
           });
		    
		   
		  
        })
		.then(() => {
        
		     this.getSelectedClassStudents();
		 
		  
		  })
        
    
     .catch((response) => {
        //handle error
        console.log(response);
      });
	  
	  
	  });
	
	
	
	
	}
	
	
	
	
	
	
	
	
	
	assignClassesExamPapers(ClassSpecificSubjectId){
	
	
	   axios.post(ip+"/add_exam_papers", querystring.stringify({ ExamId: this.state.SelectedExam.value,
	                                                             ClassSpecificSubjectId: ClassSpecificSubjectId,
																 ExamPaperStartDate: "2019-02-24 12:48:37.059",
																 ExamPaperEndDate: "2019-02-24 12:48:37.059",
																 ConfiguredBy: this.state.CurrentSessionId,
															     WasItDone: "0"}))
		.then((response) => {
        
		  //var current_class_subjects=response.data.results;
		 
		  
		    
		
		  
        })
        
    
     .catch((response) => {
        //handle error
        console.log(response);
      });
	  
	
	
	}
	
	
	
	
	
	
	
	getSelectedClassStudents(){
	  
	  this.state.SelectedClasses.forEach((item) => {
	    var current_class_id=item.value;
	
	    axios.post(ip+"/get_specific_students", querystring.stringify({ column_name: "ClassId",
															            search_value: item.value}))
		.then((response) => {
        
		  var current_class_students=response.data.results;
		 
		  
		  
		   current_class_students.forEach((item) => {
            
			  this.assignStudentsExamPapers(item.AdmissionNo,current_class_id);
			  
           });
		    
		   
		  
        })
        
    
     .catch((response) => {
        //handle error
        console.log(response);
      });
	  
	  
	  });
	
	
	}
	
	
	
	
	
	
	
	
	
	assignStudentsExamPapers(AdmissionNo,current_class_id){
	
	
	
	    axios.post(ip+"/innerjoin_classSpecifSubjects_with_ExamPapers", querystring.stringify({ TableOne: "class_specific_subjects",
		                                                                                        JoiningKey: "ClassSpecificSubjectId",
																								SearchColumn: "ClassId",
															                                    SearchValue: current_class_id}))
		.then((response) => {
        
		  var current_class_exam_papers=response.data.results;
		 
		  
		  
		   current_class_exam_papers.forEach((item) => {
            
			  this.assignApaperToTheStudent(item.ExamPaperId,AdmissionNo);
			  
           });
		    
		   
		  
        })
        
    
     .catch((response) => {
        //handle error
        console.log(response);
      });
	
	
	
	}
	
	
	
	
	
	assignApaperToTheStudent(ExamPaperId,AdmissionNo){
	
	
	   axios.post(ip+"/add_specific_student_exam_papers", querystring.stringify({ AdmissionNo: AdmissionNo,
		                                                                          ExamPaperId: ExamPaperId,
																				  Marks: "0.00",
															                      IsMarkSubmited: "0"}))
		.then((response) => {
        
		  
		  
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
                  <CardTitle tag="h4">Assign Classes Exams</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form className="form-horizontal" >
		            <Row>
                      <Label md="3">Exam</Label>
                      <Col md="9">
                        <FormGroup>
		            <Select
                            className="react-select info"
                            classNamePrefix="react-select"
                            placeholder="Select Exam"
                            name="SelectedExam"
                            closeMenuOnSelect={false}
                            value={this.state.SelectedExam}
                            onChange={value =>
                              this.setState({
                              ...this.state,
                                      SelectedExam: value
                              })
	  
                            }
                            options={this.state.ConfiguredExams}
                          />
		            </FormGroup>
                      </Col>
                    </Row>
					
					 <Row>
                      <Label md="3">Classes</Label>
                      <Col md="9">
                        <FormGroup>
		            <Select
                            className="react-select info"
                            classNamePrefix="react-select"
                            placeholder="Select the Classes"
                            name="SelectedClasses"
                            closeMenuOnSelect={false}
							isMulti
                            value={this.state.SelectedClasses}
                            onChange={value =>
                              this.setState({
                              ...this.state,
                                      SelectedClasses: value
                              })
	  
                            }
                            options={this.state.Classes}
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

export default AssignClassesExams;