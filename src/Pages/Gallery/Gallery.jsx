/** @format */

import { Helmet } from "react-helmet-async";
import EmptyData from "../../Components/EmptyData";
import JoiningBanner from "../../Components/Home/JoiningBanner";
import Loader from "../../Components/Loader";
import getGalleryPhotos from "../../utils/getGalleryPhotos";
import useCurrentUser from "../../hooks/useCurrentUser";
import { BiGridSmall } from "react-icons/bi";
import useToast from "../../hooks/useToast";
import Swal from "sweetalert2";

const Gallery = () => {
  const { photos, isLoading, refetch } = getGalleryPhotos();
  const { role } = useCurrentUser();
  const { Toast } = useToast();

  const handleDeletePhoto = (id) => {
    Swal.fire({
      title: "This photo will be deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "#4433dd",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/gallery/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(async (result) => {
            if (result.deletedCount > 0) {
              refetch();
              await Toast.fire({
                icon: "success",
                title: "Photo deleted successfully",
              });
            }
          });
      }
    });
  };
  return (
    <>
      <Helmet>
        <title>Plasma_plus | Gallery</title>
      </Helmet>
      <div className="mt-20">
        <h2 className="text-4xl font-bold text-black text-center">
          Our Photo <span className="base-txt">Gallery</span>
        </h2>
      </div>
      <div className="container mx-auto my-20 p-4">
        {isLoading && <Loader />}
        {photos && Array.isArray(photos) && photos.length > 0 ? (
          <div className="flex gap-6 flex-wrap">
            {photos.map((photo) => (
              <div
                key={photo._id}
                className="basis-1/5 rounded-md overflow-hidden relative"
              >
                <img
                  src={photo.img}
                  alt="photo"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                {role === "admin" && (
                  <div className="absolute top-0 right-0 z-20 btn btn-ghost btn-circle">
                    <div className="dropdown dropdown-end">
                      <label
                        tabIndex={0}
                        className="btn btn-ghost btn-circle avatar"
                      >
                        <BiGridSmall className="text-3xl base-txt" />
                      </label>
                      <ul
                        tabIndex={0}
                        className="z-20 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-max mr-4"
                      >
                        <li>
                          <button onClick={() => handleDeletePhoto(photo._id)}>
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          !isLoading && (
            <EmptyData
              message={"No Photos found !"}
              reason={"No photo uploaded yet !"}
            />
          )
        )}
      </div>
      <JoiningBanner />
    </>
  );
};

export default Gallery;
