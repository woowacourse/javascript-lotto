import { ERROR_MESSAGES, NUMBER_DELIMITER } from '../constants';
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
  isDefinedInputValue,
} from '../utils';

const Validator = {
  /**
   * 당첨 번호 입력에 대한 유효성 검사
   * @param {string} numbersInput
   */
  checkWinningLottoNumbers(numbersInput) {
    this.private_checkDefinedInputValue(numbersInput);

    if (!isValidWinningNumbersForm(numbersInput))
      throw new Error(ERROR_MESSAGES.inValidWInningNumbersForm);

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
    this.private_checkDefinedInputValue(bonusNumberInput);

    const bonusNumber = Number(bonusNumberInput);

    this.private_checkLottoNumber(bonusNumber);

    if (!isNotInLottoNumber(lottoNumbers, bonusNumber)) {
      throw new Error(ERROR_MESSAGES.alreadyInLottoNumber);
    }
  },

  /**
   * 구입 금액 입력에 대한 유효성 검사
   * @param {string} numberInput
   */
  checkPaymentAmount(numberInput) {
    this.private_checkDefinedInputValue(numberInput);

    const number = Number(numberInput);

    if (!isInteger(number)) throw new Error(ERROR_MESSAGES.notInteger);

    if (!isDivisibleByPrice(number))
      throw new Error(ERROR_MESSAGES.inDivisibleByPrice);

    if (!isValidNumbersOfTickets(number))
      throw new Error(ERROR_MESSAGES.inValidNumbersOfTickets);
  },

  checkRestartForm(restartInput) {
    this.private_checkDefinedInputValue(restartInput);

    if (!isValidRestartInputForm(restartInput))
      throw new Error(ERROR_MESSAGES.invalidRestartInputForm);
  },
  /**
   * 입력값이 존재하는 지 여부 검사
   * @param {string} inputValue
   */
  private_checkDefinedInputValue(inputValue) {
    if (!isDefinedInputValue(inputValue))
      throw new Error(ERROR_MESSAGES.isUndefinedInputValue);
  },
  /**
   * 당첨 번호에 대한 유효성 검사
   * @param {number[]} numbers
   */
  private_checkLottoNumbers(numbers) {
    numbers.forEach((number) => this.private_checkLottoNumber(number));

    if (!isValidLottoNumberCount(numbers))
      throw new Error(ERROR_MESSAGES.invalidLottoNumberCount);

    if (!isNotDuplicatedLottoNumber(numbers))
      throw new Error(ERROR_MESSAGES.duplicatedLottoNumber);
  },

  /**
   * Lotto 번호에 대한 유효성 검사
   * @param {number} number
   */
  private_checkLottoNumber(number) {
    if (!isInteger(number)) throw new Error(ERROR_MESSAGES.notInteger);

    if (!isLottoNumberInRange(number))
      throw new Error(ERROR_MESSAGES.invalidLottoNumberRange);
  },
};

export default Validator;
