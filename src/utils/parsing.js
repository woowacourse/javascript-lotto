import { ERROR_MESSAGE } from "../constants/errorMessage.js";

export const parsingNumbers = (numberString) => {
  const numberStringArray = numberString.split(",");

  numberStringArray.forEach((numberString) => {
    const number = Number(numberString);
    if (isNaN(number)) throw new Error(ERROR_MESSAGE.NOT_NUMBER);
  });

  const numberArray = numberStringArray.map((numberString) =>
    parseInt(numberString, 10)
  );
  return numberArray;
};

export const stringToNumber = (string) => {
  const number = parseInt(string, 10);
  return number;
};
