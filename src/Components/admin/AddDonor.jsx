/** @format */

import { useRef, useState } from "react";

const img_host_url = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_IMG_HOST_KEY
}`;
const AddDonor = () => {
  const [loading, setLoading] = useState(false);
  const avatarRef = useRef();
  const [avatar, setAvatar] = useState(null);
  const [inputData, setInputData] = useState({ bloodGroup: "A+" });
  const [error, setError] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!avatar) {
      setError("Please choose an image");
      return;
    }
    console.log(inputData);
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
            <input
              required={true}
              onChange={(e) => handleInputChange("name", e.target.value)}
              type="text"
              placeholder="Donor name..."
              className="input-file"
            />
            <input
              required={true}
              onChange={(e) => handleInputChange("email", e.target.value)}
              type="email"
              placeholder="Donor email..."
              className="input-file"
            />
          </div>
          <div className="flex lg:flex-row flex-col items-center gap-4">
            <input
              required={true}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              type="tel"
              placeholder="Phone number"
              className="input-file"
            />
            <input
              required={true}
              onChange={(e) => handleInputChange("city", e.target.value)}
              type="text"
              placeholder="Living city"
              className="input-file"
            />
          </div>
          <div className="flex lg:flex-row flex-col items-center gap-4">
            <select
              onChange={(e) => handleInputChange("bloodGroup", e.target.value)}
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
