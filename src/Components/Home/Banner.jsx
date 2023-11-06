/** @format */
import { Swiper, SwiperSlide } from "swiper/react";
import { BiGridSmall } from "react-icons/bi";
import { PiSignIn } from "react-icons/pi";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
const Banner = () => {
  //TODO: this banner should be dynamic.
  const bannerImg =
    "https://images.unsplash.com/photo-1624727828489-a1e03b79bba8?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D";
  return (
    <>
      <div className="relative lg:mb-20">
        <Swiper
          navigation={true}
          modules={[Navigation, Autoplay]}
          autoplay
          loop={true}
          className="mySwiper lg:h-screen z-0"
        >
          <SwiperSlide>
            <img
              src={bannerImg}
              alt="banner_image"
              className="object-cover h-full w-full"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={bannerImg}
              alt="banner_image"
              className="object-cover h-full w-full"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={bannerImg}
              alt="banner_image"
              className="object-cover h-full w-full"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={bannerImg}
              alt="banner_image"
              className="object-cover h-full w-full"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={bannerImg}
              alt="banner_image"
              className="object-cover h-full w-full"
            />
          </SwiperSlide>
        </Swiper>

        {/* TODO: only admin can see it */}
        <div className="absolute top-0 right-0 z-20 btn btn-ghost btn-circle">
          <BiGridSmall className="text-3xl" />
        </div>

        <div className="absolute center-ps z-20 w-4/5 h-full">
          <div className="h-full w-full flex items-center justify-center md:justify-start">
            <div className="space-y-6 lg:p-20 sm:p-10 p-4">
              <h2 className="base-txt lg:text-5xl md:text-3xl text-2xl">
                Donate blood, save Life.
              </h2>
              <h1 className="lg:text-7xl md:text-5xl text-3xl text-white font-bold">
                Donate Blood and <br />{" "}
                <span className="base-txt">Inspire</span> Others.
              </h1>
              <div className="text-center">
                <button className="btn-base">Explore More</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-4/5 left-[50%] lg:-translate-x-1/2 lg:absolute -bottom-[12rem] z-50">
        <div className="lg:flex">
          <div className="h-hull p-6 bg-black text-white flex-1 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold">Register Now</h2>
              <p>
                To become a volunteer and help people for lead their life
                healthy, register now.
              </p>
            </div>
            <Link to={"/registration"}>
              <PiSignIn className="text-3xl" />
            </Link>
          </div>
          <div className="h-hull p-6 base-bg text-white flex-1 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold">Donate Now</h2>
              <p>Become a donor and help the mankind for inner peace.</p>
            </div>
            <Link to={"/donors"}>
              <PiSignIn className="text-3xl" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
