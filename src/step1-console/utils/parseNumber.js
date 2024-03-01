export const parseNumber = (string) => {
  const EXCEPTIONAL_CASES = [""];

  if (EXCEPTIONAL_CASES.includes(string)) {
    return NaN;
  }

  return Number(string);
};
