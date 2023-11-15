/** @format */
import { BiChevronsRight } from "react-icons/bi";
import { FaFacebook, FaGithub, FaLinkedin, FaPlus } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="footer p-10 bg-black text-white">
      <nav>
        <header className="footer-title">Our Services</header>
        <a className="link center-itm link-hover">
          <BiChevronsRight className="base-txt" /> Blood Donation
        </a>
        <a className="link center-itm link-hover">
          <BiChevronsRight className="base-txt" /> Health Check
        </a>
        <a className="link center-itm link-hover">
          <BiChevronsRight className="base-txt" /> Blood Info
        </a>
        <a className="link center-itm link-hover">
          <BiChevronsRight className="base-txt" /> Blood Bank
        </a>
        <a className="link center-itm link-hover">
          <BiChevronsRight className="base-txt" /> Donate Process
        </a>
      </nav>
      <nav>
        <header className="footer-title">Quick Links</header>
        <a className="link center-itm link-hover">
          <BiChevronsRight className="base-txt" /> About us
        </a>
        <a className="link center-itm link-hover">
          <BiChevronsRight className="base-txt" /> Campaigns
        </a>
        <a className="link center-itm link-hover">
          <BiChevronsRight className="base-txt" /> Latest News
        </a>
        <a className="link center-itm link-hover">
          <BiChevronsRight className="base-txt" /> Contact
        </a>
      </nav>
      <nav>
        <header className="footer-title">Social Links</header>
        <div className="grid grid-flow-col gap-4">
          <a
            href="http://facebook.com/shajib.hossain.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-2xl"
          >
            <FaFacebook className="block text-2xl hover:text-[#de0d16]" />
          </a>
          <a
            href="https://www.linkedin.com/in/sojeebhossain/"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-2xl"
          >
            <FaLinkedin className="block text-2xl hover:text-[#de0d16]" />
          </a>
          <a
            href="https://github.com/Shajib-Dv"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-2xl"
          >
            <FaGithub className="block text-2xl hover:text-[#de0d16]" />
          </a>
        </div>
        <div className="h-full w-max p-4  base-bg brand-box rounded-lg center-itm">
          <h2 className="text-3xl text-white font-bold">Plasma</h2>
          <FaPlus className="text-white text-3xl" />
        </div>
        <div>Copyright © {new Date().getFullYear()} - All right reserved</div>
      </nav>
    </footer>
  );
};

export default Footer;
