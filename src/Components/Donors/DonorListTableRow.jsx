/** @format */
import { FaHeart, FaUserEdit } from "react-icons/fa";
import {
  BsCalendarHeart,
  BsFillTrash3Fill,
  BsTelephoneFill,
} from "react-icons/bs";
import useCurrentUser from "../../hooks/useCurrentUser";
const DonorListTableRow = ({ donor }) => {
  const {
    _id,
    bloodGroup,
    name,
    phone,
    city,
    lastDonation,
    donorImg,
    isAbleToDonate,
  } = donor;
  const { role } = useCurrentUser();
  return (
    <tr>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={donorImg} alt="Donor" loading="lazy" />
            </div>
          </div>
          <div>
            <div className="font-bold">{name}</div>
          </div>
        </div>
      </td>
      <td>
        <span className="badge badge-ghost badge-sm">{bloodGroup}</span>
      </td>
      <td>{city}</td>
      <th>
        <div className="flex items-center gap-2">
          <BsTelephoneFill className="base-txt" />
          <a href={`tel:${phone}`}>{phone}</a>
        </div>
      </th>
      <th>
        <div className="flex items-center gap-2">
          <FaHeart
            className={`base-txt ${
              isAbleToDonate === "unable" && "opacity-60"
            }`}
          />
          <span>{isAbleToDonate}</span>
        </div>
      </th>
      <th>
        <div className="flex items-center gap-2">
          <BsCalendarHeart className={`base-txt`} />
          <span>{lastDonation}</span>
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
