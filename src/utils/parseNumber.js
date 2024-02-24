export const parseNumber = (string) => {
  if (string === "") {
    return NaN;
  }

  return Number(string);
};
