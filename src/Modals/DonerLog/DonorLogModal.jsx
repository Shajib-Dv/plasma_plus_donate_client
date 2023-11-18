/** @format */

import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import useToast from "../../hooks/useToast";

const DonorLogModal = ({ open, close, donor, refetch }) => {
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({});
  const { Toast } = useToast();

  const updateDonorInfo = async (id) => {
    const updateInfo = {
      isAbleToDonate: "false",
      lastDonation: new Date(),
    };

    const res = await fetch(
      `https://plasma-plus-server.vercel.app/donors/${id}`,
      {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(updateInfo),
      }
    );

    return res.json();
  };

  const storeDonationLog = async (data) => {
    const res = await fetch(`https://plasma-plus-server.vercel.app/donor/log`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });

    return res.json();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { email, _id } = donor;
    const storedData = {
      ...inputData,
      date: new Date(),
      donorEmail: email,
      donorId: _id,
    };

    try {
      const donorUpdateRes = await updateDonorInfo(_id);
      const updateRes = await storeDonationLog(storedData);

      if (updateRes.insertedId && donorUpdateRes.modifiedCount > 0) {
        setLoading(false);
        e.target.reset();
        setInputData({});
        refetch();
        Toast.fire({
          title: "Donation confirmed",
          icon: "success",
        });
        close();
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleInputData = (name, val) => {
    setInputData((prev) => {
      return { ...prev, [name]: val };
    });
  };
  return (
    <>
      <dialog open={open} className="modal">
        <div className="modal-box w-11/12 max-w-5xl border">
          <div className="modal-action justify-center">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-2 w-full"
            >
              <div className="flex flex-col lg:flex-row gap-2">
                <div className="w-full">
                  <label className="label">
                    <span>Receiver Name</span>
                  </label>
                  <input
                    type="text"
                    className="input-file"
                    placeholder="Enter Receiver Name"
                    required={true}
                    onChange={(e) =>
                      handleInputData("receiverName", e.target.value)
                    }
                  />
                </div>
                <div className="w-full">
                  <label className="label">
                    <span>Receiver Email</span>
                  </label>
                  <input
                    type="email"
                    className="input-file"
                    placeholder="receiver@exmp.com"
                    required={true}
                    onChange={(e) =>
                      handleInputData("receiverEmail", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-2">
                <div className="w-full">
                  <label className="label">
                    <span>Receiver Phone</span>
                  </label>
                  <input
                    type="tel"
                    className="input-file"
                    placeholder="+8801********"
                    required={true}
                    onChange={(e) =>
                      handleInputData("receiverPhone", e.target.value)
                    }
                  />
                </div>
                <div className="w-full">
                  <label className="label">
                    <span>Receiver Address</span>
                  </label>
                  <input
                    type="text"
                    className="input-file"
                    placeholder="City, State, ect.."
                    required={true}
                    onChange={(e) =>
                      handleInputData("receiverCity", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="w-full text-center">
                <button
                  type="submit"
                  disabled={loading || donor?.isAbleToDonate === "false"}
                  className="btn-base w-60"
                >
                  {loading ? (
                    <span className="loading loading-dots loading-sm base-txt"></span>
                  ) : (
                    "Record"
                  )}
                </button>
                {donor?.isAbleToDonate === "false" && (
                  <p className="text-xs base-txt py-2 animate-pulse">
                    This Donor not able to donate at this time
                  </p>
                )}
              </div>
            </form>
            <div
              onClick={() => close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-0 top-0"
            >
              <FaTimes className="text-xl base-txt" />
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default DonorLogModal;
