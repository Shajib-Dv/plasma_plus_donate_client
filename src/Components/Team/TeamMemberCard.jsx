/** @format */

import { MdEmail } from "react-icons/md";
import { BsFillTelephoneOutboundFill } from "react-icons/bs";
import Swal from "sweetalert2";
import useToast from "../../hooks/useToast";
import { BiGridSmall } from "react-icons/bi";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useState } from "react";
const TeamMemberCard = ({ member, refetch, handleMemberEdit }) => {
  const { Toast } = useToast();
  const { role } = useCurrentUser();
  const [showMenu, setShowMenu] = useState(false);

  const handleMemberDelete = (id) => {
    Swal.fire({
      title: "The member will be deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "#4433dd",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/team_member/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(async (result) => {
            if (result.deletedCount > 0) {
              refetch();
              await Toast.fire({
                icon: "success",
                title: "Article deleted successfully",
              });
            }
          });
      }
    });
  };

  return (
    <>
      <div
        onMouseLeave={() => setShowMenu(false)}
        className="card bg-base-100 shadow-2xl w-full min-h-[400px] border group overflow-hidden"
      >
        <figure className="h-60 rounded-md relative -z-0">
          <img
            src={member.image}
            alt="photo"
            className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-700`}
          />
          <div className="absolute bottom-6 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <button className="btn-base w-24">
              <a href={`tel:${member.phone}`}>
                <BsFillTelephoneOutboundFill className="text-white text-3xl" />
              </a>
            </button>
            <button className="btn-base w-24">
              <a href={`mailto:${member.email}`}>
                <MdEmail className="text-white text-3xl" />
              </a>
            </button>
          </div>
        </figure>
        <div className="card-body">
          <h2 className="card-title capitalize">
            {member.name}
            <div className="badge badge-warning capitalize">
              {member.memberRole}
            </div>
          </h2>
          <p className="py-2 capitalize">{member.bio}</p>
        </div>
        {role === "admin" && (
          <div className="absolute top-0 right-0 z-50 btn btn-ghost btn-circle">
            <label
              onClick={() => setShowMenu((p) => !p)}
              className="btn btn-ghost btn-circle avatar"
            >
              <BiGridSmall className="text-3xl base-txt" />
            </label>
            <ul
              className={`p-3 text-left space-y-4 shadow bg-base-100 rounded-box w-max mr-8 ${
                showMenu ? "opacity-100" : "opacity-0"
              }`}
            >
              <li>
                <button
                  onClick={() => handleMemberEdit(member)}
                  className="hover:underline p-1"
                >
                  Edit
                </button>
              </li>
              <li>
                <button
                  className="hover:underline p-1"
                  onClick={() => handleMemberDelete(member._id)}
                >
                  Delete
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default TeamMemberCard;
