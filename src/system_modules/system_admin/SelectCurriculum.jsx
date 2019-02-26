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


class SelectCurriculum extends React.Component {
constructor(props) {
    super(props);
this.state = {

      SelectedCurriculum:'',
	  CurriculaLevels:[],
	  SelectedCurriculumLevel:'',
	
      Curricula:[
		 
		 {label:"8-4-4",value:"1"},
		 {label:"2-6-3-3-3",value:"2"},
		
		],
		
	  EightFourFourLevels:[
	  
	    {label:"Primary",value:"1"},
		{label:"Secondary",value:"2"}
	  
	  ],
	  
	  
	  
	 PrimaryClassLevels:[
	 
	    {Name:"Pre-Kinder",Description:"4-year old pupils",HierarchyCode:"1"},
		{Name:"Pre-Care",Description:"5-year old pupils",HierarchyCode:"2"},
		{Name:"Pre-Unit",Description:"6-year old pupils",HierarchyCode:"3"},
		{Name:"Class 1",Description:"7-year old pupils",HierarchyCode:"4"},
		{Name:"Class 2",Description:"8-year old pupils",HierarchyCode:"5"},
		{Name:"Class 3",Description:"9-year old pupils",HierarchyCode:"6"},
		{Name:"Class 4",Description:"10-year old pupils",HierarchyCode:"7"},
		{Name:"Class 5",Description:"11-year old pupils",HierarchyCode:"8"},
		{Name:"Class 6",Description:"12-year old pupils",HierarchyCode:"9"},
		{Name:"Class 7",Description:"13-year old pupils",HierarchyCode:"10"},
		{Name:"Class 8",Description:"14-year old pupils",HierarchyCode:"11"},
	 
	 ],
	 
	 
	PrimarySubjects:[
	
	    {Field:"Mathematics",Subjects:[{Name:"Mathematics"}]},
		{Field:"English",Subjects:[{Name:"English Gramar"},{Name:"English Composition"}]},
		{Field:"Kiswahili",Subjects:[{Name:"Kiswahili Lugha"},{Name:"Kiswahili Insha"}]},
		{Field:"Science",Subjects:[{Name:"Science"}]},
		{Field:"Social Studies",Subjects:[{Name:"Social Studies"},{Name:"Christian Religious Education(CRE)"},{Name:"Islamic Religious Education(IRE)"}]},
		
	
	],
	
	
	
   SecondaryClassLevels:[
   
       {Name:"Form 1",Description:"15-year old students",HierarchyCode:"1"},
	   {Name:"Form 2",Description:"16-year old students",HierarchyCode:"2"},
	   {Name:"Form 3",Description:"17-year old students",HierarchyCode:"3"},
	   {Name:"Form 4",Description:"18-year old students",HierarchyCode:"4"}
   
   ],
   
   
   
  SecondarySubjects:[
  
      {Field:"Mathematics",Subjects:[{Name:"Mathematics Paper 1"},{Name:"Mathematics Paper 2"}]},
	  {Field:"English",Subjects:[{Name:"English Paper 1"},{Name:"English Paper 2"},{Name:"English Literature"}]},
	  {Field:"Kiswahili",Subjects:[{Name:"Kiswahili Paper 1"},{Name:"Kiswahili Paper 2"},{Name:"Kiswahili Fasihi"}]},
	  {Field:"Physics",Subjects:[{Name:"Physics Paper 1"},{Name:"Physics Paper 2"},{Name:"Physics Practicals"}]},
	  {Field:"Chemistry",Subjects:[{Name:"Chemistry Paper 1"},{Name:"Chemistry Paper 2"},{Name:"Chemistry Practicals"}]},
	  {Field:"Biology",Subjects:[{Name:"Biology Paper 1"},{Name:"Biology Paper 2"},{Name:"Biology Practicals"}]},
	  {Field:"Geography",Subjects:[{Name:"Geography Paper 1"},{Name:"Geography Paper 2"}]},
	  {Field:"History",Subjects:[{Name:"History Paper 1"},{Name:"History Paper 2"}]},
	  {Field:"Christian Religious Education(CRE)",Subjects:[{Name:"CRE Paper 1"},{Name:"CRE Paper 2"}]},
	  {Field:"Agriculture",Subjects:[{Name:"Agriculture Paper 1"},{Name:"Agriculture Paper 2"},{Name:"Agriculture Practicals"}]},
	  {Field:"Business Studies",Subjects:[{Name:"Business Studies Paper 1"},{Name:"Business Studies Paper 2"},{Name:"Business Studies Paper 3"}]},
	  {Field:"French",Subjects:[{Name:"French Paper 1"},{Name:"French Paper 2"},{Name:"French Paper 3"}]},
	  {Field:"Computer Studies",Subjects:[{Name:"Computer Studies Paper 1"},{Name:"Computer Studies Paper 2"},{Name:"Computer Studies Practicals"}]},
	  {Field:"Home Science",Subjects:[{Name:"Home Science Paper 1"},{Name:"Home Science Paper 2"},{Name:"Home Science Practicals"}]},
	  {Field:"Music",Subjects:[{Name:"Music Paper 1"},{Name:"Music Paper 2"},{Name:"Music Practicals"}]}
  
  ]
		
		
};

      
	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.handleChange = this.handleChange.bind(this);
	  this.handleCurriculumDropDownChanged = this.handleCurriculumDropDownChanged.bind(this);
	  this.setCurriculumLevels = this.setCurriculumLevels.bind(this);
	  
	  
	  
  }

