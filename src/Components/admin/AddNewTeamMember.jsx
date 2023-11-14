/** @format */

import { useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import getTeamMember from "../../utils/getTeamMember";
import useToast from "../../hooks/useToast";
const img_host_url = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_IMG_HOST_KEY
}`;
const AddNewTeamMember = ({ close }) => {
  const [loading, setLoading] = useState(false);
  const avatarRef = useRef(null);
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState("");
  const [inputInfo, setInputInfo] = useState({});
  const { refetch } = getTeamMember();
  const { Toast } = useToast();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setAvatar(e.target.result);
        setError("");
      };

      reader.readAsDataURL(file);
    } else {
      setAvatar(null);
    }
  };

  const uploadMemberImage = () => {
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
            setError("Image upload failed");
          }
        })
        .catch((err) => {
          reject(err.message);
          setError("An unknown error occurred during upload image");
        });
    });
  };

  const storeNewMember = async (data) => {
    const res = await fetch(`http://localhost:3000/team_member`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });

    return res.json();
  };

  const handleAddNewMember = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (!avatar) {
      setError("Please select an image");
      return;
    }

    const image = await uploadMemberImage();

    const storedMember = { ...inputInfo, image };

    try {
      const res = await storeNewMember(storedMember);

      if (res.insertedId) {
        refetch();
        e.target.reset();
        setAvatar(null);
        setLoading(false);
        setInputInfo({});
        Toast.fire({
          title: "New Member Added",
          icon: "success",
        });
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleInputChange = (name, value) => {
    setInputInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };
  return (
    <div className="lg:w-1/2 mx-auto p-4 border rounded-lg relative mt-10">
      <form onSubmit={handleAddNewMember}>
        <div className="flex flex-col lg:flex-row items-center gap-4">
          <div className="flex gap-4 md:flex-row flex-col items-center">
            <div
              onClick={() => avatarRef.current.click()}
              className="h-80 w-80 cursor-pointer relative overflow-hidden border rounded-full shadow-lg"
              title="Photo"
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
                name="file"
              />

              <div className="absolute center-ps  base-txt font-semibold  w-full h-full text-center bg-black bg-opacity-50">
                <div className="center-itm w-full h-full">
                  <p>{avatar ? "Change" : "Choose"} Image</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="w-full flex items-center gap-2">
              <div>
                <label className="label">
                  <span>Full Name</span>
                </label>
                <input
                  required={true}
                  type="text"
                  placeholder="Enter full name"
                  className="input-file"
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>
              <div>
                <label className="label">
                  <span>Email</span>
                </label>
                <input
                  required={true}
                  type="email"
                  placeholder="example@example.com"
                  className="input-file"
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
            </div>
            <div className="w-full flex items-center gap-2">
              <div className="w-full">
                <label className="label">
                  <span>Phone Number</span>
                </label>
                <input
                  required={true}
                  type="tel"
                  placeholder="+880******"
                  className="input-file"
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>
              <div className="w-full">
                <label className="label">
                  <span>Role</span>
                </label>
                <select
                  onChange={(e) =>
                    handleInputChange("memberRole", e.target.value)
                  }
                  required={true}
                  className="input-file bg-transparent"
                >
                  <option value={""}>Select</option>
                  <option disabled value="founder">
                    Founder
                  </option>
                  <option value="co_founder">Co-Founder</option>
                  <option value="chairman">Chairman</option>
                  <option value="secretary">Secretary</option>
                  <option value="member">Member</option>
                </select>
              </div>
            </div>
            <div className="my-2">
              <textarea
                onChange={(e) => handleInputChange("bio", e.target.value)}
                className="input-file"
                cols="5"
                rows="5"
                maxLength={300}
                placeholder="Bio................................................................"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="text-center my-2">
          <button disabled={loading} type="submit" className="btn-base w-1/2">
            {loading ? (
              <span className="loading loading-dots loading-sm base-txt"></span>
            ) : (
              "Add to team"
            )}
          </button>
        </div>
        <div className="h-4">
          {error && (
            <p className="text-xs base-txt animate-pulse text-center">
              {error}
            </p>
          )}
        </div>
      </form>
      <button
        onClick={close}
        className="btn btn-ghost btn-circle absolute right-0 top-0"
      >
        <FaTimes className="text-xl base-txt" />
      </button>
    </div>
  );
};

export default AddNewTeamMember;
