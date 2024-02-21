import Console from '../utils/console.js';
import { deepFreeze } from '../utils/object/object.js';

import { INPUT_MESSAGE } from '../constants/messages/messages.js';

import {
  BuyLottoPriceValidator,
  CommonValidator,
  WinningNumberValidator,
  BonusNumberValidator,
} from '../validator/index.js';

import { SYMBOLS } from '../constants/symbols.js';

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
   * @returns {number[]} 검증된 구매 로또 금액의 Promise
   */
  async readWinningNumber() {
    const inputWinningNumber = await this.read(INPUT_MESSAGE.winningNumber);
    WinningNumberValidator.check(inputWinningNumber);

    return inputWinningNumber.split(SYMBOLS.comma).map(Number);
  },

  async readBonusNumber(winningNumber) {
    const inputBonusNumber = await this.read(INPUT_MESSAGE.bonusNumber);
    BonusNumberValidator.check(inputBonusNumber, winningNumber);

    return Number(inputBonusNumber);
  },
});

export default InputView;
