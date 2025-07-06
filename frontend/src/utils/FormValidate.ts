import type { Restaurant } from "../components/AddEditRestaurantDialog";

interface FormValidateProp{
  formData:Restaurant;
  setFormErrors:(error:Partial<Record<keyof Restaurant, string>>)=>void;
}
export const FormValidate = ({formData,setFormErrors}:FormValidateProp) => {
  const errors: Partial<Record<keyof Restaurant, string>> = {};


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10,15}$/; // Adjust range as needed

  if (!formData.name.trim()) {
    errors.name = "Name is required";
  }

  if (!formData.contact.trim()) {
    errors.contact = "Contact is required";
  } else if (!phoneRegex.test(formData.contact)) {
    errors.contact = "Enter a valid contact number";
  }

  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(formData.email)) {
    errors.email = "Enter a valid email address";
  }

  if (!formData.street.trim()) {
    errors.street = "Street is required";
  }

  if (!formData.city.trim()) {
    errors.city = "City is required";
  }

  if (!formData.state.trim()) {
    errors.state = "State is required";
  }

  if (!formData.country.trim()) {
    errors.country = "Country is required";
  }
  
  if (!formData.images[0]) errors.images = "Please select at least one image";


  setFormErrors(errors);
  return Object.keys(errors).length === 0;
};
