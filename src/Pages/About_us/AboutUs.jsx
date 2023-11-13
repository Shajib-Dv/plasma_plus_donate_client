/** @format */
import Lottie from "lottie-react";
import delevery from "../../../public/delivery.json";
import useCurrentUser from "../../hooks/useCurrentUser";
import AddNewTeamMember from "../../Components/admin/AddNewTeamMember";
import { useState } from "react";
import { Collapse } from "react-collapse";
import TeamMemberSlider from "../../Components/Slider/TeamMemberSlider";
import JoiningBanner from "../../Components/Home/JoiningBanner";
const AboutUs = () => {
  const { role } = useCurrentUser();
  const [isCollaps, setIsCollaps] = useState(false);
  return (
    <div>
      <div className="w-40 mx-auto">
        <Lottie animationData={delevery} loop={true} />
      </div>
      <div className="text-center">
        {role === "admin" && (
          <button onClick={() => setIsCollaps((p) => !p)} className="btn-base">
            Add new Member
          </button>
        )}
      </div>
      <Collapse isOpened={isCollaps}>
        {role === "admin" && (
          <AddNewTeamMember close={() => setIsCollaps(false)} />
        )}
      </Collapse>
      <div className="my-20 p-4">
        <h2 className="text-4xl text-center font-bold px-2">
          Meet The <span className="base-txt">Community</span> Team
        </h2>
        <div className="container mx-auto my-20">
          <TeamMemberSlider />
        </div>
      </div>
      <JoiningBanner />
    </div>
  );
};

export default AboutUs;
