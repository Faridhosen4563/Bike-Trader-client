import Main from "../../Layout/Main";
import Category from "../../Pages/Category/Category";
import Bikes from "../../Pages/Home/Categories/Bikes/Bikes";
import Home from "../../Pages/Home/Home/Home";

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
    ],
  },
]);
