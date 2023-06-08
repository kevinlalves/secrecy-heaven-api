export function invalidDataError(details: string[]) {
  return {
    message: 'Invalid data',
    details,
  };
}
