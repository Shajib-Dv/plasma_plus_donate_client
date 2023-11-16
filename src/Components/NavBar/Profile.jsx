/** @format */

import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useCurrentUser from "../../hooks/useCurrentUser";
import MakeNewAdmin from "../../Modals/adminModal/MakeNewAdmin";
import { useState } from "react";

const adminOptions = [
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

const Profile = ({ user = {} }) => {
  const { logOut } = useAuth();
  const { role, _id } = useCurrentUser();
  const userOptions = [
    {
      id: 1,
      url: `/user/donation_log/${_id}`,
      title: "donation log",
    },
  ];

  const [openModerate, setOpenModerate] = useState(false);

  const handleMakeModerate = () => {
    setOpenModerate(true);
  };
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
          {role && role === "admin" ? (
            <>
              {adminOptions.map((opt) => (
                <li key={opt.id} className="capitalize">
                  <Link to={opt.url}>{opt.title}</Link>
                </li>
              ))}
              <li>
                <button onClick={handleMakeModerate}>Add Moderator</button>
              </li>
            </>
          ) : (
            role === "user" &&
            userOptions.map((opt) => (
              <li key={opt.id} className="capitalize">
                <Link to={opt.url}>{opt.title}</Link>
              </li>
            ))
          )}
          <li>
            <button onClick={() => logOut()}>Logout</button>
          </li>
        </ul>
      </div>
      <MakeNewAdmin open={openModerate} close={() => setOpenModerate(false)} />
    </>
  );
};

export default Profile;
