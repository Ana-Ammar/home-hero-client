import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const BookingModal = ({ service }) => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [date, setDate] = useState();

  const handleBookingForm = (e) => {
    e.preventDefault();
    const newBooking = {
      userEmail: user.email,
      serviceId: service._id,
      price: service.price,
      bookingDate: date,
      providerEmail: service.email
    };

    axiosSecure
      .post("/bookings", newBooking)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire("✅ Success!", "Booking confirmed!", "success");
          document.getElementById("booking-modal").close();
          setDate("");
        }
      })
      .catch((err) => {
        Swal.fire("❌ Error", "Booking failed. Try again.", "error");
      });
  };

  return (
    <div>
      <dialog id="booking-modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box shadow-xl rounded-2xl border border-primary/20 relative">
          {/* Close Button */}
          <label
            onClick={() => document.getElementById("booking-modal").close()}
            className="btn btn-sm btn-circle absolute right-3 top-3 bg-indigo-200 hover:bg-indigo-300 border-none text-gray-700"
          >
            ✕
          </label>

          {/* Top Section */}
          <div className="mb-4 p-4 rounded-lg bg-secondary/10 border border-secondary/20 shadow-sm">
            <h2 className="text-2xl font-bold">
              {service.service_name}
            </h2>
            <p className="text-sm">
              <strong>Category:</strong> {service.category}
            </p>
            <p className="text-sm">
              <strong>Provider:</strong> {service.provider_name}
            </p>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleBookingForm} className="space-y-3">
            <div>
              <label className="block text-sm font-medium">
                Your Email
              </label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="input input-bordered w-full border-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium ">
                Price
              </label>
              <input
                type="text"
                value={`৳ ${service?.price}`}
                readOnly
                className="input input-bordered w-full border-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Booking Date
              </label>
              <input
                type="date"
                required
                value={date || ""}
                onChange={(e) => setDate(e.target.value)}
                className="input input-bordered w-full border-secondary focus:border-primary"
              />
            </div>

            <button type="submit" className="btns w-full! mt-2">
              Confirm Booking
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default BookingModal;
