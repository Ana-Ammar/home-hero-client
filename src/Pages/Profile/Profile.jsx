import { motion } from "framer-motion";
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

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      className="space-y-10 section-margin"
    >
    <title>User profile</title>
      <div className="bg-base-200 rounded-3xl shadow-sm hover:shadow-md transition p-8 flex flex-col md:flex-row items-center gap-8">
        <img
          src={userInfo.photoURL}
          alt="User Photo"
          className="w-32 h-32 rounded-full object-cover ring-4 ring-indigo-100 shadow-md"
        />
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold">{userInfo.displayName}</h2>
          <p className="">{user.email}</p>
          <p className="text-sm mt-1">Last Login: {userInfo.lastSignInTime}</p>
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
      <DataCard user={user}></DataCard>
    </motion.div>
  );
};

export default Profile;
