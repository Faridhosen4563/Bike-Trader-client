import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import Category from "../../Pages/Category/Category";
import AddProduct from "../../Pages/Dashboard/AddProduct/AddProduct";
import Allbuyer from "../../Pages/Dashboard/Allbuyer/Allbuyer";
import Allseller from "../../Pages/Dashboard/Allseller/Allseller";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import MyOrders from "../../Pages/Dashboard/MyOrders/MyOrders";
import MyProducts from "../../Pages/Dashboard/MyProducts/MyProducts";
import Payment from "../../Pages/Dashboard/Payment/Payment";
import ReportedItem from "../../Pages/Dashboard/ReportedItem/ReportedItem";
import Bikes from "../../Pages/Home/Categories/Bikes/Bikes";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login/Login";
import Signup from "../../Pages/Login/Signup/Signup";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import SellerRoute from "../SellerRoute/SellerRoute";

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
          fetch(`http://localhost:5000/categories/${params.name}`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem(
                "bikeTraderToken"
              )}`,
            },
          }),
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
      {
        path: "/dashboard/myporducts",
        element: (
          <SellerRoute>
            <MyProducts></MyProducts>
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/addproduct",
        element: (
          <SellerRoute>
            <AddProduct></AddProduct>
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/bookings/${params.id}`),
      },
    ],
  },
]);
