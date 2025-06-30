import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { useState, useEffect } from 'react';

interface Restaurant {
  id?: string;
  name: string;
  address: string;
  contact: string;
  email: string;
}

interface AddEditRestaurantDialogProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (formData: Restaurant) => void;
  initialData?: Restaurant;
}

const AddEditRestaurantDialog = ({
  open,
  handleClose,
  handleSubmit,
  initialData,
}: AddEditRestaurantDialogProps) => {
  const [formData, setFormData] = useState<Restaurant>({
    name: '',
    address: '',
    contact: '',
    email: '',
  });

  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof Restaurant, string>>
  >({});

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData({
        name: initialData.name || '',
        address: initialData.address || '',
        contact: initialData.contact || '',
        email: initialData.email || '',
      });
    } else {
      setFormData({
        name: '',
        address: '',
        contact: '',
        email: '',
      });
    }
    setFormErrors({}); // Clear errors on dialog open
  }, [initialData, open]);

  const validate = () => {
    const errors: Partial<Record<keyof Restaurant, string>> = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 3) {
      errors.name = 'Name must be at least 3 characters';
    }

    if (!formData.address.trim()) {
      errors.address = 'Address is required';
    }

    if (!formData.contact.trim()) {
      errors.contact = 'Contact is required';
    } else if (!/^\d{10}$/.test(formData.contact)) {
      errors.contact = 'Contact must be 10 digits';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const onSubmit = () => {
    if (!validate()) return;
    handleSubmit(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>
        {initialData?.id ? 'Edit Restaurant' : 'Add Restaurant'}
      </DialogTitle>

      <DialogContent className="space-y-4">
        <TextField
          autoFocus
          label="Name"
          name="name"
          fullWidth
          value={formData.name}
          onChange={onChange}
          margin="dense"
          error={!!formErrors.name}
          helperText={formErrors.name}
        />
        <TextField
          label="Address"
          name="address"
          fullWidth
          value={formData.address}
          onChange={onChange}
          margin="dense"
          error={!!formErrors.address}
          helperText={formErrors.address}
        />
        <TextField
          label="Contact"
          name="contact"
          fullWidth
          value={formData.contact}
          onChange={onChange}
          margin="dense"
          error={!!formErrors.contact}
          helperText={formErrors.contact}
        />
        <TextField
          label="Email"
          name="email"
          fullWidth
          value={formData.email}
          onChange={onChange}
          margin="dense"
          error={!!formErrors.email}
          helperText={formErrors.email}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={onSubmit}>
          {initialData?.id ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditRestaurantDialog;
