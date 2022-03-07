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

export function pickUniqueNumbersInRange(startInclusive, endInclusive, count) {
  const numbers = Array.from(
    { length: endInclusive - startInclusive + 1 },
    (v, i) => i + startInclusive
  );

  return shuffle(numbers).slice(0, count);
}

export function intersection(arrayA, arrayB) {
  return arrayA.filter((value) => arrayB.includes(value));
}

export function calculateEarningsRate(originMoney, currentMoney) {
  return ((currentMoney - originMoney) / originMoney) * 100;
}
