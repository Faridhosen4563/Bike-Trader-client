import Main from "../../Layout/Main";
import Category from "../../Pages/Category/Category";
import Bikes from "../../Pages/Home/Categories/Bikes/Bikes";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login/Login";
import Signup from "../../Pages/Login/Signup/Signup";

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
        element: <Bikes></Bikes>,
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
]);
