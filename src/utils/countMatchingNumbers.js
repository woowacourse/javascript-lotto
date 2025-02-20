const countMatchingNumbers = (referenceArray, checkingArray) => {
  return checkingArray.filter((number) => referenceArray.includes(number))
    .length;
};

export default countMatchingNumbers;
