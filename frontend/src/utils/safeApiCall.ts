import { handleApiError } from "./handleApiError";

export async function safeApiCall<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}