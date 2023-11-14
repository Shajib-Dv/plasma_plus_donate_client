/** @format */

import { FaCalendar, FaSearchLocation, FaStopwatch } from "react-icons/fa";
import { BiGridSmall } from "react-icons/bi";
import { Link } from "react-router-dom";

const CampaignCard = ({ campaign, role }) => {
  const { _id, campaignStart, campaignEnd, title, location, des, campaignImg } =
    campaign;

  const formatDateAndTime = (inputDate) => {
    const date = new Date(inputDate);

    // Format time (12-hour clock with AM/PM)
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    // Format start date
    const formattedStartDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return { time: formattedTime, startDate: formattedStartDate };
  };

  const formatTime = (inputTime) => {
    const [hours, minutes] = inputTime.split(":");
    const formattedTime = new Date(
      2022,
      0,
      1,
      hours,
      minutes
    ).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return formattedTime;
  };
  return (
    <div className="flex flex-col h-full lg:flex-row gap-5 bg-base-100 shadow-lg border p-4 rounded-md relative">
      <Link to={`/campaign/${_id}`} className="flex-1">
        <div className="relative group overflow-hidden rounded-md">
          <img
            src={campaignImg}
            alt="photo"
            className="h-full w-full object-cover group-hover:scale-105 transition-all duration-500"
          />
          <div className="absolute center-ps w-full h-full">
            <div className="w-full h-full bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-500 flex items-center justify-center">
              <p className="text-xl base-txt font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 ">
                Read More
              </p>
            </div>
          </div>
        </div>
      </Link>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <FaCalendar className="base-txt text-xl" />
          <p>{formatDateAndTime(campaignStart).startDate}</p>
        </div>
        <h2 className="text-2xl text-black font-bold capitalize pt-2">
          {title}
        </h2>
        <p className="py-4">{des.slice(0, 150)}...</p>
        <div className="flex items-center flex-wrap gap-4 justify-between">
          <div className="flex items-center gap-2">
            <FaStopwatch className="base-txt text-xl" />
            <p>{formatDateAndTime(campaignStart).time}</p> <span>-</span>
            <p>{formatTime(campaignEnd)}</p>
          </div>
          <div className="flex items-center gap-2">
            <FaSearchLocation className="base-txt text-xl" />
            <p>{location}</p>
          </div>
        </div>
      </div>
      {role === "admin" && (
        <div className="absolute top-0 right-0 z-20 btn btn-ghost btn-circle">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <BiGridSmall className="text-3xl base-txt" />
            </label>
            <ul
              tabIndex={0}
              className="z-20 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-max mr-4"
            >
              <li>
                <button>Delete</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignCard;
