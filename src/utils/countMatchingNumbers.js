const countMatchingNumbers = (winningNumbers, userNumbers) => {
  return userNumbers.filter((number) => winningNumbers.includes(number)).length;
};

export default countMatchingNumbers;
