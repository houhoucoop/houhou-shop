export const mapEnum = <T extends Record<string, any>>(
  value: string | undefined,
  enumObj: T,
): T[keyof T] => {
  if (!value || value.trim() === '') {
    // If value is undefined or an empty string, return the first enum value
    return enumObj[Object.keys(enumObj)[0]];
  }

  const enumKeys = Object.keys(enumObj) as Array<keyof T>;
  const enumValues = enumKeys.map((key) => enumObj[key]);
  const index = enumKeys.findIndex((key) => value === enumObj[key]);
  if (index === -1) {
    throw new Error(`Invalid enum value: ${value}`);
  }
  return enumValues[index];
};
