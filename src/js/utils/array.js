export const shuffleNumber = (array) => [...array].sort(() => Math.random() - 0.5);

export const findEqualElementsLength = (array1, array2) => {
  const mergedArray = array1.concat(array2);
  const equalElements = mergedArray.filter((item) => array1.includes(item) && array2.includes(item));
  const deduplicatedEqualElements = [...new Set(equalElements)];

  return deduplicatedEqualElements.length;
};
