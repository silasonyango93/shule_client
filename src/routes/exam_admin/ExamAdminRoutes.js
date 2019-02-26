import ExamTypesConfig from "../../system_modules/exam_admin/ExamTypesConfig.jsx";
import ExamRegistration from "../../system_modules/exam_admin/ExamRegistration.jsx";
import AssignClassesExams from "../../system_modules/exam_admin/AssignClassesExams.jsx";
import SelectResults from "../../system_modules/exam_admin/SelectResults.jsx";



const routes = [
  {
    path: "/admin_home",
    name: "Home",
    icon: "nc-icon nc-bank",
    layout: "/student_admin"
  },
  {
    collapse: true,
    name: "Configuration",
    icon: "nc-icon nc-book-bookmark",
    state: "pagesCollapse",
    views: [
      {
        path: "/exam_types_config",
        name: "Exam Types",
        mini: "ET",
        component: ExamTypesConfig,
        layout: "/exam_admin"
      }
    ]
  },
  {
    collapse: true,
    name: "Registration",
    icon: "nc-icon nc-book-bookmark",
    state: "pagesCollapse",
    views: [
	  {
        path: "/examination_registration",
        name: "Exam Registration",
        mini: "ER",
        component: ExamRegistration,
        layout: "/exam_admin"
      },
	  {
        path: "/assign_classes_exams",
        name: "Assign Classes",
        mini: "AC",
        component: AssignClassesExams,
        layout: "/exam_admin"
      }
    ]
  },
  {
    collapse: true,
    name: "Results",
    icon: "nc-icon nc-book-bookmark",
    state: "pagesCollapse",
    views: [
	  {
        path: "/select_results",
        name: "Per Class",
        mini: "PC",
        component: SelectResults,
        layout: "/exam_admin"
      },
	  {
        path: "/assign_classes_exams",
        name: "Assign Classes",
        mini: "AC",
        component: AssignClassesExams,
        layout: "/exam_admin"
      }
    ]
  }
];

export default routes;
