import { Link } from "react-router";
import { motion } from "framer-motion";

const Card = ({ service }) => {
  const { _id, image, service_name, tags, status } = service;

  return (
    <motion.div
      className="card bg-base-100 shadow-xl"
      initial={{ opacity: 0.0, scale: 0.0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{duration: 0.7, ease: "easeOut"}}
    >
      <div className="card bg-secondary/10 h-full shadow-sm">
        <figure>
          <img src={image} alt="Shoes" className="w-full h-56 object-cover" />
        </figure>
        <div className="card-body p-4 flex flex-col">
          <h2 className="card-title">
            {service_name}
            <div className="badge badge-sm badge-success text-white">
              {status}
            </div>
          </h2>
          <p>
            {tags.map((tag, index) => (
              <span key={index} className="badge badge-dash mr-2 mt-2">
                {tag}
              </span>
            ))}
          </p>
          <Link to={`/service-details/${_id}`} className="btns w-full! mt-2">
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
