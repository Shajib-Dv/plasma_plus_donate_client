/** @format */
import { FaUserEdit } from "react-icons/fa";
import { MdBloodtype, MdLocationPin } from "react-icons/md";
import {
  BsBalloonHeart,
  BsCalendarHeart,
  BsFillBalloonHeartFill,
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

  const getDifferenceOfDate = (date) => {
    const givenDate = new Date(date);

    const currentDate = new Date();

    const timeDifference = currentDate - givenDate;

    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    return daysDifference.toFixed(0);
  };

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
        <div className="flex items-center gap-1">
          <MdBloodtype className="base-txt text-xl" />
          <span className="badge badge-ghost badge-sm">{bloodGroup}</span>
        </div>
      </td>
      <td>
        <div className="flex items-center gap-1">
          <MdLocationPin className="base-txt text-xl" />
          {city}
        </div>
      </td>
      <th>
        <div className="flex items-center gap-2">
          <BsTelephoneFill className="base-txt" />
          <a href={`tel:${phone}`}>{phone}</a>
        </div>
      </th>
      <th>
        <div
          className="flex items-center gap-2 tooltip tooltip-warning"
          data-tip={isAbleToDonate === "true" ? "available" : "unavailable"}
        >
          {isAbleToDonate === "true" ? (
            <BsFillBalloonHeartFill className={`base-txt text-xl`} />
          ) : (
            <BsBalloonHeart className={`base-txt text-xl`} />
          )}
        </div>
      </th>
      <th>
        <div>
          <div className="flex items-center gap-2">
            <BsCalendarHeart className={`base-txt`} />
            <span>{lastDonation}</span>
          </div>
          <p className="base-txt font-normal text-xs">
            {getDifferenceOfDate(lastDonation)} days ago
          </p>
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
