const inputValidator = {
  isNumber: (number) => Number.isInteger(number),
  isNumberInLottoRange: (number) => {
    const LOTTO_START = 1;
    const LOTTO_END = 45;
    return number <= LOTTO_END && number >= LOTTO_START;
  },
  isUniqueArray: (array) => {
    const set = new Set(array);
    return set.size === array.length;
  },
};

const pickRandomNumberInRange = (start, end) => {
  return (
    Math.floor(Math.random() * (end + 1 - Math.ceil(start))) + Math.ceil(start)
  );
};

const addCommaToNumber = (number) => {
  const COUNTRY = 'en-US';
  return number.toLocaleString(COUNTRY, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  });
};

module.exports = {
  addCommaToNumber,
  pickRandomNumberInRange,
  inputValidator,
};
