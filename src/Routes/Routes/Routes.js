import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import Category from "../../Pages/Category/Category";
import Allbuyer from "../../Pages/Dashboard/Allbuyer/Allbuyer";
import Allseller from "../../Pages/Dashboard/Allseller/Allseller";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import MyOrders from "../../Pages/Dashboard/MyOrders/MyOrders";
import ReportedItem from "../../Pages/Dashboard/ReportedItem/ReportedItem";
import Bikes from "../../Pages/Home/Categories/Bikes/Bikes";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login/Login";
import Signup from "../../Pages/Login/Signup/Signup";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const { createBrowserRouter } = require("react-router-dom");

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/category",
        element: <Category></Category>,
      },
      {
        path: "/category/:name",
        loader: ({ params }) =>
          fetch(`http://localhost:5000/categories/${params.name}`),
        element: (
          <PrivateRoute>
            <Bikes></Bikes>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/myorders",
        element: (
          <PrivateRoute>
            <MyOrders></MyOrders>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/allseller",
        loader: () => fetch("http://localhost:5000/users/seller"),
        element: (
          <AdminRoute>
            <Allseller></Allseller>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/allbuyer",
        element: (
          <AdminRoute>
            <Allbuyer></Allbuyer>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/reported",
        element: (
          <AdminRoute>
            <ReportedItem></ReportedItem>
          </AdminRoute>
        ),
      },
    ],
  },
]);
