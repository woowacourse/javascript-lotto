const getSameElementCount = (arr1, arr2) => {
  const set = new Set(arr1);
  const sameElementList = arr2.filter((data) => set.has(data));
  return sameElementList.length;
};

export default getSameElementCount;
