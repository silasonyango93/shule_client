import React from 'react';
class ResultsTableHeader extends React.Component {
   render() {
   
   var dataObject={name:"silas",age:"26"};
      return (
		  
         
		  <tr>
		  
		  
		  {Object.keys(dataObject).forEach((key) =>  (
		 
            <th>Name</th>
	  
         ))}
              
              
                                            
           </tr>
          
		  
            
      );
   }
}
export default ResultsTableHeader;