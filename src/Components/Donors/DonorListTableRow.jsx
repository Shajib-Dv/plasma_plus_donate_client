/** @format */
import { FaHeart, FaUserEdit } from "react-icons/fa";
import {
  BsCalendarHeart,
  BsFillTrash3Fill,
  BsTelephoneFill,
} from "react-icons/bs";
import useCurrentUser from "../../hooks/useCurrentUser";
const DonorListTableRow = () => {
  const { role } = useCurrentUser();
  return (
    <tr>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img
                src="/tailwind-css-component-profile-2@56w.png"
                alt="Donor"
              />
            </div>
          </div>
          <div>
            <div className="font-bold">{"Name"}</div>
          </div>
        </div>
      </td>
      <td>
        <span className="badge badge-ghost badge-sm">A+</span>
      </td>
      <td>{"location"}</td>
      <th>
        <div className="flex items-center gap-2">
          <BsTelephoneFill className="base-txt" />
          <a href={`tel:00`}>{"Tel"}</a>
        </div>
      </th>
      <th>
        <div className="flex items-center gap-2">
          <FaHeart className={`base-txt opacity-60`} />
          <span>Status</span>
        </div>
      </th>
      <th>
        <div className="flex items-center gap-2">
          <BsCalendarHeart className={`base-txt`} />
          <span>Last_d</span>
        </div>
      </th>
      {role === "admin" && (
        <>
          <th>
            <span className="tooltip tooltip-warning" data-tip="Donate">
              <FaUserEdit className="base-txt text-xl" />
            </span>
          </th>
          <th>
            <span className="tooltip tooltip-error" data-tip="Delete">
              <BsFillTrash3Fill className="base-txt" />
            </span>
          </th>
        </>
      )}
    </tr>
  );
};

export default DonorListTableRow;
