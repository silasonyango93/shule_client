import DepartmentTypes from "../../system_modules/system_admin/DepartmentTypes.jsx";
import DepartmentsConfiguration from "../../system_modules/system_admin/DepartmentsConfiguration.jsx";

import AcademicClassLevelConfig from "../../system_modules/system_admin/AcademicClassLevelConfig.jsx";
import ClassStreamsConfig from "../../system_modules/system_admin/ClassStreamsConfig.jsx";
import ClassRegistration from "../../system_modules/system_admin/ClassRegistration.jsx";
import FieldCategoriesConfig from "../../system_modules/system_admin/FieldCategoriesConfig.jsx";

const routes = [
  {
    path: "/admin_home",
    name: "Home",
    icon: "nc-icon nc-bank",
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
  }
];

export default routes;
