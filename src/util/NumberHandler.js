const NumberHandler = {
  roundOffNumber(number) {
    return Math.round(number * 10) / 10;
  },

  generateRandomNumber(minRange, maxRange) {
    return Math.floor(Math.random() * maxRange - minRange) + minRange;
  },
};

export default NumberHandler;
