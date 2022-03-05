export const shuffleNumber = (array) => [...array].sort(() => Math.random() - 0.5);

export const findSameElementLength = (array1, array2) => {
  return [
    ...new Set(
      array1.concat(array2).filter((item) => array1.includes(item) && array2.includes(item))
    ),
  ].length;
};
