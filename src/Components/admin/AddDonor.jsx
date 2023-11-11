/** @format */

import { useRef, useState } from "react";
import useToast from "../../hooks/useToast";
import getDonors from "../../utils/getDonors";

const img_host_url = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_IMG_HOST_KEY
}`;
const AddDonor = () => {
  const [loading, setLoading] = useState(false);
  const avatarRef = useRef();
  const [avatar, setAvatar] = useState(null);
  const [inputData, setInputData] = useState({ bloodGroup: "A+" });
  const [error, setError] = useState("");
  const { Toast } = useToast();
  const { refetch } = getDonors();

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

  const storeDonorToDB = async (info) => {
    const res = await fetch(`http://localhost:3000/donors`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(info),
    });

    return res.json();
  };

  const reset = () => {
    setAvatar(null);
    setLoading(false);
    setInputData({ bloodGroup: "A+" });
    setError("");
    refetch();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (!avatar) {
      setError("Please choose an image");
      setLoading(false);
      return;
    }

    const donorImg = await uploadImage();

    const storeDonor = {
      ...inputData,
      donorImg,
      date: new Date(),
      status: true,
    };

    const res = await storeDonorToDB(storeDonor);

    if (res.insertedId) {
      e.target.reset();
      reset();
      await Toast.fire({
        title: "Donor added successfully",
        icon: "success",
      });
    }

    setLoading(false);
  };

  const handleInputChange = (name, value) => {
    setInputData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <div className="w-full my-10 border rounded-lg p-4">
      <form
        onSubmit={handleSubmit}
        className="flex items-center flex-col lg:flex-row gap-2"
      >
        <div className="flex gap-4 md:flex-row flex-col items-center">
          <div
            onClick={() => avatarRef.current.click()}
            className="h-80 w-80 cursor-pointer rounded-full relative overflow-hidden border border-error shadow-lg"
            title="Donor image"
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
                <p>{avatar ? "Change" : "Choose"} Image</p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 w-full space-y-4">
          <div className="flex lg:flex-row flex-col items-center gap-4">
            <div className="w-full">
              <label className="label">
                <span className="label-text font-semibold">Donor Name</span>
              </label>
              <input
                required={true}
                onChange={(e) => handleInputChange("name", e.target.value)}
                type="text"
                placeholder="Donor name..."
                className="input-file"
              />
            </div>
            <div className="w-full">
              <label className="label">
                <span className="label-text font-semibold">Donor Email</span>
              </label>
              <input
                required={true}
                onChange={(e) => handleInputChange("email", e.target.value)}
                type="email"
                placeholder="name@example.com"
                className="input-file"
              />
            </div>
          </div>
          <div className="flex lg:flex-row flex-col items-center gap-4">
            <div className="w-full">
              <label className="label">
                <span className="label-text font-semibold">Phone Number</span>
              </label>
              <input
                required={true}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                type="tel"
                placeholder="+880xxxxxxxxx"
                className="input-file"
              />
            </div>
            <div className="w-full">
              <label className="label">
                <span className="label-text font-semibold">Living City</span>
              </label>
              <input
                required={true}
                onChange={(e) => handleInputChange("city", e.target.value)}
                type="text"
                placeholder="Living city"
                className="input-file"
              />
            </div>
          </div>
          <div className="flex lg:flex-row flex-col items-center gap-4">
            <div className="w-full">
              <label className="label">
                <span className="label-text font-semibold">Blood Group</span>
              </label>
              <select
                onChange={(e) =>
                  handleInputChange("bloodGroup", e.target.value)
                }
                className="w-full input-file bg-transparent"
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div className="w-full">
              <label className="label">
                <span className="label-text font-semibold">
                  Last Donation Date
                </span>
              </label>
              <input
                required={true}
                onChange={(e) =>
                  handleInputChange("lastDonation", e.target.value)
                }
                type="date"
                placeholder="Last donation date"
                className="input-file"
              />
            </div>
          </div>

          <div className="text-center">
            <button disabled={loading} type="submit" className="btn-base w-1/2">
              {loading ? (
                <span className="loading loading-dots loading-sm base-txt"></span>
              ) : (
                "Save"
              )}
            </button>
          </div>
          <div className="h-4">
            {error && !avatar && (
              <p className="text-center base-txt animate-pulse">{error}</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddDonor;
