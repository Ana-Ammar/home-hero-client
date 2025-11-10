import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddSevices = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() && !tags.includes(tagInput)) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleAddService = (e) => {
    e.preventDefault();
    const form = e.target;
    const newService = {
      service_name: form.service_name.value,
      category: form.category.value,
      price: parseInt(form.price.value),
      description: form.description.value,
      image: form.image.value,
      provider_name: form.provider_name.value,
      email: form.email.value,
      created_at: new Date().toLocaleDateString(),
      status: form.status.value,
      tags,
    };

    axiosSecure.post("/services", newService).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Added",
          text: "Service added successfully",
          icon: "success",
        });
        e.target.reset()
        setTags([])
      }
    });
  };

  return (
    <div className="section-margin max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-2xl p-8 border border-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-700">
        Add a New Service
      </h2>

      <form
        onSubmit={handleAddService}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Left Side */}
        <div className="space-y-4">
          <div>
            <label className="font-medium text-gray-600">Service Name</label>
            <input
              type="text"
              className="input input-bordered w-full mt-1"
              name="service_name"
              required
            />
          </div>

          <div>
            <label className="font-medium text-gray-600">Category</label>
            <select
              className="select select-bordered w-full mt-1"
              name="category"
              required
            >
              <option value="">Select Category</option>
              <option>Cleaning</option>
              <option>Repair</option>
              <option>Electronics</option>
              <option>Furniture</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="font-medium text-gray-600">Price (৳)</label>
            <input
              type="text"
              className="input input-bordered w-full mt-1"
              name="price"
              required
            />
          </div>

          <div>
            <label className="font-medium text-gray-600">Provider Name</label>
            <input
              type="text"
              defaultValue={user.displayName}
              className="input input-bordered w-full mt-1"
              name="provider_name"
              required
              readOnly
            />
          </div>

          <div>
            <label className="font-medium text-gray-600">Email</label>
            <input
              type="email"
              className="input input-bordered w-full mt-1"
              defaultValue={user.email}
              name="email"
              required
              readOnly
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="space-y-4">
          <div>
            <label className="font-medium text-gray-600">Image URL</label>
            <input
              type="text"
              className="input input-bordered w-full mt-1"
              name="image"
              required
            />
          </div>

          <div>
            <label className="font-medium text-gray-600">Description</label>
            <textarea
              className="textarea textarea-bordered w-full mt-1"
              rows="5"
              name="description"
              required
            ></textarea>
          </div>

          <div>
            <label className="font-medium text-gray-600">Status</label>
            <select
              className="select select-bordered w-full mt-1"
              name="status"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="font-medium text-gray-600">Tags</label>
            <div className="flex gap-2 mt-1">
              <input
                type="text"
                className="input input-bordered grow"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add tag..."
              />
              <button className="btn border-gray-300" onClick={handleAddTag}>
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map((tag, idx) => (
                <div
                  key={idx}
                  className="badge badge-outline flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-red-500 text-xs hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="col-span-1 md:col-span-2 mt-6">
          <button type="submit" className="btns w-full!">
            Add Service
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSevices;
