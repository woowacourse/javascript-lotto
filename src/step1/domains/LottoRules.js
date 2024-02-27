import { ERROR_MESSAGES } from "../constants/message";
import InvalidInputException from "../exceptions/InvalidInputException";

class LottoRules {
  #price;
  #maxQuantity;
  #lottoLength;
  #minNumber;
  #maxNumber;
  #exchangeRank;
  #rewardInfo;

  constructor({
    price,
    maxQuantity,
    lottoLength,
    minNumber,
    maxNumber,
    rewardInfo,
    exchangeRank,
  }) {
    this.#price = price;
    this.#maxQuantity = maxQuantity;
    this.#lottoLength = lottoLength;
    this.#minNumber = minNumber;
    this.#maxNumber = maxNumber;
    this.#rewardInfo = rewardInfo;
    this.#exchangeRank = exchangeRank;
  }

  validateForLotto(numbers) {
    this.#validateLottoNumbersType(numbers);
    this.#validateLottoLength(numbers);
    this.#validateLottoUniqueness(numbers);
  }

  validateForAmount(amount) {
    this.#validateAmountType(amount);
    this.#validateAmountDivision(amount);
    this.#validateQuantity(amount);
  }

  validateForBonusNumber(winningLotto, bonusNumber) {
    if (!this.#isInRangeNumber(bonusNumber)) {
      throw new InvalidInputException(ERROR_MESSAGES.invalidBonusNumberType);
    }
    this.#validateDuplication(winningLotto, bonusNumber);
  }

  getLottoPrice() {
    return this.#price;
  }

  getLottoLength() {
    return this.#lottoLength;
  }

  getMinNumber() {
    return this.#minNumber;
  }

  getMaxNumber() {
    return this.#maxNumber;
  }

  getRankInfo() {
    return Object.keys(this.#rewardInfo);
  }

  checkRank(matchedInfo) {
    return this.#exchangeRank(matchedInfo);
  }

  checkReward(rank) {
    return this.#rewardInfo[rank];
  }

  #isInRangeNumber(number) {
    return (
      Number(number) >= this.#minNumber && Number(number) <= this.#maxNumber
    );
  }

  #validateLottoNumbersType(numbers) {
    if (
      !Array.isArray(numbers) ||
      !numbers.every((number) => this.#isInRangeNumber(number))
    ) {
      throw new InvalidInputException(ERROR_MESSAGES.invalidNumbersType);
    }
  }

  #validateLottoLength(numbers) {
    if (numbers.length !== this.#lottoLength) {
      throw new InvalidInputException(ERROR_MESSAGES.invalidLottoLength);
    }
  }

  #validateLottoUniqueness(numbers) {
    if (new Set(numbers).size !== numbers.length) {
      throw new InvalidInputException(ERROR_MESSAGES.invalidLottoUniqueness);
    }
  }

  #validateAmountType(amount) {
    const regex = /^[1-9]\d*$/;
    if (!regex.test(amount)) {
      throw new InvalidInputException(ERROR_MESSAGES.invalidPurchaseAmount);
    }
  }

  #validateAmountDivision(amount) {
    if (amount % this.#price !== 0) {
      throw new InvalidInputException(ERROR_MESSAGES.invalidPurchaseAmount);
    }
  }

  #validateQuantity(amount) {
    if (amount > this.#maxQuantity * this.#price) {
      throw new InvalidInputException(ERROR_MESSAGES.invalidPurchaseQuantity);
    }
  }

  #validateDuplication(winningLotto, bonusNumber) {
    const numericBonusNumber = Number(bonusNumber);
    if (winningLotto.hasNumber(numericBonusNumber)) {
      throw new InvalidInputException(
        ERROR_MESSAGES.invalidBonusNumberUniqueness
      );
    }
  }
}

export default LottoRules;
