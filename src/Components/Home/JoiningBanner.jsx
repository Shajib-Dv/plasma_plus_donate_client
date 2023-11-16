/** @format */

const JoiningBanner = () => {
  return (
    <div className="h-80 base-bg overflow-hidden">
      <div className="min-h-full lg:w-4/5 mx-auto flex lg:flex-row flex-col lg:gap-20 gap-8 p-4 items-center justify-center">
        <div>
          <h2 className="lg:text-5xl text-3xl text-white font-bold capitalize">
            Les&apos;s change the world, Join us now !
          </h2>
          <p className="text-white text-left py-5">
            Join with us to help people and make an impact to grouting society.
          </p>
        </div>
        <div>
          <button className="w-max bg-white py-4 px-10 font-bold text-black">
            <a
              href="https://wa.me/+8801786072025"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact Us
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoiningBanner;
