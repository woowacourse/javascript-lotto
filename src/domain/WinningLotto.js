import CustomError from "../error/CustomError.js";
import ERROR_MESSAGE from "../error/errorMessage.js";

class WinningLotto {
  #numbers;

  #bonusNumber;

  constructor(numbers) {
    this.#numbers = numbers;
  }

  setBonusNumber(bonusNumber) {
    this.#checkHaveBonus(bonusNumber.get());

    this.#bonusNumber = bonusNumber;
  }

  #checkHaveBonus(bonusNumber) {
    const hasBonusNumber = this.#numbers
      .get()
      .some((num) => num === bonusNumber);

    if (hasBonusNumber)
      throw new CustomError(ERROR_MESSAGE.bonusNumberOverlapped);
  }

  getBonusNumber() {
    return this.#bonusNumber.get();
  }

  get() {
    return [...this.#numbers.get()];
  }
}

export default WinningLotto;
