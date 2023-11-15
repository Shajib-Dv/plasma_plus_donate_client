/** @format */

import { useRef, useState } from "react";
import useToast from "../../hooks/useToast";
import { FaTimes } from "react-icons/fa";
const img_host_url = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_IMG_HOST_KEY
}`;
const AddCampaign = ({ close, refetch }) => {
  const campaignBannerRef = useRef();
  const [campaignBanner, setCampaignBanner] = useState(null);
  const [inputCampaignData, setInputCampaignData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { Toast } = useToast();

  const uploadCampaignImage = () => {
    return new Promise((resolve, reject) => {
      const imgInfo = campaignBannerRef.current?.files[0];
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
            setError("Image upload failed !");
            reject("Image upload failed");
          }
        })
        .catch((err) => {
          setError(err.message);
          reject(err.message);
        });
    });
  };

  const handleCampaignImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setCampaignBanner(e.target.result);
        setError("");
      };

      reader.readAsDataURL(file);
    } else {
      setCampaignBanner(null);
    }
  };

  const storeCampaignToDB = async (campaign) => {
    const res = await fetch(`http://localhost:3000/campaigns`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(campaign),
    });

    return res.json();
  };

  const handleCampaignSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (!campaignBanner) {
      setError("Please select a campaign banner");
      setLoading(false);
      return;
    }

    try {
      const campaignImg = await uploadCampaignImage();

      const storeCampaign = {
        ...inputCampaignData,
        campaignImg,
        date: new Date(),
      };

      const res = await storeCampaignToDB(storeCampaign);

      if (res.insertedId) {
        setInputCampaignData({});
        e.target.reset();
        refetch();
        setCampaignBanner(null);
        setLoading(false);
        await Toast.fire({
          icon: "success",
          title: "Campaign successfully added",
        });
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleInputCampaignChange = (name, value) => {
    setInputCampaignData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <div className="card 2xl:w-1/2 lg:w-4/5 mx-auto min-h-[20rem] bg-base-100 shadow-xl mb-20 border relative">
      <form
        onSubmit={handleCampaignSubmit}
        className="flex gap-4 lg:flex-row flex-col items-center"
      >
        <div className="p-4 flex-1 h-full">
          <div
            onClick={() => campaignBannerRef.current.click()}
            className="h-80 w-full cursor-pointer rounded-lg relative overflow-hidden"
          >
            <img
              src={
                campaignBanner
                  ? campaignBanner
                  : "https://i.ibb.co/kc20dsb/blank-profile-picture-973460-1280.png"
              }
              alt="avatar"
              className="w-full h-full object-cover"
            />
            <input
              ref={campaignBannerRef}
              type="file"
              accept=".png, .jpg, .jpeg"
              className="hidden"
              onChange={handleCampaignImageChange}
            />

            <div className="absolute center-ps  base-txt font-semibold  w-full h-full text-center bg-black bg-opacity-50">
              <div className="center-itm w-full h-full">
                <p>{campaignBanner ? "Change" : "Choose"} Banner</p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 lg:flex-1 w-full">
          <div className="mb-2 flex lg:flex-row flex-col items-center gap-2">
            <div className="w-full">
              <label className="label base-txt">
                <span>Campaign starting time:</span>
              </label>
              <input
                required={true}
                type="datetime-local"
                className="input-file"
                onChange={(e) =>
                  handleInputCampaignChange("campaignStart", e.target.value)
                }
              />
            </div>
            <div className="w-full">
              <label className="label base-txt">
                <span>Campaign end time:</span>
              </label>
              <input
                required={true}
                type="time"
                className="input-file"
                onChange={(e) =>
                  handleInputCampaignChange("campaignEnd", e.target.value)
                }
              />
            </div>
          </div>
          <div className="mb-2 flex lg:flex-row flex-col items-center gap-2">
            <div className="w-full">
              <label className="label base-txt">
                <span>Campaign title</span>
              </label>
              <input
                required={true}
                type="text"
                placeholder="Title"
                className="input-file"
                onChange={(e) =>
                  handleInputCampaignChange("title", e.target.value)
                }
              />
            </div>
            <div className="w-full">
              <label className="label base-txt">
                <span>Campaign location</span>
              </label>
              <input
                required={true}
                type="text"
                placeholder="Location"
                className="input-file"
                onChange={(e) =>
                  handleInputCampaignChange("location", e.target.value)
                }
              />
            </div>
          </div>
          <div className="w-full">
            <label className="label base-txt">
              <span>Campaign description</span>
            </label>
            <textarea
              required={true}
              className="input-file"
              cols="20"
              rows="4"
              placeholder="Write your campaign description"
              onChange={(e) => handleInputCampaignChange("des", e.target.value)}
            ></textarea>
          </div>
          <div className="my-2 text-center">
            <button disabled={loading} type="submit" className="btn-base w-1/2">
              {loading ? (
                <span className="loading loading-dots loading-sm base-txt"></span>
              ) : (
                "Publish"
              )}
            </button>
            <div className="h-4">
              {error && <p className="text-xs base-txt">{error}</p>}
            </div>
          </div>
        </div>
      </form>
      <button
        onClick={close}
        className="btn btn-ghost btn-circle absolute -right-4 -top-4"
      >
        <FaTimes className="text-xl base-txt" />
      </button>
    </div>
  );
};

export default AddCampaign;
