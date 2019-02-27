import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import axios from "axios";
import querystring from "querystring";
class PrimaryResultsTableRow extends React.Component {
	
  constructor(props) {
    super(props);

	  
   }
	
	
   
	
	
   render() {
      return (
		  
         <tr>
            <td>{this.props.data.id}</td>
            <td>{this.props.data.name}</td>
            <td>{this.props.data.age}</td>
         </tr>
		  
            
      );
   }
}
export default PrimaryResultsTableRow;