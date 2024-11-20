import React, { useState } from "react";
import { Delete, Edit } from "@mui/icons-material";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Box, Button, Drawer, Dialog, DialogTitle, DialogContent, DialogActions} from "@mui/material";
import "tailwindcss/tailwind.css";
import FormCreation from "./Form";
import { CreateServiceDrawer } from "./CreateServiceDrawer";

import { deleteService } from "../apis/api";
import {get_s3_image_url} from "../utils/utils";

const ServicesList = ({ services, setServices}) => {
  const [openCreateService, setOpenCreateService] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const[deleteDialogOpen, setDeleteDialogOpen]= useState(false);
  //const [expandedAccordion, setExpandedAccordion] = useState(null);

  const onClickDelete = (event, service )=>{
    setDeleteDialogOpen(true);
    setCurrentService(service);
    event.stopPropagation();
  }



  const onConfirmDelete =  async ()=>{
    if (currentService){
     try{
      await deleteService(currentService.service_id);
     setServices(services.filter(service => service.service_id !== currentService.service_id));
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
  };

  const handleDialogClose = () => {
    setEditDialogOpen(false);
    setCurrentService(null);
  };

  return (
    <Box padding={2}>
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
      <Grid container spacing={2}>
        {services.length === 0 ? (
          <p>Loading services...</p>
        ) : (
          services.map((service) => (
            <Grid item xs={6} sm={3} md={3} key={service.id}>
              <Accordion
                className=" p-0 rounded-2xl"
               // expanded={expandedAccordion === service.id}
               // onChange={() => handleAccordionClick(service)}
              >
                <AccordionSummary className='p-0 m-0 h-40 rounded-3xl' sx={{
                    padding: 0, margin:0,
                    '& .MuiAccordionSummary-content': {
                        height: '100%',
                        margin: 0,
                        padding: 0,
                    }

                }}>
                  <Box className='relative w-full m-0'>
                  >
                      <img src={get_s3_image_url(service.image_url_2)} alt={service.name} className='absolute right-0 top-0 max-w-full h-full w-full' />
                      <Typography variant="h6" className='absolute bottom-3 left-3'>{service.name}</Typography>
                  </Box>

                </AccordionSummary>
                <AccordionDetails>
                <Box className='flex justify-between gap-2 mt-2'>
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<Edit />}
                      onClick={(e) => handleEditClick(service, e)}
                     sx={{ textTransform: 'none' }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="inherit"
                      startIcon={<Delete color='error' />}
                      onClick={(e) => onClickDelete(e, service)}
                      sx={{ textTransform: 'none' }}
                    >
                      Delete
                    </Button>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))
        )}
      </Grid>
        <DeleteDialog
            open={deleteDialogOpen}
            onCancel={()=> {
                setDeleteDialogOpen(false)
                setCurrentService(null)
            } }
            onConfirm={onConfirmDelete}
            onClose={()=> setDeleteDialogOpen(false)}
        />
        <EditServiceDialog
            open={editDialogOpen}
            onClose={handleDialogClose}
            service={currentService}
            setServices={setServices}
        />
      <CreateServiceDrawer showForm={openCreateService} onClose={onCloseCreateService} />
    </Box>
  );
};



const DeleteDialog = (props) => {
    const {onCancel, onConfirm, open, onClose} = props;

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>Confirm Service Deletion</DialogTitle>
            <DialogContent>
                <Typography>
                    Are you sure you want to delete this service? This action cannot be undone.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={onConfirm} color="secondary" autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}


const EditServiceDialog = (props) => {
    const { open, onClose, service, setServices } = props;
    return (
        <Dialog open={open} onClose={onClose}>
        <DialogTitle>Edit Service</DialogTitle>
        <DialogContent>
            <FormCreation service={service} setServices={setServices} Initialdata={service} isCreating={false} serviceId={service?.service_id} />
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color="primary">
            Cancel
            </Button>
        </DialogActions>
        </Dialog>
    );
}

export default ServicesList;
