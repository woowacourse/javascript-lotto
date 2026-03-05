export const parsingNumbers = (numberString) => {
  const numberStringArray = numberString.split(",");
  const numberArray = numberStringArray.map((numberString) =>
    parseInt(numberString, 10),
  );
  return numberArray;
};

export const stringToNumber = (string) => {
  const number = parseInt(string, 10);
  return number;
};
