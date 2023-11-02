/** @format */

import { FaBars, FaPlus, FaTimes } from "react-icons/fa";
import TopNavStatic from "./TopNavStatic";
import { useState } from "react";
import ActiveLink from "./ActiveLink";
const links = [
  { id: 1, title: "Home", url: "/" },
  { id: 2, title: "About us", url: "/about_us" },
  { id: 3, title: "Campaign", url: "/campaign" },
  { id: 4, title: "Gallery", url: "/gallery" },
  { id: 5, title: "Blog", url: "/blog" },
  { id: 6, title: "Contact", url: "/contact" },
  { id: 7, title: "Registration", url: "/registration" },
];
const NavBar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <>
      <TopNavStatic />
      <div className="w-full h-24 bg-base-200 flex  items-center justify-between">
        <div className="h-full lg:w-3/12 w-full base-bg brand-box center-itm">
          <h2 className="text-3xl text-white font-bold">Plasma</h2>
          <FaPlus className="text-white text-3xl" />
        </div>
        <div className="lg:flex hidden w-full justify-evenly">
          {links.map((link) => (
            <ActiveLink key={link.id} to={link.url}>
              {link.title}
            </ActiveLink>
          ))}
        </div>
        <div className="w-60 border h-full"></div>
        <div className="lg:hidden w-20 z-50">
          <button
            className="btn btn-ghost btn-circle "
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            {isNavOpen ? (
              <FaTimes className="text-error text-xl" />
            ) : (
              <FaBars className="text-error text-xl" />
            )}
          </button>
        </div>
      </div>
      <div
        className={`lg:hidden flex flex-col w-full px-10 space-y-4 bg-base-200 fixed transition-all duration-700 ease-out ${
          isNavOpen ? "left-0" : "-left-[999px] rounded-md"
        }`}
      >
        {links.map((link) => (
          <ActiveLink
            key={link.id}
            to={link.url}
            onClick={() => setIsNavOpen((p) => !p)}
          >
            {link.title}
          </ActiveLink>
        ))}
      </div>
    </>
  );
};

export default NavBar;