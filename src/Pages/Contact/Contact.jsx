/** @format */
import Lottie from "lottie-react";
import contact from "../../../public/contacts.json";
const Contact = () => {
  return (
    <>
      <div className="w-60 mx-auto">
        <Lottie animationData={contact} loop={true} />
      </div>
    </>
  );
};

export default Contact;
