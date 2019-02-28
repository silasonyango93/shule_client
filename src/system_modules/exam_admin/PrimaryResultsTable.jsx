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
	data: [
        {
          id: 1,
          name: "Foo",
          age: "20"
        },
        {
          id: 2,
          name: "Bar",
          age: "30"
        },
        {
          id: 3,
          name: "Baz",
          age: "40"
        }
      ],
	   academicResults: [],
	   Fields:[],
	   ClassId:'',
	   Students:[],
	
	
	
	
	};
    
	  
	 this.getAllFields = this.getAllFields.bind(this);
	 this.getStudentsOfAParticularClassLevel = this.getStudentsOfAParticularClassLevel.bind(this);
	 this.createTableRowObjects = this.createTableRowObjects.bind(this);
  }
	
   
   
   
   
  componentWillMount(){
  
     var ClassId=this.props.location.state.ClassId;
	 var ExamId=this.props.location.state.ExamId;
     
	 this.setState({ClassId: ClassId,ExamId:ExamId}, () => { 
	  
	        this.getAllFields();
    
          });
	 
	 
	  
  
   } 
   
   
   
   
   
   getAllFields(){
   
   
        axios.post(ip+"/get_all_fields_")
		.then((response) => {
        
		  
		 this.setState({Fields: response.data.results}, () => { 
	  
	         this.getStudentsOfAParticularClassLevel();
    
          });
		    
		
		  
		 
		  
        })
        
    
     .catch((response) => {
        //handle error
        console.log(response);
      });
   
   
   }
   
   
   
   
   
   getStudentsOfAParticularClassLevel(){
   
   
        axios.post(ip+"/get_specific_students", querystring.stringify({ column_name: "ClassId",
		                                                                search_value: this.state.ClassId}))
		.then((response) => {
		  
		  
		  
		  this.setState({Students: response.data.results}, () => { 
	  
	          this.createTableRowObjects();
    
          });
		 
    
    } )
     .catch((response) => {
        //handle error
        console.log(response);
      });
   
   
   }
   
   
   
   
   
   
   createTableRowObjects(){
       var ResultsArray=[];
	   
	   
	   this.state.Students.forEach((student_item) => {
   
//Inside the student's forEach*************************************************************************************************************************   
   
       
	  
	   
       this.state.Fields.forEach((field_item) => {
	   
//Inside the fields's forEach*************************************************************************************************************************   	   
   
   
   
       axios.post(ip+"/get_a_specific_student_specific_subject_results", querystring.stringify({ AdmissionNo: student_item.AdmissionNo,
		                                                                                         FieldId: field_item.fieldId}))
		.then((response) => {
		  
		  var TotalFieldMarks=0;
		  
		  
		  response.data.results.forEach((subject_item) => {
		      
		      TotalFieldMarks=TotalFieldMarks+subject_item.Marks;
			  
		  
		  });
		  
		 
		  console.log(TotalFieldMarks);
			  console.log(student_item.AdmissionNo);
			  console.log(field_item.FieldRefNo);
		  
		 
    
    } )
     .catch((response) => {
        //handle error
        console.log(response);
      });
    
	
	
	
	
	
//Inside the fields's forEach*************************************************************************************************************************	
	
	});
	
	
	
	
	
	
//Inside the student's forEach*************************************************************************************************************************  	
   });
   
   
   }
   
   
   
   
   
	
  render() {
    return (
      <div class="row">
        <div class="col-lg-12">
          <div class="panel panel-default">
            <div class="panel-heading">Student's fee statements</div>

            <div class="panel-body">
              <table
                width="100%"
                class="table table-striped table-bordered table-hover"
                id="dataTables-example"
		        
              >
                <tbody>
		        <PrimaryResultsTableHeader />
                  {this.state.data.map((person, i) => (
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