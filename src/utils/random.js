const Random = {
  pickUniqueNumbersInRange({ minNumber, maxNumber, count = 1 }) {
    if (count > maxNumber - minNumber + 1) throw new Error('Cannot generate unique numbers. Count exceeds range.');
    const arr = Array.from({ length: maxNumber - minNumber + 1 }, (_, index) => index + minNumber);

    return arr.toSorted(() => Math.random() - 0.5).slice(0, count);
  },
};

export default Random;
