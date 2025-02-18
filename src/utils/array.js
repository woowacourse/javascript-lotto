export const findMatchingValues = (array1, array2) => {
  return array1.filter((value) => array2.includes(value));
};
