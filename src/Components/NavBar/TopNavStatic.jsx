/** @format */
import { BsFillEnvelopeFill, BsFillTelephonePlusFill } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
const TopNavStatic = () => {
  return (
    <div
      className={`w-full h-12 overflow-hidden bg-black hidden md:flex items-center justify-center text-white`}
    >
      <div className="flex flex-1 items-center justify-evenly px-10">
        <div className="center-itm gap-2">
          <BsFillTelephonePlusFill className="text-2xl" /> |
          <a href="tel:+8801786072025">+8801786072025 </a>
        </div>
        <div className="center-itm gap-2">
          <BsFillEnvelopeFill className="text-2xl" /> |
          <a href="mailto:mdsojeeb242@gmail.com">mdsojeeb242@gmail.com</a>
        </div>
        <div className="center-itm gap-2">
          <MdLocationOn className="text-2xl" /> | <p>Chuadanga, Bangladesh</p>
        </div>
      </div>
      <div className="flex items-center gap-10 px-10 flex-1 base-bg h-full rounded-tl-full">
        <p className="font-bold">Follow On</p>
        <div className="center-itm gap-4">
          <a
            href="http://facebook.com/shajib.hossain.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-2xl"
          >
            <FaFacebook />
          </a>
          <a
            href="http://twiter.com/shajib.hossain.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-2xl"
          >
            <FaTwitter />
          </a>
          <a
            href="http://instagram.com/shajib.hossain.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-2xl"
          >
            <FaInstagram />
          </a>
          <a
            href="http://youtube.com/shajib.hossain.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-2xl"
          >
            <FaYoutube />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopNavStatic;
