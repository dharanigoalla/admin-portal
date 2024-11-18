import React, { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Box, Button, Drawer, Dialog, DialogTitle, DialogContent } from "@mui/material";
import "tailwindcss/tailwind.css";
import FormCreation from "./Form";
import { CreateServiceDrawer } from "./CreateServiceDrawer";

const ServicesList = ({ services }) => {
  const [openCreateService, setOpenCreateService] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [expandedAccordion, setExpandedAccordion] = useState(null); 

  const onCreateService = () =>
     setOpenCreateService(true);
  const onCloseCreateService = () => 
    setOpenCreateService(false);

  const handleAccordionClick = (service) => {
    setCurrentService(service);
    setEditDialogOpen(true);
    setExpandedAccordion(service.id); 
  };

  const handleDialogClose = () => {
    setEditDialogOpen(false);
    setCurrentService(null);
    setExpandedAccordion(null); 
  };

  return (
    <Box padding={1}>
      <Box className="flex mb-2 mt-2 justify-center">
        <Button
          color="primary"
          style={{ marginBottom: "20px" }}
          variant="contained"
          onClick={onCreateService}
        >
          Create a service
        </Button>
      </Box>

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
            <FormCreation serviceId={currentService.id} Initialdata={currentService} />
          )}
        </DialogContent>
        <Box textAlign="right" padding={1}>
          <Button onClick={handleDialogClose} color="primary" variant="contained">
            Close
          </Button>
        </Box>
      </Dialog>

      <Grid container spacing={2}>
        {services.length === 0 ? (
          <p>Loading services...</p>
        ) : (
          services.map((service) => (
            <Grid item xs={6} sm={6} md={4} key={service.id}>
              <Accordion
                className="mb-4"
                expanded={expandedAccordion === service.id} 
                onChange={() => handleAccordionClick(service)}
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
