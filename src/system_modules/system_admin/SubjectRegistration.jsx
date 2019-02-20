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


class SubjectRegistration extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        Fields: [],
		SelectedField:'',
		SubjectName:'',
		SubjectDescription:'',
		SubjectRefNo:''
		
		
    };

      
	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.handleChange = this.handleChange.bind(this);
	  
  }

  componentWillMount(){
	  
	  
	  
      var StaffNo=window.sessionStorage.getItem("StaffNo");
	  
	  if(StaffNo===null){this.props.history.push('/tuition_admin_login');}else{
    
	  axios.post(ip+'/get_all_fields_')
		.then((response) => {
        
		  var my_json=response.data.results;
		 
		  var jsonArray=[];
		  var jsonObject= null;
		  
		  my_json.forEach((item) => {
            
			  jsonObject={value:item.fieldId,label:item.FieldName}
			  jsonArray.push(jsonObject);
			  
        });
		    
		this.setState({
          ...this.state,
          Fields: jsonArray
        });
		  
		 console.log(jsonArray);
		  
        })
        
    
     .catch((response) => {
        //handle error
        console.log(response);
      });
	  
	  }  

  }
	
	handleSubmit(event){ 
      event.preventDefault();
		
		if(this.state.SelectedField===""||this.state.SubjectName===""||this.state.SubjectDescription===""||this.state.SubjectRefNo===""){alert("Kindly fill in every field on the form");}else{
		
      axios.post(ip+"/add_subjects", querystring.stringify({ FieldId: this.state.SelectedField.value,
															    SubjectName: this.state.SubjectName,
															    SubjectDescription: this.state.SubjectDescription,
															    SubjectRefNo: this.state.SubjectRefNo}))
		.then((response) => {
        
		  alert(response.data.results.message);
		  
		  this.setState({
          ...this.state,
          SelectedField:'',
		  SubjectName:'',
		  SubjectDescription:'',
		  SubjectRefNo:''
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
                  <CardTitle tag="h4">Subject Registration</CardTitle>
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
                            placeholder="Select Field"
                            name="SelectField"
                            closeMenuOnSelect={false}
                            value={this.state.SelectedField}
                            onChange={value =>
                              this.setState({
                              ...this.state,
                                      SelectedField: value
                              })
	  
                            }
                            options={this.state.Fields}
                          />
		            </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">Name</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input placeholder="E.g Physics Paper One" type="text" name="SubjectName" value={this.state.SubjectName} type="text" onChange={this.handleChange} autofocus />
                        </FormGroup>
                      </Col>
                    </Row>
		            <Row>
                      <Label md="3">Description</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input placeholder="Description" type="text" name="SubjectDescription" value={this.state.SubjectDescription} type="text" onChange={this.handleChange} autofocus />
                        </FormGroup>
                      </Col>
                    </Row>
		            <Row>
                      <Label md="3">Reference No.</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input placeholder="Reference Number" type="text" name="SubjectRefNo" value={this.state.SubjectRefNo} type="text" onChange={this.handleChange} autofocus />
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

export default SubjectRegistration;