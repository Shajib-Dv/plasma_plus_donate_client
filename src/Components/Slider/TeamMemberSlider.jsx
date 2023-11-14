/** @format */

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import getTeamMember from "../../utils/getTeamMember";
import Loader from "../Loader";
import TeamMemberCard from "../Team/TeamMemberCard";
import { useState } from "react";
import EditTeamMemberModal from "../../Modals/Team/EditTeamMemberModal";
const TeamMemberSlider = () => {
  const { teamMembers, isLoading, refetch } = getTeamMember();
  const [isMemberEditable, setIsMemberEditable] = useState(false);
  const [memberInfo, setMemberInfo] = useState({});

  const handleMemberEdit = (member) => {
    setMemberInfo(member);
    setIsMemberEditable(true);
  };

  const closeMemberEditModal = () => {
    setMemberInfo({});
    setIsMemberEditable(false);
  };

  return (
    <>
      <div>
        {isLoading && <Loader />}
        {!isLoading &&
          teamMembers &&
          Array.isArray(teamMembers) &&
          teamMembers.length > 0 && (
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              freeMode={true}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                390: {
                  slidesPerView: 1,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              modules={[FreeMode, Pagination]}
              className="mySwiper"
            >
              {teamMembers.map((member) => (
                <SwiperSlide key={member._id}>
                  <TeamMemberCard
                    member={member}
                    refetch={refetch}
                    handleMemberEdit={handleMemberEdit}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
      </div>
      <EditTeamMemberModal
        close={closeMemberEditModal}
        member={memberInfo}
        open={isMemberEditable}
        refetch={refetch}
      />
    </>
  );
};

export default TeamMemberSlider;
