import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthContext";
import { FaStar } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const ServiceReview = ({ service }) => {
  const { _id } = service;
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState(service?.reviews || []);
  const [form, setForm] = useState({
    name: user?.displayName || "",
    comment: "",
    rating: "",
  });

  const handleReviewForm = (e) => {
    e.preventDefault();
    const newReview = {
      user_name: form.name,
      rating: form.rating,
      comment: form.comment,
    };

    axiosSecure
      .post(`/services/${_id}/reviews`, newReview)
      .then(() => {
        Swal.fire("Success", "Review submitted", "success");
        setForm({ name: user.displayName, rating: "", comment: "" });
        setReviews([...reviews, newReview]);
      })
      .catch(() => {
        Swal.fire("Error", "Failed to submit review", "error");
      });
  };

    const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
    >
      {/* Reviews Section */}
      <div className="space-y-6">
        <h2 className="text-3xl font-semibold">
          Customer Reviews ({reviews?.length || 0})
        </h2>
        {(!reviews || reviews.length === 0) && (
          <p>No reviews yet. Be the first!</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reviews?.map((rev, idx) => (
            <div
              key={idx}
              className="p-4 border border-gray-300 rounded-xl shadow hover:shadow-lg transition duration-300"
            >
              <p className="font-semibold">{rev.user_name}</p>
              <div className="flex">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <FaStar key={i} className="mx-0.5 mt-1" />
                ))}
              </div>
              <p className=" mt-1">{rev.comment}</p>
              <p className=" mt-1">{rev.created_at}</p>
            </div>
          ))}
        </div>

        {/* Add Review Form */}

        <div className="p-6 rounded-2xl shadow-md border border-gray-300">
          <h2 className="text-2xl font-semibold mb-4">Leave a Review</h2>
          <form onSubmit={handleReviewForm} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              readOnly
            />
            <textarea
              placeholder="Your Comment"
              className="textarea textarea-bordered w-full"
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Rating (1–5)"
              className="input input-bordered w-full"
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: e.target.value })}
              min="1"
              max="5"
              required
            />
            <button type="submit" className={`w-full! ${
                user.email === service.email ? "btns btn-disabled!" : "btns"
              }`}>
              {`${user.email === service.email ? "Your Service, You can't review here!" : "Submit Review"}`}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceReview;
