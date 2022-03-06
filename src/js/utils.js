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

export const intersect = (a, b) => {
  const setA = new Set(a);
  const setB = new Set(b);
  return [...setA].filter((x) => setB.has(x));
};

export const consoleErrorWithConditionalAlert = (error, errorNameForAlert) => {
  console.error(error);
  if (error.name === errorNameForAlert) {
    alert(error.message);
  }
};

export const sum = (arr) => {
  return arr.reduce((acc, cur) => acc + cur, 0);
};

export const toInt = (str, defaultNum = 0) => {
  const val = parseInt(str, 10);
  return !Number.isNaN(val) ? val : defaultNum;
};

export const duplicateIndexs = (arr) => {
  const uniqueArr = [...new Set(arr)];
  return uniqueArr
    .reduce((duplicateArr, currentUniqueVal) => {
      const result = arr.reduce((acc, cur, index) => {
        currentUniqueVal === cur && acc.push(index);
        return acc;
      }, []);
      result.length > 0 && duplicateArr.push(result);
      return duplicateArr;
    }, [])
    .filter((indexes) => indexes.length > 1);
};

export const findGroupIndex = (twoDemensionalArr, val) => {
  for (let i = 0; i < twoDemensionalArr.length; i += 1) {
    if (twoDemensionalArr[i].includes(val)) {
      return i;
    }
  }
  return null;
};

export const getRank = (lottoNums, winningNumbers) => {
  const { normal, bonus } = winningNumbers;
  let rank = 0;
  const count = intersect(lottoNums, normal).length;
  if (count === 6) rank = 1;
  else if (count === 5 && lottoNums.includes(bonus)) rank = 2;
  else if (count === 5) rank = 3;
  else if (count === 4) rank = 4;
  else if (count === 3) rank = 5;
  return rank;
};
