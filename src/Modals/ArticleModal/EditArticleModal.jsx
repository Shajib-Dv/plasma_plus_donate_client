/** @format */

import { useRef, useState } from "react";

const img_host_url = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_IMG_HOST_KEY
}`;
const EditArticleModal = ({ open, close, article }) => {
  const avatarRef = useRef();
  const [avatar, setAvatar] = useState(null);
  const [inputData, setInputData] = useState({});

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
      const bannerImg = await uploadImage();

      const storeArticle = {
        ...inputData,
        bannerImg,
        date: new Date(),
        user: "user",
      };
      console.log(storeArticle);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <dialog open={open} className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <div className="modal-action justify-center">
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
                <button type="submit" className="btn-base w-full">
                  Submit
                </button>
              </div>
            </form>
            <div
              onClick={() => close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-0 top-0 base-txt"
            >
              X
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default EditArticleModal;
