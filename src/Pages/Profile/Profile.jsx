import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthContext";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import DataCard from "./DataCard";

const Profile = () => {
  const { user } = useContext(AuthContext);




  return (
    <div className="space-y-10 section-margin">
      <div className="bg-white border border-indigo-100 rounded-3xl shadow-sm hover:shadow-md transition p-8 flex flex-col md:flex-row items-center gap-8">
        <img
          src={user.photoURL}
          alt="User Photo"
          className="w-32 h-32 rounded-full object-cover ring-4 ring-indigo-100 shadow-md"
        />
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-800">
            {user.displayName}
          </h2>
          <p className="text-gray-500">{user.email}</p>
          <p className="text-sm text-gray-400 mt-1">
            Last Login: {user.metadata.lastSignInTime}
          </p>
          <button className="btns mt-4">Update Profile</button>
        </div>
      </div>

      <DataCard></DataCard>
    </div>
  );
};

export default Profile;
