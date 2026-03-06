import { LOTTO_RANGE } from "../constants/constant.js";

export function checkNumberRange(winningNumberArray) {
  const booleanArray = winningNumberArray.map((element) => {
    return getBooleanNumberRange(element);
  });
  return booleanArray;
}

function getBooleanNumberRange(element) {
  if (element < LOTTO_RANGE.MIN || element > LOTTO_RANGE.MAX) return false;
  return true;
}
