import { useContext, useEffect, useState } from "react";
import { FaEdit, FaTrashAlt, FaEnvelope, FaUser } from "react-icons/fa";
import { AuthContext } from "../../AuthProvider/AuthContext";
import { Link } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import UpdateServiceModal from "./UpdateServiceModal";
import Swal from "sweetalert2";

const MyServices = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);

  useEffect(() => {
    axiosSecure(`/my-services?email=${user.email}`).then((res) =>
      setServices(res.data)
    );
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
          axiosSecure.delete(`/services/${id}`).then((res) => {
            if (res.data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your service has been deleted.",
                icon: "success",
              });
              setServices(services.filter(s => s._id !== id))
            }
          });
        }
      });
    };

  return (
    <div className="section-margin flex flex-col justify-center items-center">
      {/* Provider Info Card */}
      <div className="w-full max-w-4xl rounded-2xl shadow-md p-6 mb-8 flex flex-col sm:flex-row items-center gap-6 border border-slate-200">
        <img
          src={user.photoURL}
          alt={user.name}
          className="w-20 h-20 rounded-full border-4 border-primary shadow-sm"
        />
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center justify-center sm:justify-start gap-2">
            <FaUser className="text-primary" /> {user.displayName}
          </h2>
          <p className="text-gray-600 flex items-center justify-center sm:justify-start gap-2 mt-1">
            <FaEnvelope className="text-primary" /> {user.email}
          </p>
          <p className="mt-2 text-gray-700 font-medium">
            Total Services:{" "}
            <span className="text-primary font-semibold">
              {services.length}
            </span>
          </p>
        </div>
        <Link to="/add-service" className="btns">
          Add Service
        </Link>
      </div>

      {/* Services Table */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md overflow-x-auto border border-slate-200">
        <table className="table w-full">
          <thead className="bg-secondary/20">
            <tr>
              <th>#</th>
              <th>Service Name</th>
              <th>Category</th>
              <th>Price (৳)</th>
              <th>Reviews</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, i) => 
            (<tr key={service._id} className="hover:bg-slate-100 transition">
                <td>{i + 1}</td>
                <td className="font-medium"><Link to={`/service-details/${service._id}`}>{service.service_name}</Link></td>
                <td>{service.category}</td>
                <td>{service.price}</td>
                <td>{service.reviews.length}</td>
                <td className="flex justify-center gap-3">
                  <button 
                  onClick={() => {document.getElementById('update-service-modal').showModal()}}
                  className="btns btn-sm! text-white flex items-center gap-1">
                    <FaEdit /> Edit
                  </button>
                  <UpdateServiceModal 
                  user={user} 
                  service={service}
                  services={services}
                  setServices={setServices}
                  ></UpdateServiceModal>
                  <button
                  onClick={() => handleDeleteBtn(service._id)}
                   className="btn btn-sm bg-red-500 hover:scale-90 transition text-white flex items-center gap-1">
                    <FaTrashAlt /> Delete
                  </button>
                </td>
              </tr>
            ))}

            {services.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-8 text-gray-400 italic"
                >
                  No services added yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyServices;
