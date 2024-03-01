export const parseNumber = (string) => {
  if (string !== 0 && !string) {
    return NaN;
  }

  return Number(string);
};
