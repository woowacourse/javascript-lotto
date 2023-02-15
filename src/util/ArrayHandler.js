const ArrayHandler = {
  getMatchCount(numbers, targetNumbers) {
    return numbers.filter((number) => targetNumbers.includes(number)).length;
  },

  sortAscendingOrder(numbers) {
    return [...numbers.sort((a, b) => a - b)];
  },
};

export default ArrayHandler;
