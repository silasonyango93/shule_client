import React, { Component } from 'react';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "layouts/Auth/Auth.jsx";
import AdminLayout from "layouts/Admin/Admin.jsx";
import StudentManagementAdminLayout from "layouts/StudentManagementAdmin/StudentManagementAdmin.jsx";


import TuitionAdminLogin from '../system_modules/system_admin/TuitionAdminLogin.jsx';
import DepartmentTypes from '../system_modules/system_admin/DepartmentTypes.jsx';
import DepartmentsConfiguration from '../system_modules/system_admin/DepartmentsConfiguration.jsx';

import AcademicClassLevelConfig from '../system_modules/system_admin/AcademicClassLevelConfig.jsx';
import ClassStreamsConfig from '../system_modules/system_admin/ClassStreamsConfig.jsx';
import ClassRegistration from '../system_modules/system_admin/ClassRegistration.jsx';

import FieldCategoriesConfig from '../system_modules/system_admin/FieldCategoriesConfig.jsx';
import FieldRegistration from '../system_modules/system_admin/FieldRegistration.jsx';
import SubjectRegistration from '../system_modules/system_admin/SubjectRegistration.jsx';
import ClassSubjectsRegistration from '../system_modules/system_admin/ClassSubjectsRegistration.jsx';

import TermIterationsConfig from '../system_modules/system_admin/TermIterationsConfig.jsx';
import ActualTermsRegistration from '../system_modules/system_admin/ActualTermsRegistration.jsx';
import WeekIterationsConfiguration from '../system_modules/system_admin/WeekIterationsConfiguration.jsx';
import ActualWeeksRegistration from '../system_modules/system_admin/ActualWeeksRegistration.jsx';


import StudentAdminLogin from '../system_modules/student_admin/StudentAdminLogin.jsx';
import StudentTypeCategories from '../system_modules/student_admin/StudentTypeCategories.jsx';


class App extends Component {
  render() {
	  const hist = createBrowserHistory();
    return (
        <Router history={hist}>
    <Switch>
        <Route path="/auth" render={props => <AuthLayout {...props} />} />
        <Route path="/admin" render={props => <AdminLayout {...props} />} />
		<Route path="/student_admin" render={props => <StudentManagementAdminLayout {...props} />} />
		
       
		<Route path="/tuition_admin_login" component={TuitionAdminLogin} />
		<Route path="/student_admin_login" component={StudentAdminLogin} />
		<Redirect from="/" to="/student_admin_login" />
		<Route path="/config_department_types" component={DepartmentTypes} />
		<Route path="/config_departments" component={DepartmentsConfiguration} />
		
		<Route path="/config_academic_class_level" component={AcademicClassLevelConfig} />
		<Route path="/config_class_stream" component={ClassStreamsConfig} />
		<Route path="/config_class" component={ClassRegistration} />
		
		<Route path="/config_field_categories" component={FieldCategoriesConfig} />
		<Route path="/field_registration" component={FieldRegistration} />
		<Route path="/subject_registration" component={SubjectRegistration} />
		<Route path="/class_subject_registration" component={ClassSubjectsRegistration} />
		<Route path="/term_iterations_config" component={TermIterationsConfig} />
		<Route path="/actual_term_registration" component={ActualTermsRegistration} />
		<Route path="/week_iterations_config" component={WeekIterationsConfiguration} />
		<Route path="/actual_week_registration" component={ActualWeeksRegistration} />
		
		
		<Route path="/student_type_categories_config" component={StudentTypeCategories} />
    </Switch>
  </Router>
    );
  }
}

export default App;