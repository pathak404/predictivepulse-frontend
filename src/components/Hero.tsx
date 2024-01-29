import heroImg from '../assets/images/hero/hero-main-1.png'
import shape1 from '../assets/images/hero/shape-01.png'
import shape2 from '../assets/images/hero/shape-02.svg'

const Hero = () => {
  return (
    <div className="mx-auto px-4 sm:px-5 md:px-10 lg:px-12 xl:px-20 pt-8 pb-28 lg:pt-24 flex flex-col lg:flex-row items-center justify-between gap-12 xl:gap-24 overflow-hidden" id="home">
      <div className="basis-1/2">
        <div className="flex flex-col items-start justify-between">
          <p className="font-medium text-gray-800 md:text-lg mb-3 md:mb-4">
            🔥 Get predictions every minute with 70% to 90% accuracy.*
          </p>
          <h1 className="text-4xl xl:text-5xl font-bold leading-snug xl:leading-snug">
            Empowering Investors with{" "}
            <span className="inline-block relative before:absolute before:bottom-2.5 before:left-0 before:w-full before:h-2 xl:before:h-3 before:bg-cyan-300/60 before:-z-10">
              Accurate
            </span>{" "}
            AI Stock Predictions.
          </h1>
          <p className="md:text-lg mt-4 mb-7">
            At PredictivePulse, we blend expertise and innovation to provide you with
            real-time insights that can transform your investment strategies.
            Imagine having the ability to foresee market trends and make
            informed decisions, all at your fingertips.
          </p>
          {/* <Link
            className="px-10 py-3 bg-gray-800 rounded-3xl text-white inline-flex gap-3 items-center hover:bg-gray-700 transition-colors duration-300"
            to={"/#buy"}
          >
            Buy Now
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"></path></svg>
          </Link> */}
        </div>
      </div>
      <div className="basis-1/2">
        <div className="relative shadow-[0_10px_120px_0_rgba(45,74,170,0.1)]">
          <img
            src={shape1}
            alt="hero image shape 1"
            className="absolute top-0 -left-12"
          />
          <img
            src={heroImg}
            alt="hero image"
            className="max-w-2xl w-full h-auto"
          />
          <img
            src={shape2}
            alt="hero image shape 2"
            className="absolute bottom-0 -right-6"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
