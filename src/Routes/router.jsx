/** @format */

import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";
import Home from "../Pages/Home/Home";
import Registration from "../Pages/Register/Registration";
import LogIn from "../Pages/Register/LogIn";
import AboutUs from "../Pages/About_us/AboutUs";
import Campaign from "../Pages/Campaign/Campaign";
import Gallery from "../Pages/Gallery/Gallery";
import Donors from "../Pages/Donors/Donors";
import adminRoutes from "./adminRoutes";
import userRoutes from "./userRoutes";
import DonorsLog from "../Components/Donors/DonorsLog";
import NotFoundPage from "../Components/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/registration", element: <Registration /> },
      { path: "/login", element: <LogIn /> },
      { path: "/about_us", element: <AboutUs /> },
      { path: "/campaign", element: <Campaign /> },
      { path: "/gallery", element: <Gallery /> },
      { path: "/donors", element: <Donors /> },
      { path: "/donors/log/:id", element: <DonorsLog /> },
      ...adminRoutes,
      ...userRoutes,
    ],
  },
]);

export default router;
