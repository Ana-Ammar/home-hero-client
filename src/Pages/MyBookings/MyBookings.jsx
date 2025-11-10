import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import { IoPersonCircleOutline } from "react-icons/io5";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthContext";
import Swal from "sweetalert2";

const MyBookings = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axiosSecure
      .get(`my-bookings?email=${user.email}`)
      .then((res) => setBookings(res.data))
      .catch((err) => console.log(err));
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
            setBookings(bookings.filter(b => b._id !== id))
          }
        });
      }
    });
  };

  if (!bookings) return <p>Loading service...</p>;
  return (
    <div className="mx-auto m-10 overflow-x-auto p-6 bg-linear-to-br from-white via-slate-50 to-gray-100 rounded-2xl shadow-2xl">
      <h2 className="text-3xl font-bold text-center mb-6 text-slate-700 tracking-wide">
        My Bookings
      </h2>

      <table className="table w-full border border-gray-200 rounded-xl">
        <thead className="bg-slate-100 text-slate-700 uppercase text-sm">
          <tr>
            <th>#</th>
            <th>Service Info</th>
            <th>Provider</th>
            <th>Price</th>
            <th>Date</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>

        <tbody className="text-gray-700">
          {bookings.map((b, index) => (
            <tr
              key={b._id}
              className="hover:bg-slate-50 transition-all duration-300 border-b"
            >
              <td className="font-semibold text-center">{index + 1}</td>

              {/* Service Info */}
              <td>
                <div className="flex flex-col">
                  <span className="font-semibold text-base text-slate-800">
                    {b.service_name}
                  </span>
                  <span className="text-sm text-gray-500 italic">
                    {b.category}
                  </span>
                </div>
              </td>

              {/* Provider */}
              <td>
                <div className="flex flex-col">
                  <span className="flex items-center gap-1 text-gray-700">
                    <IoPersonCircleOutline className="text-slate-500" />
                    {b.provider_name}
                  </span>
                  <span className="flex items-center gap-1 text-gray-500 text-sm">
                    <AiOutlineMail />
                    {b.email}
                  </span>
                </div>
              </td>

              {/* Price */}
              <td className="font-semibold text-emerald-600 ">৳ {b.price}</td>

              {/* Date */}
              <td className="text-gray-600">
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
              <td colSpan="6" className="text-center py-8 text-gray-400 italic">
                No bookings yet 😌
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyBookings;
