/** @format */

import { useState } from "react";
import useCurrentUser from "../../../hooks/useCurrentUser";
import useToast from "../../../hooks/useToast";
import getCurrentBloodRequest from "../../../utils/getCurrentBloodRequest";

const BloodRequestForm = () => {
  const [fromData, setFormData] = useState({
    bloodGroup: "A+",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { currentUser } = useCurrentUser();
  const { Toast } = useToast();
  const { refetch } = getCurrentBloodRequest();

  const storeBloodRequestToDB = async (info) => {
    const res = await fetch(
      `https://plasma-plus-server.vercel.app/blood_request`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(info),
      }
    );

    return res.json();
  };

  const handleBloodRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    let { name, email, ...bloodInfo } = fromData;

    if (currentUser && !name && !email) {
      name = currentUser.name;
      email = currentUser.email;
    }

    const storedInfo = { name, email, ...bloodInfo, date: new Date() };

    await storeBloodRequestToDB(storedInfo)
      .then(async (res) => {
        if (res.insertedId) {
          setFormData({ bloodGroup: "A+" });
          setLoading(false);
          e.target.reset();
          refetch();
          await Toast.fire({
            icon: "success",
            title: "Request send to organizer",
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  };

  const handleFromState = (name, val) => {
    setFormData((pv) => {
      return { ...pv, [name]: val };
    });
  };

  return (
    <div className="w-full h-full bg-base-100 p-10 shadow-xl rounded-md">
      <h2 className="text-black text-3xl font-bold leading-loose">
        Request for Blood
      </h2>
      <form onSubmit={handleBloodRequest} className="space-y-4">
        <div className="flex flex-col lg:flex-row gap-5">
          <input
            required={true}
            type="text"
            className="input-file"
            placeholder="Your name"
            onChange={(e) => handleFromState("name", e.target.value)}
            defaultValue={currentUser?.name}
          />
          <input
            required={true}
            type="tel"
            className="input-file"
            placeholder="Phone number"
            onChange={(e) => handleFromState("phone", e.target.value)}
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-5">
          <input
            required={true}
            type="email"
            className="input-file"
            placeholder="Your email"
            defaultValue={currentUser?.email}
            onChange={(e) => handleFromState("email", e.target.value)}
          />
          <input
            required={true}
            type="text"
            className="input-file"
            placeholder="Your city"
            onChange={(e) => handleFromState("city", e.target.value)}
          />
        </div>
        <select
          onChange={(e) => handleFromState("bloodGroup", e.target.value)}
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
        <textarea
          required={true}
          className="input-file"
          cols="30"
          rows="6"
          placeholder="Your Message"
          onChange={(e) => handleFromState("message", e.target.value)}
        ></textarea>
        <div className="h-4 text-xs base-txt text-center">{error && error}</div>
        <div className="text-center">
          <button disabled={loading} type="submit" className="btn-base w-1/2">
            {loading ? (
              <span className="loading loading-dots loading-sm base-txt"></span>
            ) : (
              "Request"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BloodRequestForm;
