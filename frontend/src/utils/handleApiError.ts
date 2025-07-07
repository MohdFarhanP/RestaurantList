import { AxiosError } from "axios";
import { toast } from "react-toastify";

export function handleApiError(error: unknown): never {
  if (error instanceof AxiosError) {
    const message =
      error.response?.data?.msg ||
      error.response?.data?.message ||
      error.message;
    console.error(message);
    toast.error(message);
    throw new Error(message);
  } else {
    toast.error("An unknown error occurred");
    throw new Error("An unknown error occurred");
  }
}
