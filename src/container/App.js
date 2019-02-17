import React, { Component } from 'react';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "layouts/Auth/Auth.jsx";
import AdminLayout from "layouts/Admin/Admin.jsx";


import AdminLogin from '../system_modules/system_admin/AdminLogin.js';
import DepartmentTypes from '../system_modules/system_admin/DepartmentTypes.jsx';
import DepartmentsConfiguration from '../system_modules/system_admin/DepartmentsConfiguration.jsx';


class App extends Component {
  render() {
	  const hist = createBrowserHistory();
    return (
        <Router history={hist}>
    <Switch>
        <Route path="/auth" render={props => <AuthLayout {...props} />} />
        <Route path="/admin" render={props => <AdminLayout {...props} />} />
		
       
		
		<Route path="/admin_login" component={AdminLogin} />
		<Redirect from="/" to="/admin_login" />
		<Route path="/config_department_types" component={DepartmentTypes} />
		<Route path="/config_departments" component={DepartmentsConfiguration} />
    </Switch>
  </Router>
    );
  }
}

export default App;