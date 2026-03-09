import { Validator } from "../validator/Validator.js";

class WinningLotto {
  #winningNumber;
  #bonusNumber;

  constructor(winningNumber, bonusNumber) {
    Validator.validateWinningNumber(winningNumber);
    Validator.validateBonusNumber(winningNumber, Number(bonusNumber));
    this.#winningNumber = this.#splitWinnigNumber(winningNumber);
    this.#bonusNumber = bonusNumber;
  }

  getRank(userLotto) {
    const matchCount = userLotto
      .getNumber()
      .filter((item) => this.#winningNumber.includes(item)).length;

    if (matchCount === 6) return "FIRST";
    if (matchCount === 5 && this.hasBonusNumber(userLotto)) return "SECOND";
    if (matchCount === 5) return "THIRD";
    if (matchCount === 4) return "FOURTH";
    if (matchCount === 3) return "FIFTH";  
  }

  hasBonusNumber(userLotto) {
    return userLotto.getNumber().includes(Number(this.#bonusNumber));
  }

  getWinningNumber() {
    return this.#winningNumber;
  }

  getBonusNumber() {
    return this.#bonusNumber;
  }

  #splitWinnigNumber(winningNumber) {
    return winningNumber.split(",").map(Number);
  }
}

export default WinningLotto;
