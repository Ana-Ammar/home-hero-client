import { motion } from "framer-motion";
import { FaTrashAlt } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { IoPersonCircleOutline } from "react-icons/io5";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthContext";
import Swal from "sweetalert2";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";

const MyBookings = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axiosSecure
      .get(`my-bookings?email=${user.email}`)
      .then((res) => setBookings(res.data))
      .catch((err) => {});
  }, [axiosSecure, user]);

  const handleDeleteBtn = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/bookings/${id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            setBookings(bookings.filter((b) => b._id !== id));
          }
        });
      }
    });
  };

  if (!bookings) return <LoadingSpinner />;

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto m-10 overflow-x-auto p-6 bg-base-200 rounded-2xl shadow-2xl"
    >
    <title>My bookings</title>
      <h2 className="text-3xl font-bold text-center mb-6 tracking-wide">
        My Bookings
      </h2>

      <table className="table w-full rounded-xl">
        <thead className="bg-primary/5 uppercase text-sm">
          <tr>
            <th>#</th>
            <th>Service Info</th>
            <th>Provider</th>
            <th>Price</th>
            <th>Date</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>

        <tbody className="">
          {bookings.map((b, index) => (
            <tr key={b._id} className="">
              <td className="font-semibold text-center">{index + 1}</td>

              {/* Service Info */}
              <td>
                <div className="flex flex-col">
                  <span className="font-semibold">{b.service_name}</span>
                  <span className="text-sm italic">{b.category}</span>
                </div>
              </td>

              {/* Provider */}
              <td>
                <div className="flex flex-col">
                  <span className="flex items-center gap-1 ">
                    <IoPersonCircleOutline className="" />
                    {b.provider_name}
                  </span>
                  <span className="flex items-center gap-1 text-sm">
                    <AiOutlineMail />
                    {b.email}
                  </span>
                </div>
              </td>

              {/* Price */}
              <td className="font-semibold text-emerald-600 ">৳ {b.price}</td>

              {/* Date */}
              <td className="">
                <span>{b.bookingDate}</span>
              </td>

              {/* Action */}
              <td className="text-center">
                <button
                  onClick={() => {
                    handleDeleteBtn(b._id);
                  }}
                  className="btn btn-sm btn-outline btn-error hover:scale-105 transition-all duration-200"
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}

          {bookings.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center py-8 italic">
                No bookings yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </motion.div>
  );
};

export default MyBookings;
