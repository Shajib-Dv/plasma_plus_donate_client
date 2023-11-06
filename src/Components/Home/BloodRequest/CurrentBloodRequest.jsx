/** @format */

import { FaHeart } from "react-icons/fa";
import getCurrentBloodRequest from "../../../utils/getCurrentBloodRequest";

const CurrentBloodRequest = () => {
  const { requestedBloods } = getCurrentBloodRequest(12);
  const getFormattedDate = (time) => {
    const date = new Date(time);

    const options = {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    const formattedDate = date.toLocaleString(undefined, options);
    return formattedDate;
  };
  return (
    <div className="w-full min-h-full bg-base-100 p-10 shadow-xl rounded-md">
      <h2 className="text-black text-3xl font-bold leading-loose">
        Current Blood Request
      </h2>
      <div className="overflow-y-auto">
        <table className="space-y-6 table lg:w-full  w-max">
          {requestedBloods &&
            Array.isArray(requestedBloods) &&
            requestedBloods.map((blood) => (
              <tbody key={blood._id}>
                <tr>
                  <td>
                    <FaHeart className="base-txt" />
                  </td>
                  <td>{blood?.bloodGroup}</td>
                  <td>{blood?.city}</td>
                  <td>{getFormattedDate(blood?.date)}</td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
    </div>
  );
};

export default CurrentBloodRequest;
