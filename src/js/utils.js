export const pickNumberInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const pickUniqueNumbersInRange = (startInclusive, endInclusive, count) => {
  const numSet = new Set([pickNumberInRange(startInclusive, endInclusive)]);

  while (numSet.size < count) {
    numSet.add(pickNumberInRange(startInclusive, endInclusive));
  }

  return [...numSet.values()];
};
