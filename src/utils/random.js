const Random = {
  getRandomArray({ minNumber, maxNumber, length }) {
    if (length > maxNumber - minNumber + 1) throw new Error('Cannot generate unique numbers. length exceeds range.');
    const uniqueNumbers = new Set();

    while (uniqueNumbers.size < length)
      uniqueNumbers.add(Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber);

    return Array.from(uniqueNumbers);
  },
};

export default Random;
