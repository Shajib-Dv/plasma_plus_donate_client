/** @format */

import { BiChevronsRight } from "react-icons/bi";

const DonorBanner = () => {
  return (
    <div className="mb-40 h-max container mx-auto border rounded-lg">
      <div className="lg:flex relative">
        <div className="h-[30rem] flex-1">
          <img
            src="https://i.ibb.co/6BfF3g0/photo-1615461065624-21b562ee5566-auto-format-fit-crop-q-60-w-500-ixlib-rb-4-0.jpg"
            alt="Doctor"
            className="w-full h-full object-cover"
          />
          <div className="absolute center-ps w-80 h-80 rounded-full overflow-hidden hidden lg:block">
            <img
              src=" https://i.ibb.co/yPFmNbr/home-banner.jpg"
              alt="image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex-1 h-full lg:flex justify-end">
          <div className="lg:w-3/4 p-6">
            <h2 className="text-2xl base-txt font-thin">Help people in need</h2>
            <h1 className="text-5xl text-black font-bold leading-snug">
              Welcome to <br />
              <span className="base-txt"> Plasma Plus</span>. Donors
              <br />
              Organization
            </h1>
            <p className="text-black leading-relaxed">
              Our organization works for help people to lead a sound life and
              support others by donating their soul.
            </p>
            <div className="flex justify-between">
              <div>
                <p className="flex items-center font-bold">
                  <BiChevronsRight className="base-txt" />
                  Best Service
                </p>
                <p className="flex items-center font-bold">
                  <BiChevronsRight className="base-txt" />
                  Help People
                </p>
                <p className="flex items-center font-bold">
                  <BiChevronsRight className="base-txt" />
                  Specialist Doctors
                </p>
              </div>
              <div>
                <p className="flex items-center font-bold">
                  <BiChevronsRight className="base-txt" />
                  24h Service
                </p>
                <p className="flex items-center font-bold">
                  <BiChevronsRight className="base-txt" />
                  Blood Bank
                </p>
                <p className="flex items-center font-bold">
                  <BiChevronsRight className="base-txt" />
                  Free Tasting
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorBanner;
