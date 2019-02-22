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

import StudentTypeCategories from "../../system_modules/student_admin/StudentTypeCategories.jsx";

const routes = [
  {
    path: "/admin_home",
    name: "Home",
    icon: "nc-icon nc-bank",
    layout: "/student_admin"
  },
  {
    collapse: true,
    name: "Student",
    icon: "nc-icon nc-book-bookmark",
    state: "pagesCollapse",
    views: [
      {
        path: "/student_type_categories_config",
        name: "Type Categories",
        mini: "TC",
        component: StudentTypeCategories,
        layout: "/student_admin"
      }
    ]
  }
];

export default routes;
