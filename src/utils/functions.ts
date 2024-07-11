export const checkProperty = (property: any) => {
  if (property instanceof File) {
    if (property.size !== 0) return true;
  }

  if (typeof property === "string") {
    if (property !== "") return true;
  }

  if (typeof property === "boolean") {
    return true;
  }

  if (typeof property === "number") {
    return true;
  }

  return false;
};

export const valueFormatData = (value: any) => {
  if (value instanceof File) {
    return value as Blob;
  }

  return String(value);
};
