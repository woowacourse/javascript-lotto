const RandomNumberGenerator = {
  generateNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  },
};

export { RandomNumberGenerator };
