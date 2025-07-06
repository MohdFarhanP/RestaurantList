import { useState, useEffect } from "react";
import ImageUploadeSection from "./ImageUploadeSection";
import RestaurantFormField from "./RestaurantFormField";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";


export type UploadStatus = 'idle' | 'uploading' | 'changing';

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
  images: string[];
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
    name: "",
    contact: "",
    email: "",
    street: "",
    landmark: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    images: [],
  });
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof Restaurant, string>>
  >({});
    const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
    const [activeUploadIndex, setActiveUploadIndex] = useState<number | null>(null);



  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    } else {
      setFormData({
        name: "",
        contact: "",
        email: "",
        street: "",
        landmark: "",
        area: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        images: [],
      });
    }
    setFormErrors({});
  }, [initialData, open]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const errors: Partial<Record<keyof Restaurant, string>> = {};

    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.contact.trim()) errors.contact = "Contact is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    if (!formData.street.trim()) errors.street = "Street is required";
    if (!formData.city.trim()) errors.city = "City is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleDelete = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleReplaceImage = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number | null = null
  ) => {

    const file = e.target.files?.[0];
    if (!file) return;

    if (index !== null && index !== undefined) {
    setActiveUploadIndex(index);    
    setUploadStatus("changing");
  } else {
    setUploadStatus("uploading");
  }

    try {
      const newUrl = await uploadToCloudinary(file);
      if (!newUrl) return;

      if (index !== null && index !== undefined) {
        // Replace the image at given index
        await setFormData((prev) => {
          const updatedImages = [...prev.images];
          updatedImages[index] = newUrl;
          return { ...prev, images: updatedImages };  
        });

      } else {
        
        await setFormData((prev) => ({
          ...prev,
          images: [...prev.images, newUrl],
        }));
      
      }
    } catch (err) {
      console.error("Failed to replace image", err);
    } finally{
      setUploadStatus('idle');
      setActiveUploadIndex(null);
    }
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
          {initialData?.id ? "Edit Restaurant" : "Add Restaurant"}
        </h2>

        <RestaurantFormField
          formData={formData}
          formErrors={formErrors}
          onChange={onChange}
        />

        <ImageUploadeSection
          activeUploadIndex={activeUploadIndex}
          uploadStatus={uploadStatus}
          images={formData.images}
          onReplace={handleReplaceImage}
          onDelete={handleDelete}
        />

        {/* Footer Actions (btn) */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={uploadStatus !== 'idle'}
            className="px-4 py-2 bg-amber-100 hover:bg-amber-200 rounded-md"
          >
            {initialData?.id ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditRestaurantDialog;
