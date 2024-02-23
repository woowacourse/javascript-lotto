const Random = {
  pickUniqueNumbersInRange({ minNumber, maxNumber, count }) {
    if (count > maxNumber - minNumber + 1) throw new Error('Cannot generate unique numbers. Count exceeds range.');
    const uniqueNumbers = new Set();

    while (uniqueNumbers.size < count)
      uniqueNumbers.add(Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber);

    return Array.from(uniqueNumbers);
  },
};

export default Random;
