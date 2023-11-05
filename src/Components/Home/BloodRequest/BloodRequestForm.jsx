/** @format */

import { useState } from "react";

const BloodRequestForm = () => {
  const [fromData, setFormData] = useState({ bloodGroup: "A+" });
  //TODO: connect to server
  const handleBloodRequest = (e) => {
    e.preventDefault();
    const storedBloodGroup = { ...fromData, date: new Date() };
    console.log(storedBloodGroup);
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

        <div className="text-center">
          <button type="submit" className="btn-base w-1/2">
            Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default BloodRequestForm;
