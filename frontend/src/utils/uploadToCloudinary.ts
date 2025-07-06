
export const uploadToCloudinary = async (file:File):Promise<string | null>=>{
     const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "for_restaurantlisting");
    data.append("cloud_name", "dvsfcb824");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dvsfcb824/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const json = await response.json();
      if(json.secure_url){
        return json.secure_url;
      } else {
      console.error("Cloudinary upload failed:", json);
      return null;
      }
    }catch(error){
        console.error("Cloudinary upload error",error);
        return null;
    }

}