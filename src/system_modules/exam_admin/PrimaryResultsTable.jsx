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
	   ExamId:'',
	   AcademicClassLevelId:''
	
	
	
	
	};
    
	  
	 this.getAllFields = this.getAllFields.bind(this);
	 this.getStudentsOfAParticularClassLevel = this.getStudentsOfAParticularClassLevel.bind(this);
	 this.createTableRowObjects = this.createTableRowObjects.bind(this);
	 this.getAcademicClassLevelId = this.getAcademicClassLevelId.bind(this);
	 this.AssignGrade = this.AssignGrade.bind(this);
	 this.UpdateStudentsFieldResult = this.UpdateStudentsFieldResult.bind(this);
	 this.AssignSumTotalMeanAndMeanGrade = this.AssignSumTotalMeanAndMeanGrade.bind(this);
	 this.getMeanGrade = this.getMeanGrade.bind(this);
	 this.UpdateSumTotalAverageAndMeanGradeForTheStudent = this.UpdateSumTotalAverageAndMeanGradeForTheStudent.bind(this);
	 this.studentsAcademicClassLevel = this.studentsAcademicClassLevel.bind(this);
	 
  }
	
   
   
   
   
  componentWillMount(){
  
     var ClassId=this.props.location.state.ClassId;
	 var ExamId=this.props.location.state.ExamId;
     var AcademicClassLevelId=this.props.location.state.AcademicClassLevelId;
	 
	 this.setState({ClassId: ClassId,ExamId:ExamId,AcademicClassLevelId:AcademicClassLevelId}, () => { 
	  
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
   
   
        axios.post(ip+"/get_specific_students", querystring.stringify({  column_name: "ClassId",
		                                                                 search_value: this.state.ClassId}))
		.then((response) => {
		  
		  
		  
		  this.setState({Students: response.data.results,AcademicClassLevelId:response.data.results[0].AcademicClassLevelId}, () => { 
	  
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
		  
		 
		  
		  
		 this.getAcademicClassLevelId(field_item.fieldId,student_item.AdmissionNo,TotalFieldMarks,field_item.FieldDescription,field_item.GradeRef);
    
    } )
     .catch((response) => {
        //handle error
        console.log(response);
      });
    
	
	
	
	
	
//Inside the fields's forEach*************************************************************************************************************************	
	
	});
	
	
	
	this.AssignSumTotalMeanAndMeanGrade(student_item.AdmissionNo);
	
	
//Inside the student's forEach*************************************************************************************************************************  	
   });
   
   
   }
   
   
   
   
   getAcademicClassLevelId(FieldId,AdmissionNo,TotalFieldMarks,FieldDescription,GradeRef){
   
       axios.post(ip+"/get_academic_class_level_of_a_particular_class", querystring.stringify({ TableTwo: "classes",
	                                                                                            JoiningKey: "AcademicClassLevelId",
																								SearchColumn: "ClassId",
		                                                                                        SearchValue: this.state.ClassId}))
		.then((response) => {
		  
		  
		  
		  this.setState({AcademicClassLevelId: response.data.results[0].AcademicClassLevelId}, () => { 
	  
	      
	      this.AssignGrade(FieldId,response.data.results[0].AcademicClassLevelId,AdmissionNo,TotalFieldMarks,FieldDescription,GradeRef);
    
      });
	  
	      
    
        
		  
		  
		 
    
    } )
     .catch((response) => {
        //handle error
        console.log(response);
      });
   
   }
   
   
   
   
   
   AssignGrade(FieldId,AcademicClassLevelId,AdmissionNo,TotalFieldMarks,FieldDescription,GradeRef){
   
        axios.post(ip+"/get_grade", querystring.stringify({ ColumnNameOne: "fieldId",
	                                                        ValueOne: FieldId,
															ColumnNameTwo: "AcademicClassLevelId",
															ValueTwo: AcademicClassLevelId,
															ValueThree: TotalFieldMarks,
															ColumnThree: "LowerBound",
		                                                    ColumnFour: "UpperBound"}))
		.then((response) => {
		  
		  
		     this.UpdateStudentsFieldResult(response.data.results[0].Grade,AdmissionNo,TotalFieldMarks,FieldDescription,GradeRef);
		  
		 
    
    } )
     .catch((response) => {
        //handle error
        console.log(response);
      });
   
   }
   
   
   
   
   
   
   UpdateStudentsFieldResult(Grade,AdmissionNo,TotalFieldMarks,FieldDescription,GradeRef){
   
   
        axios.post(ip+"/update_a_field_with_its_grade", querystring.stringify({ ColumnOneToBeSet: FieldDescription,
	                                                                            ValueOneToBeSet: TotalFieldMarks,
																				ColumnTwoToBeSet: GradeRef,
	                                                                            ValueTwoToBeSet: Grade,
																				ColumnOne: "ExamId",
																				ValueOne: this.state.ExamId,
																				ColumnTwo: "AdmissionNo",
		                                                                        ValueTwo: AdmissionNo}))
		.then((response) => {
		  
		  
		  
		  
		 
    
    } )
     .catch((response) => {
        //handle error
        console.log(response);
      });
   
   
   
   }
   
   
   
   
   
   
   
   AssignSumTotalMeanAndMeanGrade(AdmissionNo){
   
         
		 
		 axios.post(ip+"/getAspecifRecordForAspecificStudentAndExam", querystring.stringify({ ColumnNameOne: "ExamId",
		                                                                                      ValueOne: this.state.ExamId,
																							  ColumnNameTwo: "AdmissionNo",
		                                                                                      ValueTwo: AdmissionNo}))
		.then((response) => {
		  
		  var result_object=response.data.results[0];
		  
		  var SumTotal=result_object.MAT+result_object.ENG+result_object.KIS+result_object.SCI+result_object.SOC;
		  var Average=(SumTotal/5);
		  
		  
		  
		  this.studentsAcademicClassLevel(SumTotal,Average,AdmissionNo);
		 
    
    } )
     .catch((response) => {
        //handle error
        console.log(response);
      });
   
   
   }
   
   
   
   
   
   getMeanGrade(SumTotal,Average,AdmissionNo,AcademicClassLevelId){
   
       axios.post(ip+"/select_mean_grade_for_particular_mean_for_particular_class_level", querystring.stringify({ ColumnNameOne: "AcademicClassLevelId",
	                                                                                                              ValueOne: AcademicClassLevelId,
																												  ValueTwo: Average,
																												  ColumnTwo: "LowerBound",
		                                                                                                          ColumnThree: "UpperBound"}))
		.then((response) => {
		  
		  
		  
		    this.UpdateSumTotalAverageAndMeanGradeForTheStudent(response.data.results[0].MeanGrade,SumTotal,Average,AdmissionNo);
		 
    
    } )
     .catch((response) => {
        //handle error
        console.log(response);
      });
   
   }
   
   
   
   
   
   
   UpdateSumTotalAverageAndMeanGradeForTheStudent(MeanGrade,SumTotal,Average,AdmissionNo){
   
   
       axios.post(ip+"/update_a_row_with_sumtotal_average_and_meangrade", querystring.stringify({ ColumnOneToBeSet: "TOTAL",
	                                                                                              ValueOneToBeSet: SumTotal,
																				                  ColumnTwoToBeSet: "MEAN",
	                                                                                              ValueTwoToBeSet: Average,
																				                  ColumnThreeToBeSet: "MEAN_GRADE",
																								  ValueThreeToBeSet: MeanGrade,
																								  ColumnOne: "ExamId",
																				                  ValueOne: this.state.ExamId,
																				                  ColumnTwo: "AdmissionNo",
		                                                                                          ValueTwo: AdmissionNo}))
		.then((response) => {
		  
		  
		  
		  
		 
    
    } )
     .catch((response) => {
        //handle error
        console.log(response);
      });
   
   
   }
   
   
   
   
   
   
   studentsAcademicClassLevel(SumTotal,Average,AdmissionNo){
   
       axios.post(ip+"/get_academic_class_level_of_a_particular_class", querystring.stringify({ TableTwo: "classes",
	                                                                                            JoiningKey: "AcademicClassLevelId",
																								SearchColumn: "ClassId",
		                                                                                        SearchValue: this.state.ClassId}))
		.then((response) => {
		  
		  this.getMeanGrade(SumTotal,Average,AdmissionNo,response.data.results[0].AcademicClassLevelId);
		  
    
    
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