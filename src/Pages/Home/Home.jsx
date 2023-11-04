/** @format */

import { Helmet } from "react-helmet-async";
import Banner from "../../Components/Home/Banner";
import Articles from "../../Components/Home/Articles";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Plasma Plus | Home</title>
      </Helmet>
      <Banner />
      <Articles />
    </>
  );
};

export default Home;
