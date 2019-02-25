import React, { Component } from 'react';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "layouts/Auth/Auth.jsx";
import AdminLayout from "layouts/Admin/Admin.jsx";
import StudentManagementAdminLayout from "layouts/StudentManagementAdmin/StudentManagementAdmin.jsx";
import StaffManagementAdminLayout from "layouts/StaffManagementAdmin/StaffManagementAdmin.jsx";
import ExamManagementAdminLayout from "layouts/ExamManagementAdmin/ExamManagementAdmin.jsx";
import TeachersPortalLayout from "layouts/TeachersPortal/TeachersPortal.jsx";


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
import StudentTypesConfig from '../system_modules/student_admin/StudentTypesConfig.jsx';
import StudentRegistration from '../system_modules/student_admin/StudentRegistration.jsx';
import StudentIndividualQualities from '../system_modules/student_admin/StudentIndividualQualities.jsx';


import StaffAdminLogin from '../system_modules/staff_admin/StaffAdminLogin.jsx';
import StaffTypeConfig from '../system_modules/staff_admin/StaffTypeConfig.jsx';
import StaffRegistration from '../system_modules/staff_admin/StaffRegistration.jsx';
import StaffIndividualQualities from '../system_modules/staff_admin/StaffIndividualQualities.jsx';
import AssignTeachersSubjects from '../system_modules/staff_admin/AssignTeachersSubjects.jsx';



import ExamAdminLogin from '../system_modules/exam_admin/ExamAdminLogin.jsx';
import ExamTypesConfig from '../system_modules/exam_admin/ExamTypesConfig.jsx';
import ExamRegistration from '../system_modules/exam_admin/ExamRegistration.jsx';
import AssignClassesExams from '../system_modules/exam_admin/AssignClassesExams.jsx';



import TeachersPortalLogin from '../system_modules/teachers_portal/TeachersPortalLogin.jsx';
import SelectExam from '../system_modules/teachers_portal/SelectExam.jsx';
import ClassExamPapersTable from '../system_modules/teachers_portal/ClassExamPapersTable.jsx';


class App extends Component {
  render() {
	  const hist = createBrowserHistory();
    return (
        <Router history={hist}>
    <Switch>
        <Route path="/auth" render={props => <AuthLayout {...props} />} />
        <Route path="/admin" render={props => <AdminLayout {...props} />} />
		<Route path="/student_admin" render={props => <StudentManagementAdminLayout {...props} />} />
		<Route path="/staff_admin" render={props => <StaffManagementAdminLayout {...props} />} />
		<Route path="/exam_admin" render={props => <ExamManagementAdminLayout {...props} />} />
		<Route path="/teachers_portal" render={props => <TeachersPortalLayout {...props} />} />
		
		<Route path="/class_exam_papers_table" component={ClassExamPapersTable} />
		<Route path="/teachers_portal_login" component={TeachersPortalLogin} />
        <Route path="/exam_admin_login" component={ExamAdminLogin} />
		<Route path="/staff_admin_login" component={StaffAdminLogin} />
		<Route path="/tuition_admin_login" component={TuitionAdminLogin} />
		<Route path="/student_admin_login" component={StudentAdminLogin} />
		<Redirect from="/" to="/teachers_portal_login" />
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
		<Route path="/student_type_config" component={StudentTypesConfig} />
		<Route path="/register_student" component={StudentRegistration} />
		<Route path="/add_student_individual_qualities" component={StudentIndividualQualities} />
		
		
		
		<Route path="/staff_types_config" component={StaffTypeConfig} />
		<Route path="/staff_registration" component={StaffRegistration} />
		<Route path="/staff_qualities" component={StaffIndividualQualities} />
		<Route path="/assign_teachers_subjects" component={AssignTeachersSubjects} />
		
		
		
		
		<Route path="/exam_types_config" component={ExamTypesConfig} />
		<Route path="/examination_registration" component={ExamRegistration} />
		<Route path="/assign_classes_exams" component={AssignClassesExams} />
		
		
		<Route path="/teacher_select_exam" component={SelectExam} />
		
		
		
		
		
	
    </Switch>
  </Router>
    );
  }
}

export default App;