import { RANDOM_CONSTANT } from "../constants/constant";

export function checkNumberRange(winningNumberArray) {
  const booleanArray = winningNumberArray.map((element) => {
    return getBooleanNumberRange(element);
  });
  return booleanArray;
}

function getBooleanNumberRange(element) {
  if (element < RANDOM_CONSTANT.MIN || element > RANDOM_CONSTANT.MAX)
    return false;
  return true;
}
