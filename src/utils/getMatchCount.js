function getMatchCount(arr1, arr2) {
  const uniqueArr = new Set([...arr1, ...arr2]);

  const totalLength = arr1.length + arr2.length;

  return totalLength - uniqueArr.size;
}

export default getMatchCount;
