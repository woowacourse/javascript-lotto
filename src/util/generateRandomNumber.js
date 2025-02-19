function createNumberArray(min, max) {
  return Array.from({ length: max - min + 1 }, (_, i) => i + min);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function getUniqueRandomNumbers(numberRange, count) {
  const { min, max } = numberRange;
  const numbers = createNumberArray(min, max);
  const shuffled = shuffleArray(numbers);
  return shuffled.slice(0, count);
}

// const sets = Array.from({ length: 6 }, () => getUniqueRandomNumbers(1, 45, 6));
