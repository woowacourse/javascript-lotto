const numberHandler = {
  generateRandomNumber(minRange, maxRange) {
    return Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
  },

  getQuotient(target, divider) {
    return parseInt(target / divider, 10);
  },

  roundOffNumber(number) {
    return Math.round(number * 10) / 10;
  },

  addComma(number) {
    return number.toLocaleString('en-US');
  },
};

export default numberHandler;
