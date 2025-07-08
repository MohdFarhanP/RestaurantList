import { handleError } from "../../utils/handleError";

export abstract class BaseRepository {
  protected async runSafe<T>(fn: () => Promise<T>): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      handleError(error);
    }
  }
}
