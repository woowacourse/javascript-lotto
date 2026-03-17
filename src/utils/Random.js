function pickUniqueNumbersInRange(startInclusive, endInclusive, count) {
  validateRange(startInclusive, endInclusive, count);

  const numbers = [];

  for (let i = startInclusive; i <= endInclusive; i++) {
    numbers.push(i);
  }

  shuffle(numbers);

  return numbers.slice(0, count);
}

function validateRange(startInclusive, endInclusive, count) {
  if (!Number.isInteger(startInclusive) || !Number.isInteger(endInclusive) || !Number.isInteger(count)) {
    throw new Error("숫자는 정수여야 합니다.");
  }

  if (startInclusive > endInclusive) {
    throw new Error("시작값은 끝값보다 클 수 없습니다.");
  }

  if (count < 0) {
    throw new Error("count는 0보다 작을 수 없습니다.");
  }

  if (endInclusive - startInclusive + 1 < count) {
    throw new Error("추출 개수가 범위를 초과했습니다.");
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

export default pickUniqueNumbersInRange;
