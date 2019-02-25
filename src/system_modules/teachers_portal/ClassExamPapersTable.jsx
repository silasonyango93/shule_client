import React from "react";
import $ from "jquery";
import Table from "./Table.js";
import axios from "axios";
import querystring from "querystring";

class ClassExamPapersTable extends React.Component {
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
      ]
    };

    
  }
	
	
  componentWillMount(){
	  
  
  
  
  }

  componentDidMount() {
    
  }
	
	
    

  render() {
    return (
      <div>
        <Table dataProp={this.state.data} />
      </div>
    );
  }
}

export default ClassExamPapersTable;