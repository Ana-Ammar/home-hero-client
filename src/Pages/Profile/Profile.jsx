import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthContext";
import DataCard from "./DataCard";
import UpdateProfileModal from "./UpdateProfileModal";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({
    displayName: user.displayName,
    photoURL: user.photoURL,
    lastSignInTime: user.metadata.lastSignInTime,
  });

  return (
    <div className="space-y-10 section-margin">
      <div className="bg-white border border-indigo-100 rounded-3xl shadow-sm hover:shadow-md transition p-8 flex flex-col md:flex-row items-center gap-8">
        <img
          src={userInfo.photoURL}
          alt="User Photo"
          className="w-32 h-32 rounded-full object-cover ring-4 ring-indigo-100 shadow-md"
        />
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-800">
            {userInfo.displayName}
          </h2>
          <p className="text-gray-500">{user.email}</p>
          <p className="text-sm text-gray-400 mt-1">
            Last Login: {userInfo.lastSignInTime}
          </p>
          <button
            onClick={() => {
              document.getElementById("update-profile-modal").showModal();
            }}
            className="btns mt-4"
          >
            Update Profile
          </button>
        </div>
      </div>
      <UpdateProfileModal
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      ></UpdateProfileModal>
      <DataCard></DataCard>
    </div>
  );
};

export default Profile;
