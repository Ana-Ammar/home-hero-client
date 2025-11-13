import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Link } from "react-router";

const Banner = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      className="my-10"
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        pagination={true}
        autoplay={true}
      >
        <SwiperSlide>
          <div
            className="relative md:h-[70vh] h-[60vh]  bg-cover bg-center rounded-2xl"
            style={{
              backgroundImage: "url('https://i.ibb.co.com/yFwSzZgP/home-cleaning.jpg')",
            }}
          >
            {/* Black Overlay */}
            <div className="absolute inset-0 bg-black/50 rounded-2xl"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-start justify-center h-full px-10 text-white max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Transform Your Home with Expert Cleaning
              </h1>
              <p className="md:text-lg mb-6">
                From deep cleaning to furniture care — we make your space
                spotless and refreshing. Trusted professionals, best results.
              </p>
              <Link to="/services" className="btns btn-md px-6">
                Explore Services
              </Link>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="relative md:h-[70vh] h-[60vh] bg-cover bg-center rounded-2xl"
            style={{
              backgroundImage:
                "url('https://i.ibb.co.com/5gJ4LRkT/Appliance-Repair-Service.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-black/60 rounded-2xl"></div>

            <div className="relative z-10 flex flex-col items-start justify-center h-full px-10 text-white max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Quick & Reliable Appliance Repairs
              </h1>
              <p className="md:text-lg mb-6">
                We fix your home essentials — AC, fridge, washing machine, and
                more. Get fast service from verified technicians right at your
                doorstep.
              </p>
              <Link to="/services" className="btns btn-md px-6">
                Explore Services
              </Link>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="relative md:h-[70vh] h-[60vh]  bg-cover bg-center rounded-2xl"
            style={{
              backgroundImage: "url('https://i.ibb.co.com/LX8DSZpB/Outdoor-Care.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-black/60 rounded-2xl"></div>

            <div className="relative z-10 flex flex-col items-start justify-center h-full px-10 text-white max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Bring Nature Closer to Home
              </h1>
              <p className="md:text-lg mb-6">
                From lawn maintenance to plant care — our garden experts help
                you build a refreshing outdoor space that blooms all year round.
              </p>
              <Link to="/services" className="btns btn-md px-6">
                Explore Services
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </motion.div>
  );
};

export default Banner;
