import React, { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Box, Button, Dialog, DialogTitle, DialogContent } from "@mui/material";

import "tailwindcss/tailwind.css";
import FormCreation from "./Form";
import { CreateServiceDrawer } from "./CreateServiceDrawer";

const ServicesList = ({ services }) => {
  const [openCreateService, setOpenCreateService] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [expandedAccordion, setExpandedAccordion] = useState(null);

  const onCreateService = () => setOpenCreateService(true);
  const onCloseCreateService = () => setOpenCreateService(false);

  const handleAccordionClick = (service) => {
    setCurrentService(service);
    setEditDialogOpen(true);
    setExpandedAccordion(service.service_id);
  };

  const handleDialogClose = () => {
    setEditDialogOpen(false);
    setCurrentService(null);
    setExpandedAccordion(null);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(services);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update ranks
    const updatedItems = items.map((item, index) => ({
      ...item,
      rank: index + 1
    }));

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
            <FormCreation serviceId={currentService.service_id} Initialdata={currentService} />
          )}
        </DialogContent>
        <Box textAlign="right" padding={1}>
          <Button onClick={handleDialogClose} color="primary" variant="contained">
            Close
          </Button>
        </Box>
      </Dialog>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppableId">
          {(provided) => (
            <Grid {...provided.droppableProps} ref={provided.innerRef} container spacing={2}>
               { services.map((service, index) => (
                  <Draggable key={service.service_id} draggableId={service.service_id.toString()} index={index}>
                    {(provided, snapshot) => (
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          opacity: snapshot.isDragging ? 0.5 : 1
                        }}
                      >
                        <Accordion
                          className="mb-4"
                          expanded={expandedAccordion === service.service_id}
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
                            {/* Add any additional details you want to show */}
                          </AccordionDetails>
                        </Accordion>
                      </Grid>
                    )}
                  </Draggable>
                ))}
              )}
              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
      </DragDropContext>

      <CreateServiceDrawer showForm={openCreateService} onClose={onCloseCreateService} />
    </Box>
  );
};

export default ServicesList;