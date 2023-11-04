/** @format */

import { Helmet } from "react-helmet-async";
import Banner from "../../Components/Home/Banner";
import Articles from "../../Components/Home/Article/Articles";
import DonorBanner from "../../Components/Home/DonorBanner";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Plasma Plus | Home</title>
      </Helmet>
      <Banner />
      <Articles />
      <DonorBanner />
    </>
  );
};

export default Home;
