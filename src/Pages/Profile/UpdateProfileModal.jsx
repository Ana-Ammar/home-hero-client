import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthProvider/AuthContext";

const UpdateProfileModal = ({ userInfo, setUserInfo }) => {
  const { updateUserProfile } = useContext(AuthContext);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const updateData = {
      displayName: e.target.name.value,
      photoURL: e.target.photo.value,
    };
    const { lastSignInTime } = userInfo;
    updateUserProfile(updateData).then(() => {
      setUserInfo({ ...updateData, lastSignInTime });
      Swal.fire({
        title: "Success",
        text: "Profile updated successfully!",
        icon: "success",
      });
    });
    document.getElementById("update-profile-modal").close();
  };

  return (
    <div>
      <dialog
        id="update-profile-modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box relative bg-linear-to-br from-white via-gray-50 to-primary/10 shadow-xl rounded-2xl border border-primary/20 max-w-md">
          {/* Close Button */}
          <label
            htmlFor="close"
            onClick={() =>
              document.getElementById("update-profile-modal").close()
            }
            className="btn btn-sm btn-circle absolute right-3 top-3 bg-indigo-200 hover:bg-indigo-300 border-none text-gray-700"
          >
            ✕
          </label>

          <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
            Update Profile
          </h2>

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block font-medium text-gray-600 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                defaultValue={userInfo.displayName}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-gray-600 mb-1">
                Profile Image URL
              </label>
              <input
                type="text"
                name="photo"
                defaultValue={userInfo.photoURL}
                className="input input-bordered w-full"
                required
              />
            </div>

            <button type="submit" className="btns w-full mt-4">
              Update Profile
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default UpdateProfileModal;
