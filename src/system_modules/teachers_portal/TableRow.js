import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import axios from "axios";
import querystring from "querystring";


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
  Button,
  Col
} from "reactstrap";

class TableRow extends React.Component {
	
  constructor(props) {
    super(props);


      this.state = {
        Marks: ''
		
    };

	  this.handleChange = this.handleChange.bind(this);
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
		  
         <tr>
            <td>{this.props.data.AdmissionNo}</td>
            <td>{this.props.data.FirstName}</td>
			<td>{this.props.data.MiddleName}</td>
            <td>{this.props.data.Surname}</td>
			<td><Input placeholder="Marks" type="text" name="Marks" value={this.state.Marks} type="text" onChange={this.handleChange} autofocus /></td>
			<td><Button className="btn-round" color="info" type="submit" onClick={this.handleSubmit}>Submit</Button></td>
         </tr>
		  
            
      );
   }
}
export default TableRow;