  componentWillMount(){
	  
	  
	  
      var StaffNo=window.sessionStorage.getItem("StaffNo");
	  
	  if(StaffNo===null){this.props.history.push('/student_admin_login');}else{
    
		  
	  }  

  }
	
	handleSubmit(event){ 
      event.preventDefault();
		
		if(this.state.SelectedStudentTypeCategory===""||this.state.SelectedStudentType===""||this.state.AdmissionNo===""){alert("Kindly fill in every field on the form");}else{
		
									   
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
	
	
	
	





    
	
	
	handleCurriculumDropDownChanged(value){
      
	  this.setState({SelectedCurriculum: value}, () => { 
	  
	      this.setCurriculumLevels();
    
      });
	   
	   
   
    }
	
	
	
	
	
	setCurriculumLevels(){
	
	   if(this.state.SelectedCurriculum.value==="1"){
	   
	       this.setState({
                      ...this.state,
                         CurriculaLevels: this.state.EightFourFourLevels
		                 
                    })
	   
	   }
	
	}
	
	
	

  render() {
    return (
      <div>
		<Row style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
		 <Col md="6">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Select Curriculum</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form className="form-horizontal" >
		
		            <Row>
                      <Label md="3">Curriculum</Label>
                      <Col md="9">
                        <FormGroup>
		            <Select
                            className="react-select info"
                            classNamePrefix="react-select"
                            placeholder="Select Curriculum"
                            name="SelectCurriculum"
                            closeMenuOnSelect={false}
                            value={this.state.SelectedCurriculum}
							onChange={this.handleCurriculumDropDownChanged}
                            options={this.state.Curricula}
                          />
		            </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Label md="3">Level</Label>
                      <Col md="9">
                        <FormGroup>
		            <Select
                            className="react-select info"
                            classNamePrefix="react-select"
                            placeholder="Select Curriculum Level"
                            name="SelectStudentType"
                            closeMenuOnSelect={false}
                            value={this.state.SelectedCurriculumLevel}
                            onChange={value =>
                              this.setState({
                              ...this.state,
                                      SelectedCurriculumLevel: value
                              })
	  
                            }
                            options={this.state.CurriculaLevels}
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

export default SelectCurriculum;