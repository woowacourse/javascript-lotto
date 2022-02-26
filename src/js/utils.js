export const range = (startInclusive, endInclusive) => {
  const size = Math.abs(endInclusive - startInclusive) + 1;
  if (endInclusive >= startInclusive) {
    return [...Array(size).keys()].map((i) => startInclusive + i);
  }
  return [...Array(size).keys()].map((i) => startInclusive - i);
};

export const removeValByIndexInArr = (arr, index) => {
  const newArr = [...arr];
  newArr[index] = newArr[newArr.length - 1];
  newArr.pop();
  return newArr;
};

export const pickNumberInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const pickUniqueNumbersInRange = (startInclusive, endInclusive, count) => {
  const removeCount = endInclusive - startInclusive + 1 - count;
  return Array.from({ length: removeCount }).reduce((acc) => {
    return removeValByIndexInArr(acc, pickNumberInRange(0, acc.length - 1));
  }, range(startInclusive, endInclusive));
};
