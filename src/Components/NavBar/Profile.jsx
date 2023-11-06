/** @format */

import useAuth from "../../hooks/useAuth";

const Profile = ({ user = {} }) => {
  const { logOut } = useAuth();
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
          <li>
            <a className="justify-between">
              Profile
              <span className="badge">New</span>
            </a>
          </li>
          <li>
            <a>Settings</a>
          </li>
          <li>
            <button onClick={() => logOut()}>Logout</button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Profile;
