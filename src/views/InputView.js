import { INPUT_MESSAGE } from '../constants/messages/messages.js';

import Console from '../utils/console.js';
import { deepFreeze } from '../utils/object/object.js';

import {
  BuyLottoPriceValidator,
  CommonValidator,
  WinningNumbersValidator,
  BonusNumberValidator,
} from '../validator/index.js';

import { SYMBOLS } from '../constants/symbols.js';
import RetryCommandValidator from '../validator/retryCommand/RetryCommandValidator.js';

/**
 * @module InputView
 * 자동차 경주 게임에 대한 사용자 입력을 처리하는 모듈
 */
const InputView = deepFreeze({
  /**
   * @param {string} message - 사용자에게 표시할 입력 안내 메시지
   * @returns {Promise<string>} 검증된 사용자 입력 값의 Promise
   */
  async read(message) {
    const inputValue = await Console.readLineAsync(message);
    CommonValidator.check(inputValue);

    return inputValue;
  },

  /**
   * @returns {Promise<number>} 검증된 구매 로또 금액의 Promise
   */
  async readBuyLottoPrice() {
    const inputBuyLottoPrice = await this.read(INPUT_MESSAGE.buyLottoPrice);
    BuyLottoPriceValidator.check(inputBuyLottoPrice);

    return Number(inputBuyLottoPrice);
  },

  /**
   * @returns {Promise<number[]>} 검증된 구매 로또 금액의 Promise
   */
  async readWinningNumbers() {
    const inputWinningNumbers = await this.read(INPUT_MESSAGE.winningNumbers);
    WinningNumbersValidator.check(inputWinningNumbers);

    return inputWinningNumbers.split(SYMBOLS.comma).map(Number);
  },

  /**
   * @param {number[]} winningNumbers - 당첨 번호의 string 형태
   * @returns {Promise<number>} 유효성 검증이 완료 된 보너스 번호의 Promise
   */
  async readBonusNumber(winningNumbers) {
    const inputBonusNumber = await this.read(INPUT_MESSAGE.bonusNumber);
    BonusNumberValidator.check(inputBonusNumber, winningNumbers);

    return Number(inputBonusNumber);
  },

  /**
   * @returns {Promise<string>} - 입력된 재시작 여부 (y/n)
   */
  async readRetryCommand() {
    const inputRetryCommand = await this.read(INPUT_MESSAGE.retryCommand);
    RetryCommandValidator.check(inputRetryCommand);

    return inputRetryCommand;
  },
});

export default InputView;
