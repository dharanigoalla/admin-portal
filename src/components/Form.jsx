import { useState, useEffect } from "react";
import {TextField, Checkbox, Button, FormLabel, Stack, Box, Alert, Typography, LinearProgress} from '@mui/material';
import { createService, updateService, getPreSignedUrl, uploadFileToS3 } from "../apis/api";
import {get_s3_image_url} from "../utils/utils";

const folderPath = '/apoorva/test';

const FormCreation = ({ serviceId, Initialdata, isCreating = false, onUpdate, onCreate }) => {
  const [formdata, setFormdata] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const [imageUplading, setImageUplading] = useState(false);

  useEffect(() => {
    if (Initialdata && !isCreating) {
      setFormdata(Initialdata);
    }
  }, [Initialdata, isCreating]);

  const handleChange = async (e) => {
    const { name, value, checked, files } = e.target || {};
    switch (name) {
        case "image_url_2":
          if (files[0]) {
            const fileType = files[0].type;
            const fileName = files[0].name;
            try {
              setImageUplading(true);
              const responseUrl = await getPreSignedUrl(fileName, fileType, folderPath);await uploadFileToS3(files[0], responseUrl);
              setFormdata(prevFormdata => ({
                ...prevFormdata,
                image_url_2: `${folderPath}/${fileName}`,
              }));
                setImageUplading(false);
            } catch (error) {
              setImageUplading(false);
              console.error("Error uploading file:", error);
            }
          }
            break;
        case "bg_color":
            setFormdata(prevFormdata => ({
              ...prevFormdata,
              bg_color: value,
            }));
            break;
        case 'request_enabled':
            setFormdata(prevFormdata => ({
              ...prevFormdata,
              request_enabled: checked,
            }));
            break;
        case 'name':
            setFormdata(prevFormdata => ({
              ...prevFormdata,
              name: value,
            }));
            break;
        default:
            break;
    }
  };

  const onChangeSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = {
      "rank": formdata.rank?.toString() || '100',
      "name": formdata.name,
      "bg_color": formdata.bg_color,
      "request_enabled": formdata.request_enabled,
      "image_url_2": formdata.image_url_2,
    };

    try {
      let data;
      if (isCreating) {
        data = await createService(formDataToSend);
        onCreate && onCreate(data);
      } else {
         await updateService(formDataToSend, formdata.service_id);
        onUpdate&& onUpdate(formdata);
      }
      setSuccessMessage("Form submitted successfully!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleImageClick = () => {
    document.getElementById('image_url_2').click();
  };


  return (
    <Box className='max-w-md mx-auto p-2 bg-gray-100 rounded-lg shadow border-gray-200'>
      {successMessage && (
        <Alert severity="success" sx={{ marginBottom: 2 }}>
          {successMessage}
        </Alert>
      )}
      <form onSubmit={onChangeSubmit} className='flex flex-col'>
        <Stack direction={"column"} gap={1} className="w-full p-4">
          <FormLabel htmlFor="service-name" sx={{ color: 'grey' }} className="font-semibold text-lg">
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
                height: '50px'
              },
            }}
          />
        </Stack>

        <Stack direction="column" gap={1} className="w-full" sx={{ mb: 2 }}>
          <FormLabel htmlFor="background-color" sx={{ color: 'grey' }} className="font-semibold text-lg">
            Background Color
          </FormLabel>
          <TextField
            id="background-color"
            required
            type="color"
            name="bg_color"
            value={formdata.bg_color}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '60px',
                height: '50px'
              },
            }}
          />
        </Stack>

        <Stack direction="column" gap={1} className="w-full">
          <Box>
            <Button onClick={handleImageClick}>
              <Box className='relative'>
              {formdata.image_url_2 ?

                        <img src={get_s3_image_url(formdata.image_url_2)} alt="preview" style={{ width: '100px', height: '100px' }} />
                    : <Typography>Upload Image</Typography>}
                {imageUplading && <LinearProgress />}
              </Box>
          <TextField
            id="image_url_2"
            type="file"
            name="image_url_2"
            onChange={handleChange}
            fullWidth
            variant="outlined"
            style={{ display: "none" }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '60px',
                height: '50px'
              },
            }}
          >
          </TextField>
            </Button>
          </Box>
        </Stack>

        <Stack direction="row" gap={2} className="w-full" alignItems="center">
          <Box display="flex" alignItems="center">
            <FormLabel htmlFor="request_enabled" sx={{ color: 'grey' }} className="font-sans text-base">
              Request Enabled
            </FormLabel>
            <Checkbox
              id="request_enabled"
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
