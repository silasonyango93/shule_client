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

	  
   }
	
	
   
	
	
   render() {
      return (
		  
         <tr>
            <td>{this.props.data.AdmissionNo}</td>
            <td>{this.props.data.FirstName}</td>
			<td>{this.props.data.MiddleName}</td>
            <td>{this.props.data.Surname}</td>
			<td><Input style={{alignSelf: 'stretch'}} placeholder="My Input" name="password" type="text" value="" /></td>
			<td><Button className="btn-round" color="info" type="submit" onClick={this.handleSubmit}>Submit</Button></td>
         </tr>
		  
            
      );
   }
}
export default TableRow;