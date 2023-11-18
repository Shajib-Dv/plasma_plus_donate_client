/** @format */

import { useRef, useState } from "react";

const img_host_url = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_IMG_HOST_KEY
}`;
const AddGalleryPhoto = ({ refetch }) => {
  const [loading, setLoading] = useState(false);
  const galleryPhotoRef = useRef();
  const [galleryPhoto, setGalleryPhoto] = useState(null);
  const [error, setError] = useState("");

  const uploadGalleryImage = () => {
    return new Promise((resolve, reject) => {
      const imgInfo = galleryPhotoRef.current?.files[0];
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
            setError("Unexpected error while uploading image");
            reject("Image upload failed");
          }
        })
        .catch((err) => {
          setError(err.message);
          reject(err.message);
        });
    });
  };

  const handleGalleryImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setGalleryPhoto(e.target.result);
        setError("");
      };

      reader.readAsDataURL(file);
    } else {
      setGalleryPhoto(null);
    }
  };

  const submitPhotoUpload = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const img = await uploadGalleryImage();
    const storedPhoto = { destBy: "Shajib", date: new Date(), img };

    fetch(`https://plasma-plus-server.vercel.app/gallery`, {
      method: "POST",
      mode: "no-cors",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(storedPhoto),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.insertedId) {
          refetch();
          setGalleryPhoto(null);
          setError("");
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  };
  return (
    <>
      <form
        onSubmit={submitPhotoUpload}
        className=" border-dotted border-2 p-4 rounded-md h-80"
      >
        <div
          onClick={() => galleryPhotoRef.current.click()}
          className="h-60 w-80 cursor-pointer rounded-lg relative overflow-hidden shadow-lg"
        >
          <img
            src={
              galleryPhoto
                ? galleryPhoto
                : "https://i.ibb.co/kc20dsb/blank-profile-picture-973460-1280.png"
            }
            alt="avatar"
            className="w-full h-full object-cover"
          />
          <input
            ref={galleryPhotoRef}
            type="file"
            accept=".png, .jpg, .jpeg"
            className="hidden"
            onChange={handleGalleryImageChange}
          />

          <div className="absolute center-ps base-txt font-semibold  w-full h-full text-center bg-black bg-opacity-50">
            <div className="center-itm w-full h-full">
              <p>{galleryPhoto ? "Change" : "Upload"} Photo</p>
            </div>
          </div>
          <div className="absolute bottom-4 w-full px-4">
            <div className="h-4">
              {error && (
                <p className="text-center base-txt animate-pulse">{error}</p>
              )}
            </div>
          </div>
        </div>
        {galleryPhoto && (
          <button
            disabled={loading}
            type="submit"
            className="btn-base w-full mt-2"
          >
            {loading ? (
              <span className="loading loading-dots loading-sm base-txt"></span>
            ) : (
              "Upload"
            )}
          </button>
        )}
      </form>
    </>
  );
};

export default AddGalleryPhoto;
