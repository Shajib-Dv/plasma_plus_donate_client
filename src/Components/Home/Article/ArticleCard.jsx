/** @format */
import { BiGridSmall } from "react-icons/bi";
import banner from "../../../assets/home_banner.jpg";
import { GiLifeSupport } from "react-icons/gi";
const ArticleCard = ({ article, handleEditArticle }) => {
  const handleDeleteArticle = (id) => {
    console.log("Delete article");
  };

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="relative">
        <figure className="h-80 rounded-lg">
          <img
            src={banner}
            alt="image"
            className="w-full h-full object-cover"
          />
        </figure>
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-10 h-24 w-24">
          <div className="w-full h-full center-itm base-bg text-white rounded-sm">
            <GiLifeSupport className="text-7xl" />
          </div>
        </div>
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
                <button onClick={() => handleEditArticle({ id: 2222 })}>
                  Edit
                </button>
              </li>
              <li>
                <button onClick={() => handleDeleteArticle()}>Delete</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="card-body text-center gap-4 mt-10">
        <h2 className="text-2xl font-bold text-center">{"become a donor"}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-center w-full">
          <button className="btn-base w-full">Read More</button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
