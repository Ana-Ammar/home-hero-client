import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import ServiceReview from "./ServiceReview";
import BookingModal from "./BookingModal";
import { AuthContext } from "../../AuthProvider/AuthContext";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";

const ServiceDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [service, setService] = useState(null);

  useEffect(() => {
    axiosSecure
      .get(`/services/${id}`)
      .then((data) => setService(data.data))
      .catch((err) =>{})}, [id, axiosSecure]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  if (!service) return <LoadingSpinner />;

  return (
    <motion.div
      className="mx-auto space-y-10 my-10"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
    <title>{service?.service_name}</title>
      <h1 className="section-title">Service Details</h1>
      <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-lg">
        <img
          src={service?.image}
          alt={service?.service_name}
          className="w-full h-full object-cover"
        />

        <div className="absolute bg-black/40 inset-0"></div>
      </div>

      <div className="relative bg-base-100 -mt-20 shadow-xl rounded-xl p-6 flex flex-col md:flex-row gap-6 z-10">
        <div className="md:w-1/2">
          <h1 className="text-3xl md:text-4xl font-bold drop-shadow-lg">
            {service?.service_name}
          </h1>
          <p className="mt-2 max-w-xl">{service?.description}</p>
        </div>
        <div className="md:w-1/2 flex flex-col justify-between">
          <div className="space-y-2">
            <p>
              <strong>Category:</strong> {service?.category}
            </p>
            <p>
              <strong>Price:</strong> ${service?.price}
            </p>
            <p>
              <strong>Provider:</strong> {service?.provider_name}
            </p>
            <p>
              <strong>Email:</strong> {service?.email}
            </p>

            <div className="flex flex-wrap gap-2 mt-2">
              {service?.tags?.map((tag, idx) => (
                <span key={idx} className="badge badge-outline">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <button
              className={`${
                user.email === service.email ? "btns btn-disabled!" : "btns"
              } flex-1`}
              onClick={() =>
                document.getElementById("booking-modal").showModal()
              }
            >
              {`${user.email === service.email ? "Your Service" : "Book Now"}`}
            </button>
            <button
              className="btn btn-outline flex-1"
              onClick={() =>
                window.scrollTo({
                  top: window.scrollY + 300,
                  behavior: "smooth",
                })
              }
            >
              See Reviews
            </button>
          </div>
        </div>
      </div>
      <BookingModal service={service}></BookingModal>
      <ServiceReview service={service}></ServiceReview>
    </motion.div>
  );
};

export default ServiceDetails;
