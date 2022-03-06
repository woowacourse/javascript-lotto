export const shuffleNumber = (array) => [...array].sort(() => Math.random() - 0.5);

export const findEqualElementsLength = (array1, array2) => {
  const meregedArray = array1.concat(array2);
  const equalElements = meregedArray.filter((item) => array1.includes(item) && array2.includes(item));
  const deduplicatedEqualElements = [...new Set(equalElements)];

  return deduplicatedEqualElements.length;
};
