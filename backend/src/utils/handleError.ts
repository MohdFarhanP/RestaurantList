export function handleError(error: unknown): never {
  if (error instanceof Error) {
    console.error(error.stack);
    throw new Error(error.message);
  } else {
    throw new Error("An unknown error occurred");
  }
}
