export function pickUniqueNumbersInRange(startInclusive, endInclusive, count) {
  if (![startInclusive, endInclusive, count].every(Number.isInteger)) {
    throw new Error("시작값, 끝값, 개수는 모두 정수여야 합니다.");
  }

  if (count < 0) {
    throw new Error("개수는 0보다 작을 수 없습니다.");
  }

  const rangeSize = endInclusive - startInclusive + 1;

  if (rangeSize < count) {
    throw new Error("개수는 전체 범위보다 클 수 없습니다.");
  }

  const numbers = Array.from({ length: rangeSize }, (_, index) => startInclusive + index);

  for (let index = numbers.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [numbers[index], numbers[randomIndex]] = [numbers[randomIndex], numbers[index]];
  }

  return numbers.slice(0, count);
}
