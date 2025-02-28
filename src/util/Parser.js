const Parser = {
  toNumber: (string) => Number(string),
  toSplitNumberArray: (stringNumbers) =>
    stringNumbers.split(",").map((string) => Number(string)),
  toYNBoolean: (string) => string.toLowerCase() === "y",
  toNumberArray: (stringArray) => stringArray.map((string) => Number(string)),
};

export default Parser;
