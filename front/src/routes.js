/*!

=========================================================
* Black Dashboard React v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import DashboardC from "views/DashboardC";

import Map from "views/Map.js";
import Notifications from "views/Notifications.js";

import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
   
    icon: "tim-icons icon-chart-pie-36",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/DashbordCondidat",
    name: "Dashboard",
   
    icon: "tim-icons icon-chart-pie-36",
    component: <DashboardC />,
    layout: "/condidat",
  },
 

  {
    path: "/user-profile",
    name: "User Profile",
   
    icon: "tim-icons icon-single-02",
    component: <UserProfile   />,
    layout: "/admin",
  },

 
];
export default routes;
