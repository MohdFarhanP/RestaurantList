import { handleError } from "../../utils/handleError";

export abstract class BaseUseCase {
  protected executeSafe<T>(fn: () => Promise<T>): Promise<T> {
    return fn().catch((error) => handleError(error));
  }
}
