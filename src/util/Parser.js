const Parser = {
  toNumber: (string) => Number(string),
  toSplitNumberArray: (stringNumbers) =>
    stringNumbers.split(",").map((string) => Number(string)),
  toYNBoolean: (string) => string.toLowerCase() === "y",
};

export default Parser;
