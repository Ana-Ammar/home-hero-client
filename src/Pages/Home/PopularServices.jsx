import { useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import Card from "../../Components/Card";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";

const PopularServices = () => {
  const axios = useAxios();
  const [topSevices, setTopServices] = useState([]);

  useEffect(() => {
    axios.get("/top-rated-services").then((data) => setTopServices(data.data));
  }, [axios]);

  if(!topSevices) {
    return <LoadingSpinner />
  }
  
  return (
    <div className="section-margin">
      <h1 className="section-title divider">Popular Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topSevices.map((service) => (
          <Card key={service._id} service={service}></Card>
        ))}
      </div>
    </div>
  );
};

export default PopularServices;
