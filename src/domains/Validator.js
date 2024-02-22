import { ERROR_MESSAGE, NUMBER_DELIMITER } from '../constants';
import {
  isDivisibleByPrice,
  isNotDuplicatedLottoNumber,
  isInteger,
  isLottoNumberInRange,
  isNotInLottoNumber,
  isValidLottoNumberCount,
  isValidNumbersOfTickets,
  isValidWinningNumbersForm,
  isValidRestartInputForm,
} from '../utils';

const Validator = {
  /**
   * 당첨 번호 입력에 대한 유효성 검사
   * @param {string} numbersInput
   */
  checkWinningLottoNumbers(numbersInput) {
    if (!isValidWinningNumbersForm(numbersInput))
      throw new Error(ERROR_MESSAGE.inValidWInningNumbersForm);

    const numbers = numbersInput
      .split(NUMBER_DELIMITER)
      .map((value) => Number(value));

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
      throw new Error(ERROR_MESSAGE.alreadyInLottoNumber);
    }
  },

  /**
   * 구입 금액 입력에 대한 유효성 검사
   * @param {string} numberInput
   */
  checkPaymentAmount(numberInput) {
    const number = Number(numberInput);

    if (!isInteger(number)) throw new Error(ERROR_MESSAGE.notInteger);

    if (!isDivisibleByPrice(number))
      throw new Error(ERROR_MESSAGE.inDivisibleByPrice);

    if (!isValidNumbersOfTickets(number))
      throw new Error(ERROR_MESSAGE.inValidNumbersOfTickets);
  },

  checkRestartForm(restartInput) {
    if (!isValidRestartInputForm(restartInput))
      throw new Error(ERROR_MESSAGE.invalidRestartInputForm);
  },

  /**
   * 당첨 번호에 대한 유효성 검사
   * @param {number[]} numbers
   */
  private_checkLottoNumbers(numbers) {
    numbers.forEach((number) => this.private_checkLottoNumber(number));

    if (!isValidLottoNumberCount(numbers))
      throw new Error(ERROR_MESSAGE.invalidLottoNumberCount);

    if (!isNotDuplicatedLottoNumber(numbers))
      throw new Error(ERROR_MESSAGE.duplicatedLottoNumber);
  },

  /**
   * Lotto 번호에 대한 유효성 검사
   * @param {number} number
   */
  private_checkLottoNumber(number) {
    if (!isInteger(number)) throw new Error(ERROR_MESSAGE.notInteger);

    if (!isLottoNumberInRange(number))
      throw new Error(ERROR_MESSAGE.invalidLottoNumberRange);
  },
};

export default Validator;
