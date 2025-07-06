import { useRef } from "react";
import type { UploadStatus } from "./AddEditRestaurantDialog";
import LoadingSpinner from "./LoadingSpinner";

interface ImageUploadeSectionProps {
  activeUploadIndex: number | null;
  uploadStatus: UploadStatus;
  images: string[];
  onReplace: (
    e: React.ChangeEvent<HTMLInputElement>,
    index?: number | null
  ) => void;
  onDelete: (index: number) => void;
}

const ImageUploadeSection = ({
  activeUploadIndex,
  uploadStatus,
  images,
  onReplace,
  onDelete,
}: ImageUploadeSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement[]>([]);

  function triggerFileSelect() {
    fileInputRef.current?.click();
  }

  function triggerEditFileSelect(index:number) {
    editFileInputRef.current[index]?.click();
  }

  return (
    <>
      <label className="font-semibold ">Images:</label>
      <div className="flex gap-4 justify-center mt-3">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative w-32 h-32 border rounded overflow-hidden group"
          >
            {uploadStatus === "changing" && activeUploadIndex === index ? (
              <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
                <LoadingSpinner />
              </div>
            ) : (
              <img src={img} className="w-full h-full object-cover" />
            )}
            {/* Delete button */}
            <button
              type="button"
              onClick={() => onDelete(index)}
              disabled={uploadStatus !== "idle"}
              className="absolute top-1 right-1 text-xs bg-red-500 text-white rounded-full px-1"
            >
              ✕
            </button>

            {/*Replace button */}
            <button
              type="button"
              onClick={()=>triggerEditFileSelect(index)}
              disabled={uploadStatus !== "idle"}
              className="absolute bottom-1 left-1 text-xs bg-blue-500 text-white rounded-md px-1 py-0.5"
            >
              Replace
            </button>

            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              ref={(e)=>{
                if(e) editFileInputRef.current[index]=e;
                }}
              hidden
              onChange={(e) => onReplace(e, index)}
            />
          </div>
        ))}
        {images.length < 3 && (
          <div className="flex grid-cols-1 sm:grid-cols-1, md:grid-cols-2 ">
            <button
              className="bg-amber-100 p-2 rounded-md mb-1"
              onClick={triggerFileSelect}
              disabled={uploadStatus !== "idle"}
            >
              {uploadStatus === "uploading" ? <LoadingSpinner /> : "Choose Img"}
            </button>

            <input
              type="file"
              accept="image/*"
              hidden
              ref={fileInputRef}
              onChange={(e) => onReplace(e)}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ImageUploadeSection;
