function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomNumbers(min, max, count) {
  if (max - min < count)
    throw new Error("[ERROR] 랜덤 숫자 배열의 범위가 잘못되었습니다.");

  const uniqueNumbers = new Set();

  while (uniqueNumbers.size < count) {
    uniqueNumbers.add(generateRandomNumber(min, max));
  }

  return [...uniqueNumbers];
}

// NOTE: const만 사용하며 내장 함수만 활용하기 위해 for문을 O(2n)의 시간복잡도로 구현하는 것이 맞는지, 혹은 let을 사용하더라도 O(n)의 시간복잡도로 끝내는 것이 맞는지 궁금합니다.
