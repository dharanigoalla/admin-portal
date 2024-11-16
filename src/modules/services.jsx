import { useState, useEffect } from "react";
import ServicesList from "../components/servicelist.jsx";
import { Box } from "@mui/material";
import { getServices, updateServiceOrder } from "../apis/api";

const Services = () => {
  const [services, setServices] = useState([]);

  const fetchData = async () => {
    try {
      const data = await getServices();
      setServices(data);
    } catch (error) {
      console.error("Error in fetching services:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateServices = async (newServices) => {
    setServices(newServices);

    // Prepare the data for the API call
    const updatedOrder = newServices.map((service, index) => ({
      service_id: service.service_id,
      rank: index + 1
    }));

    try {
      // Assuming you have an API function to update the service order
      await updateServiceOrder(updatedOrder);
    } catch (error) {
      console.error("Error updating service order:", error);
      // Optionally, you could revert the state here if the API call fails
      // fetchData();
    }
  };

  return (
    <div>
      <Box className="mt-8">
        <ServicesList services={services} updateServices={updateServices} />
      </Box>
    </div>
  );
};

export default Services;