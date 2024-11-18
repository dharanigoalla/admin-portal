import { useState, useEffect } from "react";
import ServicesList from "../components/servicelist.jsx";
import { Box} from "@mui/material"
import {getServices} from "../apis/api";


const Services = ()=>{
  const[services, setServices] = useState([]);
  
 const fetchData = async()=>{
   try{
    const data =  await getServices();
    setServices(data);
    
   }
   catch(error) {
           console.error("Error in fetching services:",error);
 }
 }
  useEffect(() => {
  fetchData();

  }, []);
  

  return (
    <div>
      <Box className="mt-8">
        <ServicesList services={services} />
      </Box>
    </div>
  );
};;

export default Services;

