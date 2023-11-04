/** @format */
import { FaAward, FaPeopleCarry, FaTrophy } from "react-icons/fa";
import { BsFillHeartPulseFill } from "react-icons/bs";
const Statics = () => {
  return (
    <div className="min-h-60 bg-blood mb-40">
      <div className="h-full p-4 w-full bg-black text-white bg-opacity-50 flex items-center gap-14 justify-evenly flex-wrap">
        <div className="flex flex-col items-center gap-2">
          <FaAward className="text-3xl base-txt" />
          <p className="text-5xl font-bold">250</p>
          <p className="font-semibold">Doctors</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <BsFillHeartPulseFill className="text-3xl base-txt" />
          <p className="text-5xl font-bold">2150</p>
          <p className="font-semibold">Happy Donors</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <FaTrophy className="text-3xl base-txt" />
          <p className="text-5xl font-bold">450</p>
          <p className="font-semibold">Awards</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <FaPeopleCarry className="text-3xl base-txt" />
          <p className="text-5xl font-bold">2450</p>
          <p className="font-semibold">Happy Recipient</p>
        </div>
      </div>
    </div>
  );
};

export default Statics;
