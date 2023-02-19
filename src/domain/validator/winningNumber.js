const { ERROR_MESSAGE } = require('../../constant/message');
const { LOTTO } = require('../../constant/setting');

const isValidLength = (lottoNumbers) => lottoNumbers.length === LOTTO.SIZE;
const hasDuplicatedNumber = (lottoNumbers) => lottoNumbers.length !== new Set(lottoNumbers).size;

const validateWinningNumber = (winningNumber) => {
  if (!isValidLength(winningNumber)) {
    throw new Error(ERROR_MESSAGE.INVALID_WINNING_NUMBER_LENGTH);
  }
  if (hasDuplicatedNumber(winningNumber)) {
    throw new Error(ERROR_MESSAGE.DUPLICATED_NUMBER);
  }
};

module.exports = validateWinningNumber;
