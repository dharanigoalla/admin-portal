import React, { useState } from "react";
import { Delete, Edit } from "@mui/icons-material";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Box, Button, Drawer, Dialog, DialogTitle, DialogContent, DialogActions} from "@mui/material";
import "tailwindcss/tailwind.css";
import FormCreation from "./Form";
import { CreateServiceDrawer } from "./CreateServiceDrawer";

import { deleteService } from "../apis/api";

const ServicesList = ({ services, setServices}) => {
  console.log('here', services);
  const [openCreateService, setOpenCreateService] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const[deleteDialogOpen, setDeleteDialogOpen]= useState(false);
  //const [expandedAccordion, setExpandedAccordion] = useState(null); 

  const onClickOfDelete = (event, service )=>{
    setDeleteDialogOpen(true);
    setCurrentService(service);
    event.stopPropagation();
  }
 

  const onConfirmDelete =  async ()=>{
    console.log(currentService);
    if (currentService){
     try{
      await deleteService(currentService.service_id);
     setServices(services.filter(service => service.id !== currentService.service_id));
      setDeleteDialogOpen(false);
      setCurrentService(null);
    } catch (error) {
      console.error("Error deleting service:", error);
    }
    }
     
  };
  const onCreateService = () =>
     setOpenCreateService(true);
  const onCloseCreateService = () => 
    setOpenCreateService(false);

  const handleEditClick = (service, event) => {
    event.stopPropagation();
    setCurrentService(service);
    setEditDialogOpen(true);
    //setExpandedAccordion(service.id); 
  };

  const handleDialogClose = () => {
    setEditDialogOpen(false);
    setCurrentService(null);
   // setExpandedAccordion(null); 
  };

  return (
    <Box padding={1}>
      <Box className="flex mb-2 mt-2 justify-end">
        <Button
          color="primary"
          style={{ marginBottom: "20px" }}
          variant="contained"
          onClick={onCreateService}
        >
          Create a service
        </Button>
      </Box>

      {/* Dialog for deleting a service */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Service Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this service? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={onConfirmDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for editing a service */}
      <Dialog
        open={editDialogOpen}
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
        sx={{
          "& .MuiPaper-root": {
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle>
          <Typography variant="subtitle1" sx={{ fontWeight: 300, fontSize: '1rem', textAlign: 'center' }}>
            Please fill out the below details to edit the service
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ padding: '1px' }}>
          {currentService && (
            <FormCreation serviceId={currentService.service_id} Initialdata={currentService}  />
          )}
        </DialogContent>
        <Box textAlign="right" padding={1}>
          <Button onClick={handleDialogClose} color="primary" variant="contained">
            Close
          </Button>
        </Box>
      </Dialog>
        {/* Displaying the list */}
      <Grid container spacing={2}>
        {services.length === 0 ? (
          <p>Loading services...</p>
        ) : (
          services.map((service) => (
            <Grid item xs={6} sm={6} md={4} key={service.id}>
              <Accordion
                className="mb-4"
               // expanded={expandedAccordion === service.id} 
               // onChange={() => handleAccordionClick(service)}
              >
                <AccordionSummary
                  style={{
                    backgroundImage: `url(https://ri-classifieds.s3.us-west-2.amazonaws.com${service.image_url_2})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "28vh",
                    width: "100%",
                    backgroundRepeat: "no-repeat",
                    position: "relative",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      zIndex: 2,
                      padding: "17px",
                      paddingLeft: "1px",
                      textAlign: "left",
                      display: "flex",
                    }}
                  >
                    <Typography variant="h6">{service.name}</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<Edit />}
                      onClick={(e) => handleEditClick(service, e)}
                    >
                      Edit service
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<Delete />}
                      onClick={(e) => onClickOfDelete(e, service)}
                    >
                      Delete service
                    </Button>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))
        )}
      </Grid>

      <CreateServiceDrawer showForm={openCreateService} onClose={onCloseCreateService} />
    </Box>
  );
};

export default ServicesList;
