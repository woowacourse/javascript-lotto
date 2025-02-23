export function generateRandomNumber(start, end) {
  return Math.floor(Math.random() * (end + 1 - start)) + start;
}

export function generateUniqueRandomValue(array, { start, end }) {
  const randomNumber = generateRandomNumber(start, end);
  if (array.includes(randomNumber)) return generateUniqueRandomValue(array, { start, end });

  return randomNumber;
}

export function generateUniqueNumbers({ start, end }, length) {
  return new Array(length).fill(null).reduce((prev) => {
    const uniqueRandomValue = generateUniqueRandomValue(prev, { start, end });
    return [...prev, uniqueRandomValue];
  }, []);
}

export function checkUniqueArray(array) {
  return array.length === new Set(array).size;
}

export function getIntersectCount(array1, array2) {
  return array1.filter((value) => array2.includes(value)).length;
}
