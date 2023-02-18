import { ORDER_TYPE } from './constants.js';

const getSortedNumbers = (numbers, orderType = ORDER_TYPE.INCREASING) => {
  const copiedNumbers = numbers.slice();

  if (orderType === ORDER_TYPE.DECREASING) {
    const sortedNumbers = copiedNumbers.sort((a, b) => b - a);
    return sortedNumbers;
  }

  const sortedNumbers = copiedNumbers.sort((a, b) => a - b);
  return sortedNumbers;
};

export default getSortedNumbers;
