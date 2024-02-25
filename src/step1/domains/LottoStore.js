import { ERROR_MESSAGES } from '../constants/message';
import LOTTO_RULES from '../constants/rules';
import InvalidInputException from '../exceptions/InvalidInputException';
import Lotto from './Lotto';

class LottoStore {
  static #validateAmountType(amount) {
    const regex = /^[1-9]\d*$/;
    if (!regex.test(amount)) {
      throw new InvalidInputException(ERROR_MESSAGES.invalidPurchaseAmount);
    }
  }

  static #validateAmountDivision(amount) {
    if (amount % LOTTO_RULES.price !== 0) {
      throw new InvalidInputException(ERROR_MESSAGES.invalidPurchaseAmount);
    }
  }

  static #validatePurchaseAmount(amount) {
    LottoStore.#validateAmountType(amount);
    LottoStore.#validateAmountDivision(amount);
  }

  static #pickRandomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min) + 1);
  }

  static #processLottoNumber(numbers, randomNumber) {
    if (numbers.includes(randomNumber)) return;

    numbers.push(randomNumber);
  }

  static #makeLottoNumbers() {
    const numbers = [];
    while (numbers.length < LOTTO_RULES.length) {
      const randomNumber = this.#pickRandomNumberInRange(LOTTO_RULES.minRandomNumber, LOTTO_RULES.maxRandomNumber);
      LottoStore.#processLottoNumber(numbers, randomNumber);
    }

    return numbers;
  }

  static purchaseLottos(amount) {
    const numericAmount = Number(amount);
    LottoStore.#validatePurchaseAmount(numericAmount);

    const lottoCount = numericAmount / LOTTO_RULES.price;
    const lottos = Array.from({ length: lottoCount }).map(() => {
      const lottoNumbers = this.#makeLottoNumbers();
      return new Lotto(lottoNumbers);
    });

    return lottos;
  }
}

export default LottoStore;
