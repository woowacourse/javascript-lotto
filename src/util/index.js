import { DELIMITER } from "../constants";

export const getAscendingSortedNumbers = (numbers) => {
  return numbers.sort((a, b) => a - b);
};

export const splitAndTrimString = (string) => {
  return string.split(DELIMITER).map((str) => str.trim());
};
