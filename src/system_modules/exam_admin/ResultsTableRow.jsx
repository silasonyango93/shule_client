import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import axios from "axios";
import querystring from "querystring";
class ResultsTableRow extends React.Component {
	
  constructor(props) {
    super(props);


    


	  
   }
	
	
   componentWillMount(){
   var dataObject={name:"silas",age:"26"};
   
      Object.keys(dataObject).forEach(function(key) {
	  
      console.log(dataObject[key]);
	  
	  
       });
   
   
   }
	
	
   render() {
   var dataObject={name:"silas",age:"26"};
   
      return (
		  
         <tr>
		 {Object.keys(dataObject).forEach((key) =>  (
		 
            <td>{dataObject[key]}</td>
	  
         ))}
         </tr>
		  
            
      );
   }
}
export default ResultsTableRow;