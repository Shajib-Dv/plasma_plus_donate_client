/** @format */

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneOutboundFill } from "react-icons/bs";
import { FreeMode, Pagination } from "swiper/modules";
import getTeamMember from "../../utils/getTeamMember";
import Loader from "../Loader";
const TeamMemberSlider = () => {
  const { teamMembers, isLoading } = getTeamMember();
  return (
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
                <div className="card bg-base-100 shadow-2xl w-full min-h-[400px] border group">
                  <figure className="h-60 rounded-md relative">
                    <img
                      src={member.image}
                      alt="photo"
                      className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-700`}
                    />
                    <div className="absolute bottom-6 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <button className="btn-base w-24">
                        <a href={`tel:${member.phone}`}>
                          <BsFillTelephoneOutboundFill className="text-white text-3xl" />
                        </a>
                      </button>
                      <button className="btn-base w-24">
                        <a href={`mailto:${member.email}`}>
                          <MdEmail className="text-white text-3xl" />
                        </a>
                      </button>
                    </div>
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title capitalize">
                      {member.name}
                      <div className="badge badge-warning capitalize">
                        {member.memberRole}
                      </div>
                    </h2>
                    <p className="py-2 capitalize">{member.bio}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
    </div>
  );
};

export default TeamMemberSlider;
