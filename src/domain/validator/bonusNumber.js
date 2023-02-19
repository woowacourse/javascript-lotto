const { ERROR_MESSAGE } = require('../../constant/message');
const validateLottoNumber = require('./lottoNumber');

const isIncludeWinningNumber = (bonusNumber, winningNumber) => winningNumber.includes(bonusNumber);

const validateBonusNumber = (bonusNumber, winningNumber) => {
  validateLottoNumber(bonusNumber);

  if (isIncludeWinningNumber(bonusNumber, winningNumber)) {
    throw new Error(ERROR_MESSAGE.INCLUDES_WINNING_NUMBER);
  }
};

module.exports = validateBonusNumber;
