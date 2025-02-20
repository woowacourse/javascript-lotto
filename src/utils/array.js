export const getIntersection = (array1, array2) => {
  if (!Array.isArray(array1) || !Array.isArray(array2)) {
    throw new Error("인자가 배열이 아닙니다.");
  }

  const uniqueSet = new Set(array2);
  return array1.filter((value) => uniqueSet.has(value));
};
