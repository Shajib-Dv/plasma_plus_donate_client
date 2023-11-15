/** @format */

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import getSliderCampaigns from "../../utils/getSliderCampaigns";
import Loader from "../Loader";
import CampaignCard from "../Campaign/CampaignCard";
const CampaignSlider = () => {
  const { campaigns, isLoading } = getSliderCampaigns(4);
  return (
    <>
      <div className="container mx-auto">
        <div className="my-6">
          <h2 className="text-4xl text-center font-bold">
            Recent <span className="base-txt">Campaigns</span>
          </h2>
        </div>
        {isLoading && <Loader />}
        {!isLoading &&
          campaigns &&
          Array.isArray(campaigns) &&
          campaigns.length > 0 && (
            <Swiper
              slidesPerView={2}
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
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
              }}
              modules={[FreeMode, Pagination]}
              className="mySwiper"
            >
              {campaigns.map((campaign) => (
                <SwiperSlide key={campaign._id}>
                  <CampaignCard campaign={campaign} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
      </div>
    </>
  );
};

export default CampaignSlider;
