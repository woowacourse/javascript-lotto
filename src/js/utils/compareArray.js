const returnSameNumberCount = (array1, array2) =>
  array1.filter((element) => array2.includes(element)).length;

export default returnSameNumberCount;
