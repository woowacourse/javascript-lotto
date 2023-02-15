const NumberHandler = {
  roundOffNumber(number) {
    return Math.round(number * 10) / 10;
  },

  generateRandomNumber(minRange, maxRange) {
    return Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
  },

  addComma(number) {
    return number.toLocaleString('en-US');
  },

  getQuotient(target, divider) {
    return parseInt(target / divider, 10);
  },
};

export default NumberHandler;
