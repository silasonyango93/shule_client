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


class ResultsSyncInitiator extends React.Component {
constructor(props) {
    super(props);
    
   this.state = {
        Exams: [],
		AllStudents:[],
		Classes:[],
		SelectedExam:'',
		Fields:'',
		CurrentCurriculum:''
		
		
		
    };

      
	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.checkIfAllMarksBeenSubmitted = this.checkIfAllMarksBeenSubmitted.bind(this);
	  
	 
	  
	  
  }

  componentWillMount(){
	  
	  
	  
      var StaffNo=window.sessionStorage.getItem("StaffNo");
	  
	  if(StaffNo===null){this.props.history.push('/tuition_admin_login');}else{
  
//Get all current year's configured exams***************************************************************************************************************  
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
          Exams: jsonArray
		  
        });
		  
		 
		  
        })
        
    
     .catch((response) => {
        //handle error
        console.log(response);
      });
/***************************************************************************************************************************************************************	  
 Second axios to get all fields
 */
    axios.post(ip+"/get_all_fields_")
		.then((response) => {
        
		  
		 this.setState({
          ...this.state,
          Fields: response.data.results
		  
         });
		    
		
        })
        
    
     .catch((response) => {
        //handle error
        console.log(response);
      });
  
/*********************************************************************************************************************************************************************
Third axios to check current curriculum
*/  
  
    axios.post(ip+"/get_specific_curriculum_config_table", querystring.stringify({ column_name: "id",
																		           search_value: "1"}))
		.then((response) => {
		   var CurrentCurriculum=response.data.results[0].Curriculum;
		   this.setState({
          ...this.state,
          CurrentCurriculum: CurrentCurriculum
		  
         });
		  
		  } )
     .catch((response) => {
        //handle error
        console.log(response);
      });
/************************************************************************************************************************************************************************
Fourth axios for students
*/  
  
   axios.post(ip+"/get_all_students")
		.then((response) => {
		   
		   this.setState({
          ...this.state,
          AllStudents: response.data.results
		  
         });
		  
		  } )
     .catch((response) => {
        //handle error
        console.log(response);
      });
 
 
 
/************************************************************************************************************************************************************************
Fifth axios for classes
*/  
  
   axios.post(ip+"/get_all_class_by_full_reference", querystring.stringify({ TableTwo: "academic_class_levels",
															                    JoiningKeyOne: "AcademicClassLevelId",
															                    TableThree: "class_streams",
															                    JoiningKeyTwo: "ClassStreamId"}))
		.then((response) => {
        
		 
		    
		this.setState({
          ...this.state,
          Classes: response.data.results
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
	  if(this.state.SelectedExam===""){alert("Kindly fill in every field on the form");}else{
		this.checkIfAllMarksBeenSubmitted();
		
		
	}	
		
 }
   
	
 
 
 
/*SON/2018-11-06 00:29 - DEVELOPMENT
This function checks all exam papers ensuring teachers have submitted all the marks
*/
 checkIfAllMarksBeenSubmitted(){
 
   axios.post(ip+"/get_any_unsubmitted_marks", querystring.stringify({ExamId: this.state.SelectedExam.value}))
		.then((response) => {
		  
		  
		    if(response.data.results.length===0){
			
			    this.props.history.push({
                          pathname: '/sync_results',
                          state: {ExamId:this.state.SelectedExam.value,Fields:this.state.Fields,CurrentCurriculum:this.state.CurrentCurriculum,AllStudents:this.state.AllStudents,Classes:this.state.Classes}
                      })
			
			}else{
			
			          var UnsubmittedMarks=response.data.results;
					  
			          this.props.history.push({
                          pathname: '/unsubmitted_results_table',
                          state: {UnsubmittedMarks:UnsubmittedMarks}
                      })
			
			}
		  
		 
    
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
                  <CardTitle tag="h4">Process Results</CardTitle>
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
                            name="SelectExam"
                            closeMenuOnSelect={false}
                            value={this.state.SelectedExam}
                            onChange={value =>
                              this.setState({
                              ...this.state,
                                      SelectedExam: value
                              })
	  
                            }
                            options={this.state.Exams}
                          />
		            </FormGroup>
                      </Col>
                    </Row>
					<Row>
                    <Col md="3" />
                    <Col md="9">
                      <Button className="btn-round" style={{background:'red'}} type="submit" onClick={this.handleSubmit}>
                        Sync Results
                      </Button>
                    </Col>
                  </Row>
					
					
                  </Form>
                </CardBody>
                <CardFooter>
                  
                </CardFooter>
              </Card>
            </Col>
		</Row>
      
      </div>
    );
  }
}

export default ResultsSyncInitiator;