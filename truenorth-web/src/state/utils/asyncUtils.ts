export const isPending = (slice: string, type: string) => {
  if (type && type.startsWith(slice) && type.includes('pending')) {
    return true;
  }
  return false;
};

export const isRejected = (slice: string, type: string) => {
  if (type && type.startsWith(slice) && type.includes('rejected')) {
    return true;
  }
  return false;
};