import ExamTypesConfig from "../../system_modules/exam_admin/ExamTypesConfig.jsx";



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
  }
];

export default routes;
