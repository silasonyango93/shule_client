import React, { Component } from 'react';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "layouts/Auth/Auth.jsx";
import AdminLayout from "layouts/Admin/Admin.jsx";
import SystemAdminLayout from "layouts/system_admin/Admin.jsx";

import AdminLogin from '../system_modules/system_admin/AdminLogin.js';
import AdminHome from '../system_modules/system_admin/AdminHome.js';


class App extends Component {
  render() {
	  const hist = createBrowserHistory();
    return (
        <Router history={hist}>
    <Switch>
        <Route path="/auth" render={props => <AuthLayout {...props} />} />
        <Route path="/admin" render={props => <AdminLayout {...props} />} />
		<Route path="/system_admin" render={props => <SystemAdminLayout {...props} />} />
       
		<Route path="/admin_login" component={AdminLogin} />
	    <Route path="/system_admin/admin_home" component={AdminHome} />
    </Switch>
  </Router>
    );
  }
}

export default App;