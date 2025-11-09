import { useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import Card from "../../Components/Card";

const Services = () => {
  const axios = useAxios();
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get("/services").then((data) => setServices(data.data));
  }, [axios]);

  console.log(services);
  return (
    <div className="section-margin">
      <h2 className="section-title divider">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <Card key={service._id} service={service}></Card>
        ))}
      </div>
    </div>
  );
};

export default Services;
