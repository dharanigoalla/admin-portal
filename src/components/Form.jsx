import { useState, useEffect } from "react";
//import { user } from '../Formvalidation';
import { TextField, Checkbox, Button, FormLabel, Stack, Box, Alert } from '@mui/material';
import { createService, updateService,getPreSignedUrl, uploadFileToS3 } from "../apis/api";
 const folderPath = 'apoorva/test';
const FormCreation = ({ serviceId, Initialdata, isCreating = false }) => {
 
  const [formdata, setFormdata] = useState({
    name: "",
    backgroundcolor: "#FFFFFF",
    Imageupload: null,
    Imageupload2: "",
    rank :7,
    requestenabled: false,
  });
  const [successMessage, setSuccessMessage] = useState(""); 

 
  useEffect(() => {
    if (Initialdata && !isCreating) {
      setFormdata({
        name: Initialdata.name,
        backgroundcolor: Initialdata.bg_color,
        Imageupload2: Initialdata.image_url_2,
        requestenabled: Initialdata.request_enabled,
      });
    }
  }, [Initialdata, isCreating]);

 
  const handleChange = async (e) => {
    const { name, value, type, checked, files } = e.target ||{};
    
    if (type === "file") {
      console.log(files[0].type, files[0].name);
      const fileType = files[0].type
      const fileName = files[0].name
      
      const responseUrl = await getPreSignedUrl(fileName, fileType, folderPath);
      console.log('here', responseUrl);
      const response = await uploadFileToS3(files[0], responseUrl);
      //console.log(response.data, 'upload message');
      setFormdata({
        ...formdata,
        [name]: files[0] || null,
      });
    } else if (type === "checkbox") {
      setFormdata({
        ...formdata,
        [name]: checked,
      });
    } else {
      setFormdata({
        ...formdata,
        [name]: value,
      });
    }
  };
  
 
   const onChangeSubmit = async (e) => {
    e.preventDefault();
    /*try {
      user.parse(formdata);
    } catch (error) {
      console.error("Validation Error:", error.errors);
      alert("Form validation failed. Please check your inputs.");
      return;
    }*/
   
    
    const formDataToSend = {
   "service_id" : serviceId,
    "rank": formdata.rank,
   "name" : formdata.name,
    "bg_color" : formdata.backgroundcolor,
    "request_enabled" : formdata.requestenabled};
    if (formdata.Imageupload) {
      formDataToSend.image_url = `${folderPath}/${formdata.Imageupload.name}`;
    }

 
    try {
      let data;
      if (isCreating) {
       data = await createService(formDataToSend);
        console.log("Service created", data);
      } else {
        data = await updateService(formDataToSend, serviceId);
        console.log("Updated successfully", data);
      }
      setFormdata({
        name: "",
        backgroundcolor: "#FFFFFF",
        Imageupload: null,
        rank: 7,
        requestenabled: false,
        image_url: "",
      });

     
      setSuccessMessage("Form submitted successfully!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  
  return (
    <Box className='max-w-md mx-auto p-2 bg-gray-100 rounded-lg shadow border-gray-200'>
      {successMessage && (
        <Alert severity="success" sx={{ marginBottom: 2 }}>
          {successMessage}
        </Alert>
      )}
      <form onSubmit={onChangeSubmit}  className='flex flex-col'>
       
        <Stack direction={"column"} gap={1} className="w-full">
          <FormLabel htmlFor="service-name"  sx ={{ color : 'grey '}}className="font-semibold text-lg">
            Service Name
          </FormLabel>
          <TextField 
            id="service-name"
            type="text"
            name="name"
            value={formdata.name}
            placeholder="Enter Your Service Name"
            onChange={handleChange}
            fullWidth
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '60px',
                height :'50px'
              },
            }}
          />
        </Stack>

        <rank id = "rank" name = "rank" value = {formdata.rank}/>
        <Stack direction="column" gap={1} className="w-full" sx = {{mb :2}}>
          <FormLabel htmlFor="background-color" sx ={{ color : 'grey '}}className="font-semibold text-lg">
            Background Color
          </FormLabel>
          <TextField
            id="background-color"
            required
            type="color"
            name="backgroundcolor"
            value={formdata.backgroundcolor}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '60px',
                height : '50px'
              },
            }}
          />
        </Stack>

        
        <Stack direction="column" gap={1} className="w-full">
          <FormLabel htmlFor="image-upload" sx ={{ color : 'grey '}}className="font-semibold text-base text-black">
            Image Upload
          </FormLabel>
          <TextField
            id="image-upload"
            type="file"
            name="Imageupload"
            onChange={handleChange}
            fullWidth
            variant="outlined"
            style={{ display: 'block' }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '60px',
                height : '50px'
              },
            }}
          />
        </Stack>

       
        <Stack direction="row" gap={2} className="w-full" alignItems="center">
      <Box display="flex" alignItems="center">
      <FormLabel htmlFor="requestenabled"sx ={{ color :'grey'}} className="font-sans text-base">
      Request Enabled
    </FormLabel>
    <Checkbox
      id="requestenabled"
      className="flex items-center"
      checked={formdata.requestenabled}
      onChange={handleChange}
      name="requestenabled"
    />
  </Box>
</Stack>


       
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default FormCreation;
