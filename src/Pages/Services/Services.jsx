import { useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import Card from "../../Components/Card";
import { FaSearch } from "react-icons/fa";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";

const Services = () => {
  const axios = useAxios();
  const [services, setServices] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get("/services").then((data) => setServices(data.data));
    setLoading(false);
  }, [axios]);

  const handleFilter = () => {
    setLoading(true);
    axios
      .get(`/services?min=${minPrice}&max=${maxPrice}&search=${search}`)
      .then((data) => {
        setServices(data.data);
        setLoading(false);
        setMaxPrice("");
        setMinPrice("");
        setSearch("");
      });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="section-margin">
      <h2 className="section-title divider">Our Services</h2>

      <div className="flex flex-col md:flex-row justify-between items-center gap-3 mb-6">
        {/* Price Filter */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Min Price"
            className="input input-bordered md:w-28"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <span className="text-lg">-</span>
          <input
            type="text"
            placeholder="Max Price"
            className="input input-bordered md:w-28"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <button className="btns" onClick={handleFilter}>
            Apply
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <FaSearch
              className="absolute left-3 top-3 text-gray-400 z-20"
              size={18}
            />
            <input
              type="text"
              placeholder="Search services..."
              className="input input-bordered pl-10 w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="btns" onClick={handleFilter}>
            Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <Card key={service._id} service={service}></Card>
        ))}
      </div>
    </div>
  );
};

export default Services;
