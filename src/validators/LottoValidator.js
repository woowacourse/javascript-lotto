import Validation from '../util/Validation';

const LottoValidator = {
  checkLottoNumbers(lottoNumbers) {
    if (!Validation.isValidLengthWithCount(lottoNumbers, 6))
      throw new Error('[ERROR] 로또 번호는 6개 입니다.');
    if (!this.isValidRangeLottoNumbers(lottoNumbers))
      throw new Error('[ERROR] 로또 번호는 1 ~ 45까지의 숫자만 입력 가능합니다.');
    if (Validation.hasDuplicatedNumber(lottoNumbers))
      throw new Error('[ERROR] 로또 번호는 중복 될 수 없습니다.');
  },

  isValidRangeLottoNumbers(numbers) {
    return numbers.every((number) => this.isRangeOfLottoNumber(number));
  },

  isRangeOfLottoNumber(number) {
    return number >= 1 && number <= 45;
  },
};

export default LottoValidator;
