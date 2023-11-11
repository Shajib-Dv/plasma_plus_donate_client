/** @format */

import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useCurrentUser from "../../hooks/useCurrentUser";

const adminOptions = [
  {
    id: 1,
    url: "/admin/manage_donation",
    title: "manage donation",
  },
  {
    id: 2,
    url: "/admin/blood_request",
    title: "blood request",
  },
  {
    id: 3,
    url: "/admin/analytics",
    title: "analytics",
  },
];

const userOptions = [
  {
    id: 1,
    url: "/user/donation_log",
    title: "donation log",
  },
];

const Profile = ({ user = {} }) => {
  const { logOut } = useAuth();
  const { role } = useCurrentUser();
  return (
    <>
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle">
          <div className="avatar placeholder">
            <div className="base-bg text-white rounded-full w-10">
              <span>{user?.email?.slice(0, 2)}</span>
            </div>
          </div>
        </label>
        <ul
          tabIndex={0}
          className="mt-3 z-30 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
        >
          {role && role === "admin"
            ? adminOptions.map((opt) => (
                <li key={opt.id} className="capitalize">
                  <Link to={opt.url}>{opt.title}</Link>
                </li>
              ))
            : role === "user" &&
              userOptions.map((opt) => (
                <li key={opt.id} className="capitalize">
                  <Link to={opt.url}>{opt.title}</Link>
                </li>
              ))}
          <li>
            <button onClick={() => logOut()}>Logout</button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Profile;
