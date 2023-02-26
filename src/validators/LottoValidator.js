import { LOTTO } from '../constants';
import Validation from '../util/Validation';

const LottoValidator = {
  checkLottoNumbers(lottoNumbers) {
    if (!Validation.isValidLengthWithCount(lottoNumbers, LOTTO.NUMBER_COUNT))
      throw new Error(`[ERROR] 로또 번호는 ${LOTTO.NUMBER_COUNT}개 입니다.`);

    if (!this.isValidRangeLottoNumbers(lottoNumbers))
      throw new Error(
        `[ERROR] 로또 번호는 ${LOTTO.MIN_NUMBER} ~ ${LOTTO.MAX_NUMBER}까지의 숫자만 입력 가능합니다.`
      );

    if (Validation.hasDuplicatedNumber(lottoNumbers))
      throw new Error('[ERROR] 로또 번호는 중복 될 수 없습니다.');
  },

  checkBonusNumber(winningNumber, bonusNumber) {
    if (!Validation.isNumber(bonusNumber))
      throw new Error('[ERROR] 보너스 번호는 자연수로만 입력해야 합니다.');

    if (!this.isRangeOfLottoNumber(bonusNumber))
      throw new Error(
        `[ERROR] 보너스 번호는 ${LOTTO.MIN_NUMBER} ~ ${LOTTO.MAX_NUMBER}까지의 숫자만 입력 가능합니다.`
      );

    if (Validation.isIncludedNumber(winningNumber, Number(bonusNumber)))
      throw new Error('[ERROR] 보너스 번호는 당첨 번호와 중복되지 않아야 합니다.');
  },

  isValidRangeLottoNumbers(numbers) {
    return numbers.every((number) => this.isRangeOfLottoNumber(number));
  },

  isRangeOfLottoNumber(number) {
    return number >= LOTTO.MIN_NUMBER && number <= LOTTO.MAX_NUMBER;
  },
};

export default LottoValidator;
