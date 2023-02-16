import { SORT_TYPE } from './constants.js';

const getSortedNumbers = (numbers, orderType = SORT_TYPE.INCREASING) => {
  const copiedNumbers = numbers.slice();

  if (orderType === SORT_TYPE.DECREASING) {
    const sortedNumbers = copiedNumbers.sort((a, b) => b - a);
    return sortedNumbers;
  }

  const sortedNumbers = copiedNumbers.sort((a, b) => a - b);
  return sortedNumbers;
};

export default getSortedNumbers;
