const inputUtils = {
  formatLuckyNumbers(luckyNumbersString) {
    return luckyNumbersString
      .split(',')
      .map(luckyNumber => parseInt(luckyNumber.trim(), 10));
  },
};

export default inputUtils;
