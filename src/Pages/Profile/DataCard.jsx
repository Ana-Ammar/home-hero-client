import { FaCalendarCheck, FaStar, FaToolbox } from "react-icons/fa";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const DataCard = ({ user }) => {
  const axiosSecure = useAxiosSecure();
  const [services, setServices] = useState([]);
  const [totalReview, setTotalReview] = useState();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axiosSecure
      .get(`/my-services?email=${user.email}`)
      .then((res) => setServices(res.data));
  }, [axiosSecure, user]);

  useEffect(() => {
    const total = services.reduce((sum, s) => sum + s.reviews.length, 0);
    setTotalReview(total);
  }, [services]);

  useEffect(() => {
    axiosSecure
      .get(`/total-service-booking?providerEmail=${user.email}`)
      .then((res) => setBookings(res.data));
  }, [axiosSecure, user]);

  return (
    <div className="bg-base-200 shadow-sm rounded-3xl p-8 flex flex-col md:flex-row justify-around items-center gap-6 md:gap-10 transition hover:shadow-md">
      {/* Total Services */}
      <div className="flex flex-col items-center text-center">
        <div className="bg-indigo-100 text-indigo-600 p-4 rounded-full text-3xl mb-2">
          <FaToolbox />
        </div>
        <h3 className="text-2xl font-bold">{services.length}</h3>
        <p className="text-gray-500 font-medium">Total Services</p>
      </div>

      {/* Total Bookings */}
      <div className="flex flex-col items-center text-center">
        <div className="bg-emerald-100 text-emerald-600 p-4 rounded-full text-3xl mb-2">
          <FaCalendarCheck />
        </div>
        <h3 className="text-2xl font-bold">{bookings.length}</h3>
        <p className="text-gray-500 font-medium">Total Bookings</p>
      </div>

      {/* Total Reviews */}
      <div className="flex flex-col items-center text-center">
        <div className="bg-yellow-100 text-yellow-600 p-4 rounded-full text-3xl mb-2">
          <FaStar />
        </div>
        <h3 className="text-2xl font-bold">{totalReview}</h3>
        <p className="text-gray-500 font-medium">Total Reviews</p>
      </div>
    </div>
  );
};

export default DataCard;
