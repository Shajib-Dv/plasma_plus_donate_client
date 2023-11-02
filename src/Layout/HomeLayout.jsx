/** @format */

import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar/NavBar";

const HomeLayout = () => {
  return (
    <div className="">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default HomeLayout;
