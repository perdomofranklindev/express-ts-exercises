type TryCatchResult<T, E = Error> = [T | null, E | null];

export async function handleTryCatch<T, E = Error>(
  promise: Promise<T>
): Promise<TryCatchResult<T, E>> {
  try {
    const response = await promise;
    return [response, null];
  } catch (error) {
    // TypeScript will infer the error type based on usage
    return [null, error as E];
  }
}
