function shuffle(array) {
  const originArray = array;
  const newArray = [];

  while (originArray.length) {
    const lastIdx = originArray.length - 1;
    const randomIdx = Math.floor(Math.random() * originArray.length);
    [originArray[lastIdx], originArray[randomIdx]] = [originArray[randomIdx], originArray[lastIdx]];
    newArray.push(originArray.pop());
  }

  return newArray;
}

export default function pickUniqueNumbersInRange(startInclusive, endInclusive, count) {
  const numbers = Array.from(
    { length: endInclusive - startInclusive + 1 },
    (v, i) => i + startInclusive
  );

  return shuffle(numbers).slice(0, count);
}
