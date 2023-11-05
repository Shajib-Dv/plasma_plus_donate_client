/** @format */

import { FaHeart } from "react-icons/fa";

const CurrentBloodRequest = () => {
  return (
    // TODO: Load blood request from server
    <div className="w-full h-full bg-base-100 p-10 shadow-xl rounded-md">
      <h2 className="text-black text-3xl font-bold leading-loose">
        Current Blood Request
      </h2>
      <div className="flex items-center gap-4 font-semibold">
        <FaHeart className="base-txt" />
        <p>{"A+"}</p>
        <p>{"location"}</p>
        <p>{"12.30.2023"}</p>
      </div>
    </div>
  );
};

export default CurrentBloodRequest;
