import { ERROR_MESSAGES, NUMBER_DELIMITER } from '../constants';
import { checkDefinedInputValue, isValidWinningNumbersForm } from '../utils';
import Lotto from './Lotto';

// 역할 : 당첨 번호 입력값-> 유효성 검사 -> 당첨 번호 생성
// 보너스를 파라미터로 받아서 당첨 번호와 로또 번호를 비교한  일치 개수 반환
class WinningLotto {
  /**
   * @property {number[]}
   */
  #lottoNumbers = [];

  /**
   * @param {string} lottoNumbersInput
   */
  constructor(lottoNumbersInput) {
    this.#validateWinningLottoNumbers(lottoNumbersInput);
  }

  // set lottoNumbers(lottoNumbersInput) {
  //   Validator.checkWinningLottoNumbers(lottoNumbersInput);

  //   this.#lottoNumbers = lottoNumbersInput
  //     .split(NUMBER_DELIMITER)
  //     .map((lottoNumberInput) => Number(lottoNumberInput));
  // }

  // set bonus(bonusNumberInput) {
  //   Validator.checkBonusNumber(this.#lottoNumbers, bonusNumberInput);
  //   this.#bonus = Number(bonusNumberInput);
  // }

  /**
   *  @param {number[]} lottoNumbers
   * @param {Bonus} bonus
   */
  compareLotto(lottoNumbers, bonus) {
    return {
      isBonus: bonus.isMatchingNumber(lottoNumbers),
      matchedCount: this.#countMatchedNumber(lottoNumbers),
    };
  }

  /**
   *  @param {number[]} lottoNumbers
   */
  #countMatchedNumber(lottoNumbers) {
    return lottoNumbers.filter((number) => this.#lottoNumbers.includes(number))
      .length;
  }

  #validateWinningLottoNumbers(lottoNumbersInput) {
    checkDefinedInputValue(lottoNumbersInput);

    if (!isValidWinningNumbersForm(lottoNumbersInput))
      throw new Error(ERROR_MESSAGES.inValidWInningNumbersForm);

    const numbers = lottoNumbersInput
      .split(NUMBER_DELIMITER)
      .map((value) => Number(value));

    this.#lottoNumbers = new Lotto(numbers).numbers;
  }
}

export default WinningLotto;
