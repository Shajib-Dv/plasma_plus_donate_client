/** @format */

import { useRef, useState } from "react";
import useToast from "../../../hooks/useToast";
const img_host_url = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_IMG_HOST_KEY
}`;
const AddArticles = ({ refetch }) => {
  const avatarRef = useRef();
  const [avatar, setAvatar] = useState(null);
  const [inputData, setInputData] = useState({});
  const [loading, setLoading] = useState(false);
  const { Toast } = useToast();

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
    try {
      setLoading(true);
      const bannerImg = await uploadImage();

      const storeArticle = {
        ...inputData,
        bannerImg,
        date: new Date(),
      };

      await fetch(`http://localhost:3000/article`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(storeArticle),
      })
        .then((res) => res.json())
        .then(async (res) => {
          if (res.insertedId) {
            refetch();
            setInputData({});
            e.target.reset();
            setAvatar(null);
            setLoading(false);
            await Toast.fire({
              icon: "success",
              title: "Article successfully added",
            });
          }
        })
        .catch(() => setLoading(false));
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="card w-full min-h-[20rem] bg-base-100 shadow-xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 pb-8">
        <div className="flex gap-4 md:flex-row flex-col items-center">
          <div
            onClick={() => avatarRef.current.click()}
            className="h-80 w-full cursor-pointer rounded-lg relative overflow-hidden"
            title="Choose article banner"
          >
            <img
              src={
                avatar
                  ? avatar
                  : "https://i.ibb.co/kc20dsb/blank-profile-picture-973460-1280.png"
              }
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
                <p>{avatar ? "Change" : "Choose"} Banner</p>
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
          ></textarea>
          <button disabled={loading} type="submit" className="btn-base w-full">
            {loading ? (
              <span className="loading loading-dots loading-sm base-txt"></span>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddArticles;
