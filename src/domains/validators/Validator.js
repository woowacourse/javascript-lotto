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
  /**
   * 당첨 번호 입력에 대한 유효성 검사
   * @param {string} numbersInput
   */
  checkWinningLottoNumbers(numbersInput) {
    if (!isValidWinningNumbersForm(numbersInput))
      throw new Error('유효하지 않은 당첨 번호 입력');

    const numbers = numbersInput.split(',');
    this.private_checkLottoNumbers(numbers);
  },

  /**
   * 보너스 번호 입력에 대한 유효성 검사
   * @param {number[]} lottoNumbers
   * @param {string} bonusNumberInput
   */
  checkBonusNumber(lottoNumbers, bonusNumberInput) {
    const bonusNumber = Number(bonusNumberInput);

    this.private_checkLottoNumber(bonusNumber);

    if (!isNotInLottoNumber(lottoNumbers, bonusNumber)) {
      throw new Error('이미 있는 번호임');
    }
  },

  /**
   * 구입 금액 입력에 대한 유효성 검사
   * @param {string} numberInput
   */
  checkPaymentAmount(numberInput) {
    const number = Number(numberInput);

    if (!isInteger(number)) throw new Error('정수가 아닙니다.');

    if (!isDivisibleByPrice(number)) throw new Error('1000원 단위가 아닙니다.');

    if (!isValidNumbersOfTickets(number))
      throw new Error('구매할 수 없는 티켓 개수');
  },

  /**
   * 당첨 번호에 대한 유효성 검사
   * @param {number[]} numbers
   */
  private_checkLottoNumbers(numbers) {
    numbers.forEach((number) => this.private_checkLottoNumber(number));

    if (!isValidLottoNumberCount(numbers))
      throw new Error('로또 번호 개수 에러');

    if (!isNotDuplicatedLottoNumber(numbers))
      throw new Error('중복된 번호 있음');
  },

  /**
   * Lotto 번호에 대한 유효성 검사
   * @param {number} number
   */
  private_checkLottoNumber(number) {
    if (!isInteger(number)) throw new Error('정수가 아닙니다.');

    if (!isLottoNumberInRange(number)) throw new Error('범위 초과');
  },
};

export default Validator;
