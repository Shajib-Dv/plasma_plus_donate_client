/** @format */

import { useRef, useState } from "react";
import useToast from "../../hooks/useToast";

import { FaTimes } from "react-icons/fa";
const img_host_url = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_IMG_HOST_KEY
}`;
const EditTeamMemberModal = ({ open, close, member, refetch }) => {
  const [loading, setLoading] = useState(false);
  const memberImgRef = useRef(null);
  const [memberAvatar, setMemberAvatar] = useState(null);
  const [error, setError] = useState("");
  const [inputMemberInfo, setInputMemberInfo] = useState({});
  const { Toast } = useToast();

  const { _id, name, email, phone, memberRole, bio, image } = member || {};

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setMemberAvatar(e.target.result);
        setError("");
      };

      reader.readAsDataURL(file);
    } else {
      setMemberAvatar(null);
    }
  };

  const uploadMemberImage = () => {
    return new Promise((resolve, reject) => {
      const imgInfo = memberImgRef.current?.files[0];
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

  const updateMemberInfo = async (data) => {
    const res = await fetch(
      `https://plasma-plus-server.vercel.app/team_member/${_id}`,
      {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    return res.json();
  };

  const handleEditMember = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    let newImage = image;
    if (memberAvatar) {
      console.log("img");
      newImage = await uploadMemberImage();
    }

    if (Object.keys(inputMemberInfo).length < 1) {
      setLoading(false);
      close();
      Toast.fire({
        title: "No change found to update !",
        icon: "warning",
      });
    }

    const updatedMemberInfo = { ...inputMemberInfo, image: newImage };

    try {
      const res = await updateMemberInfo(updatedMemberInfo);

      if (res.modifiedCount > 0) {
        refetch();
        e.target.reset();
        setMemberAvatar(null);
        setLoading(false);
        setInputMemberInfo({});
        close();
        Toast.fire({
          title: "Member Info Updated",
          icon: "success",
        });
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleMemberInputChange = (name, value) => {
    setInputMemberInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };
  return (
    <>
      <dialog open={open} className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <div className="modal-action justify-center">
            <form onSubmit={handleEditMember}>
              <div className="flex flex-col lg:flex-row items-center gap-4">
                <div className="flex gap-4 md:flex-row flex-col items-center">
                  <div
                    onClick={() => memberImgRef.current.click()}
                    className="h-80 w-80 cursor-pointer relative overflow-hidden border rounded-full shadow-lg"
                    title="Photo"
                  >
                    <img
                      src={memberAvatar ? memberAvatar : image}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                    <input
                      ref={memberImgRef}
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      className="hidden"
                      onChange={handleImageChange}
                      name="file"
                    />

                    <div className="absolute center-ps  base-txt font-semibold  w-full h-full text-center bg-black bg-opacity-50">
                      <div className="center-itm w-full h-full">
                        <p>
                          {memberAvatar || image ? "Change" : "Choose"} Image
                        </p>
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
                        defaultValue={name}
                        onChange={(e) =>
                          handleMemberInputChange("name", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="label">
                        <span>Email</span>
                      </label>
                      <input
                        required={true}
                        type="email"
                        defaultValue={email}
                        placeholder="example@example.com"
                        className="input-file"
                        onChange={(e) =>
                          handleMemberInputChange("email", e.target.value)
                        }
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
                        defaultValue={phone}
                        placeholder="+880******"
                        className="input-file"
                        onChange={(e) =>
                          handleMemberInputChange("phone", e.target.value)
                        }
                      />
                    </div>
                    <div className="w-full">
                      <label className="label">
                        <span>Role</span>
                      </label>
                      <select
                        defaultValue={memberRole}
                        onChange={(e) =>
                          handleMemberInputChange("memberRole", e.target.value)
                        }
                        required={true}
                        className="input-file bg-transparent"
                      >
                        <option value={memberRole}>{memberRole}</option>
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
                      onChange={(e) =>
                        handleMemberInputChange("bio", e.target.value)
                      }
                      className="input-file"
                      cols="5"
                      rows="5"
                      defaultValue={bio}
                      maxLength={300}
                      placeholder="Bio................................................................"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="text-center my-2">
                <button
                  disabled={loading}
                  type="submit"
                  className="btn-base w-1/2"
                >
                  {loading ? (
                    <span className="loading loading-dots loading-sm base-txt"></span>
                  ) : (
                    "Update"
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

export default EditTeamMemberModal;
