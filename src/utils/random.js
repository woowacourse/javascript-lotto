import { CONSTANTS } from '../constant/index.js';

const Random = {
  pickUniqueNumbersInRange({ minNumber, maxNumber, count }) {
    if (count > maxNumber - minNumber + CONSTANTS.one)
      throw new Error('Cannot generate unique numbers. Count exceeds range.');
    const uniqueNumbers = new Set();

    while (uniqueNumbers.size < count)
      uniqueNumbers.add(Math.floor(Math.random() * (maxNumber - minNumber + CONSTANTS.one)) + minNumber);

    return Array.from(uniqueNumbers);
  },
};

export default Random;
