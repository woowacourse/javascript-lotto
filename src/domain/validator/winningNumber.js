import { ERROR_MESSAGE } from '../../constants/error';
import { LOTTO } from '../../constants/setting';

const isValidLength = (lottoNumbers) => lottoNumbers.length === LOTTO.SIZE;
const hasDuplicatedNumber = (lottoNumbers) => lottoNumbers.length !== new Set(lottoNumbers).size;

const validateWinningNumber = (winningNumber) => {
  if (!isValidLength(winningNumber)) {
    throw new Error(ERROR_MESSAGE.INVALID_LOTTO_SIZE);
  }
  if (hasDuplicatedNumber(winningNumber)) {
    throw new Error(ERROR_MESSAGE.DUPLICATED_NUMBER);
  }
};

export default validateWinningNumber;
