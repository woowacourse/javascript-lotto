const countMatchingNumbers = (referenceArray, testArray) => {
  return testArray.filter((number) => referenceArray.includes(number)).length;
};

export default countMatchingNumbers;
