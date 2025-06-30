import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import React from 'react'; 

// Define the props for the DeleteConfirmationDialog component
interface DeleteConfirmationDialogProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  restaurantName: string;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  open,
  handleClose,
  handleConfirm,
  restaurantName,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete{' '}
          <span className="font-semibold">{restaurantName}</span>?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" color="error" onClick={handleConfirm}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;