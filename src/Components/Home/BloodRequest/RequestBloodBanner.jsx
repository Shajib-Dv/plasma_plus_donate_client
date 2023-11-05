/** @format */

import BloodRequestForm from "./BloodRequestForm";
import CurrentBloodRequest from "./CurrentBloodRequest";

const RequestBloodBanner = () => {
  return (
    <div className="mb-40">
      <div className="h-96 border overflow-hidden bg-doctor">
        <div className="h-full w-full bg-black bg-opacity-80 center-itm flex-col">
          <h2 className="text-white text-5xl font-bold text-center">
            Donation on the Way
          </h2>{" "}
          <br />
          <p className="text-2xl base-txt">Register for Blood</p>
        </div>
      </div>
      <div className="flex lg:flex-row flex-col-reverse gap-10 container mx-auto lg:-mt-20">
        <div className="flex-1 h-max">
          <CurrentBloodRequest />
        </div>
        <div className="flex-1 h-max">
          <BloodRequestForm />
        </div>
      </div>
    </div>
  );
};

export default RequestBloodBanner;
