export function checkNumberRange(winningNumberArray) {
  const booleanArray = winningNumberArray.map((element) => {
    return getBooleanNumberRange(element);
  });
  return booleanArray;
}

function getBooleanNumberRange(element) {
  if (element < 1 || element > 45) return false;
  return true;
}
