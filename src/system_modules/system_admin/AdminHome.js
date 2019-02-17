import React from "react";
import axios from "axios";
import querystring from "querystring";
import  { Redirect } from 'react-router-dom'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import routes from "../../layouts/system_admin/AdminRoutes.js";
class AdminHome extends React.Component {


constructor(props) {
    super(props);
    
	  this.state = {
      backgroundColor: "black",
      activeColor: "info",
      sidebarMini: false
    };
  }
	
	
	
render() {
return (

	<br/>
	
	
  );
 }	
	



}

export default AdminHome;