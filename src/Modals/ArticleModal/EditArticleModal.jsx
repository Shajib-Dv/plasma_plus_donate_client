/** @format */

import { useRef, useState } from "react";
import useToast from "../../hooks/useToast";
import { FaTimes } from "react-icons/fa";

const img_host_url = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_IMG_HOST_KEY
}`;
const EditArticleModal = ({ open, close, article, refetch }) => {
  const avatarRef = useRef();
  const [avatar, setAvatar] = useState(null);
  const [inputData, setInputData] = useState({});
  const [loading, setLoading] = useState(false);
  const { Toast } = useToast();

  const { _id, title, description, bannerImg } = article;

  const uploadImage = () => {
    return new Promise((resolve, reject) => {
      const imgInfo = avatarRef.current?.files[0];
      if (!imgInfo) {
        reject("No image selected");
        return;
      }

      const imageData = new FormData();
      imageData.append("image", imgInfo);
      fetch(img_host_url, {
        method: "POST",
        body: imageData,
      })
        .then((res) => res.json())
        .then((imageRes) => {
          if (imageRes.success) {
            const imgURL = imageRes.data.display_url;
            resolve(imgURL);
          } else {
            reject("Image upload failed");
          }
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setAvatar(e.target.result);
      };

      reader.readAsDataURL(file);
    } else {
      setAvatar(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleUpdateArticle = async (id) => {
    setLoading(true);

    try {
      let newBanner = bannerImg;
      if (avatar) {
        newBanner = await uploadImage();
      }

      const storeArticle = {
        ...inputData,
        bannerImg: newBanner,
        date: new Date(),
      };

      fetch(`https://plasma-plus-server.vercel.app/article/${id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(storeArticle),
      })
        .then((res) => res.json())
        .then(async (result) => {
          if (result.modifiedCount > 0) {
            refetch();
            close();
            setLoading(false);
            await Toast.fire({
              icon: "success",
              title: "Article updated successfully",
            });
          }
        });
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <>
      <dialog open={open} className="modal">
        <div className="modal-box w-11/12 max-w-5xl border-2">
          <div className="modal-action justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <div className="flex gap-4 md:flex-row flex-col items-center">
                <div
                  onClick={() => avatarRef.current.click()}
                  className="h-80 w-full cursor-pointer rounded-lg relative overflow-hidden"
                  title="Choose article banner"
                >
                  <img
                    src={avatar ? avatar : bannerImg}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                  <input
                    ref={avatarRef}
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    className="hidden"
                    onChange={handleImageChange}
                  />

                  <div className="absolute center-ps  base-txt font-semibold  w-full h-full text-center bg-black bg-opacity-50">
                    <div className="center-itm w-full h-full">
                      <p>
                        {avatar || !!bannerImg ? "Change" : "Choose"} Banner
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-6">
                <input
                  required={true}
                  onChange={(e) =>
                    setInputData({ ...inputData, title: e.target.value })
                  }
                  type="text"
                  placeholder="Title"
                  className="input-file"
                  defaultValue={title}
                />
                <textarea
                  required={true}
                  onChange={(e) =>
                    setInputData({ ...inputData, description: e.target.value })
                  }
                  className="input-file mt-4"
                  cols="20"
                  rows="4"
                  placeholder="Write your article description"
                  defaultValue={description}
                ></textarea>
                <button
                  disabled={loading}
                  onClick={() => handleUpdateArticle(_id)}
                  className="btn-base w-full"
                >
                  {loading ? (
                    <span className="loading loading-dots loading-sm base-txt"></span>
                  ) : (
                    "Update"
                  )}
                </button>
              </div>
            </form>
            <div
              onClick={() => close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-0 top-0"
            >
              <FaTimes className="text-2xl base-txt" />
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default EditArticleModal;
