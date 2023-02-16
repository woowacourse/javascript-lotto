const Converter = {
  sortAscending(array) {
    return array.sort((a, b) => a - b);
  },

  toFixedNumber(number, pointNumber) {
    return Number(
      (+(Math.round(number + `e+${pointNumber}`) + `e-${pointNumber}`)).toFixed(pointNumber)
    );
  },
};

module.exports = Converter;
