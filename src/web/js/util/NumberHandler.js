const NumberHandler = (function () {
  return {
    generateRandomNumber(minRange, maxRange) {
      return Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
    },

    getQuotient(target, divider) {
      return parseInt(target / divider, 10);
    },

    roundOff(value) {
      return Math.round(value * 10) / 10;
    },
  };
})();

export default NumberHandler;
