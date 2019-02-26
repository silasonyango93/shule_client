import DepartmentTypes from "../../system_modules/system_admin/DepartmentTypes.jsx";
import DepartmentsConfiguration from "../../system_modules/system_admin/DepartmentsConfiguration.jsx";

import AcademicClassLevelConfig from "../../system_modules/system_admin/AcademicClassLevelConfig.jsx";
import ClassStreamsConfig from "../../system_modules/system_admin/ClassStreamsConfig.jsx";
import ClassRegistration from "../../system_modules/system_admin/ClassRegistration.jsx";
import FieldCategoriesConfig from "../../system_modules/system_admin/FieldCategoriesConfig.jsx";
import FieldRegistration from "../../system_modules/system_admin/FieldRegistration.jsx";
import SubjectRegistration from "../../system_modules/system_admin/SubjectRegistration.jsx";
import ClassSubjectsRegistration from "../../system_modules/system_admin/ClassSubjectsRegistration.jsx";
import TermIterationsConfig from "../../system_modules/system_admin/TermIterationsConfig.jsx";
import ActualTermsRegistration from "../../system_modules/system_admin/ActualTermsRegistration.jsx";
import WeekIterationsConfiguration from "../../system_modules/system_admin/WeekIterationsConfiguration.jsx";
import ActualWeeksRegistration from "../../system_modules/system_admin/ActualWeeksRegistration.jsx";
import SelectCurriculum from "../../system_modules/system_admin/SelectCurriculum.jsx";

const routes = [
  {
    path: "/admin_home",
    name: "Home",
    icon: "nc-icon nc-bank",
    layout: "/admin"
  },
  {
    path: "/select_curriculum",
    name: "Select Curriculum",
    icon: "nc-icon nc-bank",
	component: SelectCurriculum,
    layout: "/admin"
  },
  {
    collapse: true,
    name: "Departments",
    icon: "nc-icon nc-book-bookmark",
    state: "pagesCollapse",
    views: [
	   
      {
        path: "/config_department_types",
        name: "Department Types",
        mini: "T",
        component: DepartmentTypes,
        layout: "/admin"
      },
	  {
        path: "/config_departments",
        name: "Add Department",
        mini: "A",
        component: DepartmentsConfiguration,
        layout: "/admin"
      }
    ]
  },
	
  {
    collapse: true,
    name: "Class Config",
    icon: "nc-icon nc-book-bookmark",
    state: "pagesCollapse",
    views: [
      {
        path: "/config_academic_class_level",
        name: "Class Levels",
        mini: "CL",
        component: AcademicClassLevelConfig,
        layout: "/admin"
      },
	  {
        path: "/config_class_stream",
        name: "Class Streams",
        mini: "CS",
        component: ClassStreamsConfig,
        layout: "/admin"
      },
	  {
        path: "/config_class",
        name: "Class Registration",
        mini: "CR",
        component: ClassRegistration,
        layout: "/admin"
      }
    ]
  },
  {
    collapse: true,
    name: "Subjects Config",
    icon: "nc-icon nc-book-bookmark",
    state: "pagesCollapse",
    views: [
      {
        path: "/config_field_categories",
        name: "Field Categories",
        mini: "FC",
        component: FieldCategoriesConfig,
        layout: "/admin"
      },
	  {
        path: "/field_registration",
        name: "Add Field",
        mini: "AF",
        component: FieldRegistration,
        layout: "/admin"
      },
	  {
        path: "/subject_registration",
        name: "Subject Registration",
        mini: "SR",
        component: SubjectRegistration,
        layout: "/admin"
      },
	  {
        path: "/class_subject_registration",
        name: "Class Subjects",
        mini: "CS",
        component: ClassSubjectsRegistration,
        layout: "/admin"
      }
    ]
  },
  {
    collapse: true,
    name: "School Calender",
    icon: "nc-icon nc-book-bookmark",
    state: "pagesCollapse",
    views: [
      {
        path: "/term_iterations_config",
        name: "Term Iterations",
        mini: "TI",
        component: TermIterationsConfig,
        layout: "/admin"
      },
	  {
        path: "/actual_term_registration",
        name: "Register Term",
        mini: "RT",
        component: ActualTermsRegistration,
        layout: "/admin"
      },
	  {
        path: "/week_iterations_config",
        name: "Week Iterations",
        mini: "WI",
        component: WeekIterationsConfiguration,
        layout: "/admin"
      },
	  {
        path: "/actual_week_registration",
        name: "Register Week",
        mini: "RW",
        component: ActualWeeksRegistration,
        layout: "/admin"
      }
    ]
  }
];

export default routes;
