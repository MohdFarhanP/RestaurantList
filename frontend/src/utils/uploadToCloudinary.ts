import axios from "axios";
const  baseUrl = import.meta.env.VITE_CLOUDINARY_BASE_URL;
const upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESENT;
const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

export const uploadToCloudinary = async (file:File):Promise<string | null>=>{
     const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", upload_preset);
    data.append("cloud_name", cloud_name);

    try {
      const res = await axios.post(baseUrl,data)
      if(res.data.secure_url){
        return res.data.secure_url;
      } else {
      console.error("Cloudinary upload failed:");
      return null;
      }
    }catch(error){
        console.error("Cloudinary upload error",error);
        return null;
    }

}