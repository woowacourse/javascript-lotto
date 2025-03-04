export const getIntersection = (array1, array2) => {
  const arraySet = new Set(array2);
  return array1.filter((value) => arraySet.has(value));
};
