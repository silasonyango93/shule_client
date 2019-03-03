import React from "react";
import PrimaryResultsTableRow from "./PrimaryResultsTableRow.jsx";
import PrimaryResultsTableHeader from "./PrimaryResultsTableHeader.jsx";
import axios from "axios";
import querystring from "querystring";
import ip from "../../common/EndPoints.js";


class PrimaryResultsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
	 
	 FinalResults:[]
	
	};
    
	 
  }
	
   
   
   
   
  componentWillMount(){
     
	 var ExamId=this.props.location.state.ExamId;
	 var AcademicClassLevelId=this.props.location.state.AcademicClassLevelId;
	 
	 
	 axios.post(ip+"/get_results_for_a_particular_class_level", querystring.stringify({AcademicClassLevelId: AcademicClassLevelId,
                                                                                       ExamId: ExamId}))
		.then((response) => {
        
		    
		this.setState({
          ...this.state,
          FinalResults: response.data.results
		  
        });
		  
		 
		  
        })
        
    
     .catch((response) => {
        //handle error
        console.log(response);
      });
	  
    
  
   } 
   
 
	
  render() {
    return (
      <div class="row">
        <div class="col-lg-12">
          <div class="panel panel-default">
            <div class="panel-heading">Examination Results</div>

            <div class="panel-body">
              <table
                width="100%"
                class="table table-striped table-bordered table-hover"
                id="dataTables-example"
		        
              >
                <tbody>
		        <PrimaryResultsTableHeader />
                  {this.state.FinalResults.map((person, i) => (
                    <PrimaryResultsTableRow key={i} data={person} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default PrimaryResultsTable;