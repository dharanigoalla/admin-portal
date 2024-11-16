import FormCreation from "./Form";
import { Accordion, AccordionSummary, AccordionDetails,Typography, Grid2, Box, Button, Drawer, Dialog, DialogTitle, DialogContent } from "@mui/material";
export const CreateServiceDrawer = ({showForm, onClose}) => {

return (
   <Drawer anchor="right" open={showForm} onClose={onClose}>
        <Box padding={2} width={400}>
        <Typography variant="body2" sx={{ mb: 3

        }}>
       Please provide the necessary details for the new service...
       </Typography>
          <FormCreation isCreating={true} />
          <Button onClick={onClose}>Close</Button>
        </Box>
      </Drawer>
      );
};