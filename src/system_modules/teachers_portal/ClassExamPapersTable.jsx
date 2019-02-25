import React from "react";
import $ from "jquery";
import Table from "./Table.js";
import axios from "axios";
import querystring from "querystring";
import ip from "../../common/EndPoints.js";
class ClassExamPapersTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ExamPaperId: '',
	  StudentExamPapers:[],
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
]
  }
  
  this.getStudentsPapers = this.getStudentsPapers.bind(this);
}	
	
	
  
  componentWillMount(){
	  
   var ClassSpecificSubjectId = this.props.location.state.ClassSpecificSubjectId;
   var ExamId = this.props.location.state.ExamId;
   var SubjectTitle = this.props.location.state.SubjectTitle;
   
  
   
   axios.post(ip+"/get_a_classSpecicSubject_exam_paper_for_a_specific_exam", querystring.stringify({ColumnNameOne: "ExamId",
															                                        ValueOne: ExamId,
																		                            ColumnNameTwo: "ClassSpecificSubjectId",
                                                                                                    ValueTwo: ClassSpecificSubjectId}))
		.then((response) => {
        
		 var my_json=response.data.results;
		 
		    
		this.setState({
          ...this.state,
          ExamPaperId: response.data.results[0].ExamPaperId
		  
        });
		  
		 
		  
        })
		
		.then(() => {
           
		   this.getStudentsPapers();
		 
		  
        })
        
    
     .catch((response) => {
        //handle error
        console.log(response);
      });
	  

  
  }

  
	
	

	
	
	
	getStudentsPapers(){
	

   axios.post(ip+"/get_student_exam_papers_for_a_particular_exam_paper", querystring.stringify({TableOne: "students",
															                                    JoiningKey: "AdmissionNo",
																		                        SearchColumn: "ExamPaperId",
                                                                                                SearchValue: this.state.ExamPaperId}))
		.then((response) => {
        
		 
		 
		this.setState({
          ...this.state,
             StudentExamPapers: response.data.results
		  
        });
		 
		  
        })
		
		
    
     .catch((response) => {
        //handle error
        console.log(response);
      });
	  
	
	
	}
	
	
	

    

  render() {
    return (
      <div>
        <Table dataProp={this.state.StudentExamPapers} />
      </div>
    );
  }
}

export default ClassExamPapersTable;