const random = {
  RandomMinMax(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
};

module.exports = random;
