const generateRandomNumbersIn = (min, max) => (count) => () => {
  if (count > max - min + 1) {
    throw new Error('\n[ERROR] 생성할 로또번호 개수가 지정한 범위보다 큽니다. \n');
  }

  return new Array(max - min + 1)
    .fill()
    .map((_, index) => min + index)
    .sort(() => Math.random() - 0.5)
    .slice(0, count)
    .sort((a, b) => a - b);
};

export default generateRandomNumbersIn;
