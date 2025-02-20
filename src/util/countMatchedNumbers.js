function countMatchedNumbers(arrA, arrB) {
  return arrA.filter((number) => arrB.includes(number)).length;
}

export default countMatchedNumbers;
