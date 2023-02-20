const {
  lottoNumberRange,
  LOTTO_NUMBER_COUNT,
} = require("../constants/constants");

const randomNumberGenerator = {
  generateMinToMaxNumbers() {
    const lottoNumbers = new Array(
      lottoNumberRange.MAX_LOTTO_NUMBER - lottoNumberRange.MIN_LOTTO_NUMBER + 1
    )
      .fill(0)
      .map((_, index) => index + lottoNumberRange.MIN_LOTTO_NUMBER);

    return lottoNumbers;
  },

  generateLottoNumbers() {
    const lottoNumbers = this.generateMinToMaxNumbers();

    lottoNumbers.sort(() => Math.random() - 0.5);

    return lottoNumbers.slice(0, LOTTO_NUMBER_COUNT).sort((a, b) => a - b);
  },
};

module.exports = { randomNumberGenerator };
