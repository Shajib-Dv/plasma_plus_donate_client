/** @format */

import { FaHeart } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BsFillTrash3Fill } from "react-icons/bs";
import { BiMessageEdit } from "react-icons/bi";

const RequestedBloodTable = ({ blood, refetch }) => {
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
    <tr>
      <td>{blood?.name}</td>
      <td className="flex items-center gap-2">
        <FaHeart className="base-txt" />
        {blood?.bloodGroup}
      </td>
      <td>{blood?.city}</td>
      <td>{getFormattedDate(blood?.date)}</td>
      <td>
        <a href={`tel:${blood?.phone}`}>{blood?.phone || "not found"}</a>
      </td>
      <td>
        <span className="tooltip tooltip-warning" data-tip={"Message"}>
          <MdMessage className="text-xl text-black cursor-pointer" />
        </span>
      </td>

      <td>
        <span className="tooltip tooltip-warning" data-tip={"Edit"}>
          <BiMessageEdit className="text-xl text-black cursor-pointer" />
        </span>
      </td>
      <td>
        <span className="tooltip tooltip-warning" data-tip={"Delete"}>
          <BsFillTrash3Fill className="text-xl base-txt cursor-pointer" />
        </span>
      </td>
    </tr>
  );
};

export default RequestedBloodTable;
