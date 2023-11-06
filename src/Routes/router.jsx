/** @format */

import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";
import Home from "../Pages/Home/Home";
import Registration from "../Pages/Register/Registration";
import LogIn from "../Pages/Register/LogIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/registration", element: <Registration /> },
      { path: "/login", element: <LogIn /> },
    ],
  },
]);

export default router;
