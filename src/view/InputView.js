import Console from '../util/Console.js';
import InputValidator from './InputValidator.js';
import QUERY from '../constant/query.js';

const InputView = (function () {
  return {
    async readLottoPrice({ onError } = { onError: null }) {
      const lottoPrice = await Console.readline(QUERY.LOTTO_PRICE);

      return await InputValidator.readLottoPrice(lottoPrice, {
        onError: onError ?? this.readLottoPrice,
      });
    },

    async readLuckyNumbers({ onError } = { onError: null }) {
      const luckyNumbersString = await Console.readline(QUERY.LUCKY_NUMBERS);

      return await InputValidator.readLuckyNumbers(luckyNumbersString, {
        onError: onError ?? this.readLuckyNumbers,
      });
    },

    async readBonusNumber(luckyNumbers, { onError } = { onError: null }) {
      const bonusNumber = await Console.readline(QUERY.BONUS_NUMBER);

      return await InputValidator.readBonusNumber(bonusNumber, luckyNumbers, {
        onError: onError ?? this.readBonusNumber,
      });
    },

    async readRetryCommand({ onError } = { onError: null }) {
      const retryCommand = await Console.readline(QUERY.RETRY);

      return await InputValidator.readRetryCommand(retryCommand, {
        onError: onError ?? this.readRetryCommand,
      });
    },
  };
})();

export default InputView;
