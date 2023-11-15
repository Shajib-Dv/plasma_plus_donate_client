/** @format */
import Lottie from "lottie-react";
import contact from "../../../public/contacts.json";
import { Helmet } from "react-helmet-async";
const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Plasma_plus | Contacts</title>
      </Helmet>
      <div className="w-60 mx-auto">
        <Lottie animationData={contact} loop={true} />
      </div>
    </>
  );
};

export default Contact;
