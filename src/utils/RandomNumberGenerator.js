const {
  LOTTO_NUMBER_RANGE,
  LOTTO_NUMBER_COUNT,
} = require('../constants/constants');

const generateRandomLotto = () => {
  const lottoNumbers = new Array(LOTTO_NUMBER_RANGE.MAX_LOTTO_NUMBER)
    .fill()
    .map((_, index) => index + 1);
  lottoNumbers.sort(() => Math.random() - 0.5);

  return lottoNumbers.slice(0, LOTTO_NUMBER_COUNT).sort((a, b) => a - b);
};

module.exports = { generateRandomLotto };
