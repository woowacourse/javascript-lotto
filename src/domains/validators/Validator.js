import {
  isDivisibleByPrice,
  isNotDuplicatedLottoNumber,
  isInteger,
  isLottoNumberInRange,
  isNotInLottoNumber,
  isValidLottoNumberCount,
  isValidNumbersOfTickets,
  isValidWinningNumbersForm,
} from './utils';

const Validator = {
  validateRandomNumber(number) {
    if (!isInteger(number)) throw new Error('정수가 아닙니다.');

    if (!isLottoNumberInRange(number)) throw new Error('범위 초과');
  },

  validateWinningNumbersForm(numbersInput) {
    if (!isValidWinningNumbersForm(numbersInput))
      throw new Error('유효하지 않은 당첨 번호 입력');
  },

  validateLottoTickets(numbers) {
    numbers.forEach((number) => this.validateRandomNumber(number));

    if (!isValidLottoNumberCount(numbers))
      throw new Error('로또 번호 개수 에러');

    if (!isNotDuplicatedLottoNumber(numbers))
      throw new Error('중복된 번호 있음');
  },

  validateBonusNumber(lottoNumbers, bonusNumber) {
    this.validateRandomNumber(bonusNumber);

    if (!isNotInLottoNumber(lottoNumbers, bonusNumber)) {
      throw new Error('이미 있는 번호임');
    }
  },

  validatePaymentAmount(numberInput) {
    const number = Number(numberInput);

    if (!isInteger(number)) throw new Error('정수가 아닙니다.');

    if (!isDivisibleByPrice(number)) throw new Error('1000원 단위가 아닙니다.');

    if (!isValidNumbersOfTickets(number))
      throw new Error('구매할 수 없는 티켓 개수');
  },
};

export default Validator;
