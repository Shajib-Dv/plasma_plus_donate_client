/** @format */

import { NavLink } from "react-router-dom";

const ActiveLink = ({ children, to, onClick }) => {
  return (
    <NavLink
      onClick={onClick}
      to={to}
      className={({ isActive }) =>
        isActive ? "base-txt underline font-semibold" : "font-semibold"
      }
    >
      {children}
    </NavLink>
  );
};

export default ActiveLink;
