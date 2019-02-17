import AdminHome from "../../system_modules/system_admin/AdminHome.js";

const routes = [
  {
    path: "/admin_home",
    name: "Home",
    icon: "nc-icon nc-bank",
    component: AdminHome,
    layout: "/system_admin"
  },
	{
    collapse: true,
    name: "Departments",
    icon: "nc-icon nc-badge",
    state: "pagesCollapse",
    views: [
      {
        path: "/timeline",
        name: "Department Types",
        mini: "T",
        layout: "/system_admin"
      },
      {
        path: "/login",
        name: "Login",
        mini: "L",
        layout: "/system_admin"
      }
	]
	}
	
	
];



export default routes;