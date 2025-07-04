import { useState, useEffect } from 'react';

interface Restaurant {
  id?: string;
  name: string;
  contact: string;
  email: string;
  street: string;
  landmark: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
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
    contact: '',
    email: '',
    street: '',
    landmark: '',
    area: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof Restaurant, string>>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    } else {
      setFormData({
        name: '',
        contact: '',
        email: '',
        street: '',
        landmark: '',
        area: '',
        city: '',
        state: '',
        pincode: '',
        country: '',
      });
    }
    setFormErrors({});
  }, [initialData, open]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errors: Partial<Record<keyof Restaurant, string>> = {};

    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.contact.trim()) errors.contact = 'Contact is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    if (!formData.street.trim()) errors.street = 'Street is required';
    if (!formData.city.trim()) errors.city = 'City is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onSubmit = () => {
    if (!validate()) return;
    handleSubmit(formData);
    handleClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg overflow-y-auto max-h-[95vh] p-6">
        <h2 className="text-xl font-semibold mb-4">
          {initialData?.id ? 'Edit Restaurant' : 'Add Restaurant'}
        </h2>

        {/* Form */}
        <div className="space-y-2">
          {/* Basic Info */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Restaurant Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              className="block w-full border border-gray-300 rounded-md p-2"
            />
            {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={onChange}
                className="block w-full border border-gray-300 rounded-md p-2"
              />
              {formErrors.contact && <p className="text-red-500 text-sm">{formErrors.contact}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                className="block w-full border border-gray-300 rounded-md p-2"
              />
              {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
            </div>
          </div>

          {/* Address Section */}
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Address</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Street</label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={onChange}
                  className="block w-full border border-gray-300 rounded-md p-2"
                />
                {formErrors.street && <p className="text-red-500 text-sm">{formErrors.street}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Landmark</label>
                <input
                  type="text"
                  name="landmark"
                  value={formData.landmark}
                  onChange={onChange}
                  className="block w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Area / Locality</label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={onChange}
                  className="block w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={onChange}
                  className="block w-full border border-gray-300 rounded-md p-2"
                />
                {formErrors.city && <p className="text-red-500 text-sm">{formErrors.city}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={onChange}
                  className="block w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={onChange}
                  className="block w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={onChange}
                  className="block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-amber-100 hover:bg-amber-200 rounded-md"
          >
            {initialData?.id ? 'Update' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditRestaurantDialog;
