/** @format */
import { BiGridSmall } from "react-icons/bi";
import { GiLifeSupport } from "react-icons/gi";
import Swal from "sweetalert2";
import useToast from "../../../hooks/useToast";
import useCurrentUser from "../../../hooks/useCurrentUser";
const ArticleCard = ({ article, handleEditArticle, refetch, openMessage }) => {
  const { Toast } = useToast();
  const { role } = useCurrentUser();
  const { _id, title, description, bannerImg } = article;

  const handleDeleteArticle = (id) => {
    Swal.fire({
      title: "Your article will be deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "#4433dd",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://plasma-plus-server.vercel.app/article/${id}`, {
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
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="relative">
        <figure className="h-80 rounded-lg">
          <img
            src={bannerImg}
            alt="image"
            className="w-full h-full object-cover"
          />
        </figure>
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-10 h-24 w-24">
          <div className="w-full h-full center-itm base-bg text-white rounded-sm">
            <GiLifeSupport className="text-7xl" />
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
                  <button onClick={() => handleEditArticle(article)}>
                    Edit
                  </button>
                </li>
                <li>
                  <button onClick={() => handleDeleteArticle(_id)}>
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
      <div className="card-body text-center gap-4 mt-10">
        <h2 className="text-2xl font-bold text-center">{title}</h2>
        <p>{description.slice(0, 100)}...</p>

        <div className="card-actions justify-center w-full">
          <button
            onClick={() => openMessage(description)}
            className="btn-base w-full"
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
