import { ERROR_MESSAGE } from '../../constant/console/message';
import validateLottoNumber from './lottoNumber';

const isIncludeWinningNumber = (bonusNumber, winningNumber) => winningNumber.includes(bonusNumber);

const validateBonusNumber = (bonusNumber, winningNumber) => {
  validateLottoNumber(bonusNumber);

  if (isIncludeWinningNumber(bonusNumber, winningNumber)) {
    throw new Error(ERROR_MESSAGE.INCLUDES_WINNING_NUMBER);
  }
};

export default validateBonusNumber;
