const NumberHandler = {
  getMatchCount(numbers, targetNumbers) {
    return numbers.filter((number) => targetNumbers.includes(number)).length;
  },
};

export default NumberHandler;
