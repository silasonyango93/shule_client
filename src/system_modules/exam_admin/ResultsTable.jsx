import React from "react";
import ResultsTableRow from "./ResultsTableRow.jsx";
import ResultsTableHeader from "./ResultsTableHeader.jsx";
class ResultsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: [
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
      ]};
    console.log(this.props.dataProp)
	  
	  
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
		        <ResultsTableHeader />
                  {this.state.data.map((person, i) => (
                    <ResultsTableRow key={i} data={person} />
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
export default ResultsTable;