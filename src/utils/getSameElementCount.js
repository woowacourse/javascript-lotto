const getSameElementCount = (arr1, arr2) => {
  const set = new Set(arr1);
  return arr2.reduce((acc, data) => (set.has(data) ? acc + 1 : acc), 0);
};

export default getSameElementCount;
