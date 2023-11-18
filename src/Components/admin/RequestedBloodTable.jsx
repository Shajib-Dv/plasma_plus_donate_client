/** @format */

import { FaHeart, FaUserTie } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import {
  BsCalendarHeart,
  BsFillTrash3Fill,
  BsTelephoneFill,
} from "react-icons/bs";
import { BiMessageEdit, BiSolidLocationPlus } from "react-icons/bi";
import Swal from "sweetalert2";
import useToast from "../../hooks/useToast";

const RequestedBloodTable = ({ blood, refetch, handleMsgOpen }) => {
  const { _id, name, bloodGroup, city, date, phone, message } = blood;
  const { Toast } = useToast();
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

  const deleteBloodRequestToDB = async (id) => {
    const res = await fetch(
      `https://plasma-plus-server.vercel.app/blood_request/${id}`,
      {
        method: "DELETE",
      }
    );
    return res.json();
  };

  const handleDeleteBloodRequest = (id) => {
    Swal.fire({
      title: "Blood request will be deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "#dd336c",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteBloodRequestToDB(id).then(async (res) => {
          if (res.deletedCount > 0) {
            refetch();
            await Toast.fire({
              title: "Blood request deleted successfully",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <tr>
      <td>
        <div className="flex items-center gap-2">
          <FaUserTie className="base-txt" />
          {name}
        </div>
      </td>
      <td>
        <div className="flex items-center gap-2">
          <FaHeart className="base-txt" />
          {bloodGroup}
        </div>
      </td>
      <td>
        <div className="flex items-center gap-2">
          <BiSolidLocationPlus className="base-txt" />
          {city}
        </div>
      </td>
      <td>
        <div className="flex items-center gap-2">
          <BsCalendarHeart className="base-txt" />
          {getFormattedDate(date)}
        </div>
      </td>
      <td>
        <div className="flex items-center gap-2">
          <BsTelephoneFill className="base-txt" />
          <a href={`tel:${phone}`}>{phone || "not found"}</a>
        </div>
      </td>
      <td>
        <span
          onClick={() => handleMsgOpen(message)}
          className="tooltip tooltip-warning"
          data-tip={"Message"}
        >
          <MdMessage className="text-xl text-black cursor-pointer" />
        </span>
      </td>

      <td>
        <span className="tooltip tooltip-warning" data-tip={"Edit"}>
          <BiMessageEdit className="text-xl text-black cursor-pointer" />
        </span>
      </td>
      <td>
        <span
          onClick={() => handleDeleteBloodRequest(_id)}
          className="tooltip tooltip-warning"
          data-tip={"Delete"}
        >
          <BsFillTrash3Fill className="text-xl base-txt cursor-pointer" />
        </span>
      </td>
    </tr>
  );
};

export default RequestedBloodTable;
