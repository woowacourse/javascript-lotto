export const toSplitComma = (input) => {
  if (!input) return [];
  return input.split(",").map((item) => item.trim());
};

export const toNumber = (input) => {
  const rawInput = input.trim();
  return Number(rawInput);
};
