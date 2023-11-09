/** @format */

import { Link } from "react-router-dom";

const EmptyData = ({ reason, message, to, go }) => {
  return (
    <div className="h-full w-full center-itm">
      <div className="modal-box mx-auto shadow-md base-bg text-white">
        <h3 className="font-bold text-lg capitalize">{reason}</h3>
        <p className="py-4 capitalize">{message}</p>
        <div className="text-center mt-4">
          {go && (
            <Link to={to}>
              <button className="btn w-1/2">{go}</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmptyData;
