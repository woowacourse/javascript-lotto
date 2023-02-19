import Lotto from '../lotto/Lotto';
import WinningLotto from '../WinningLotto';

class Reward {
  /** @type {number} */
  #matchingNumbers;

  /** @type {number} */
  #money;

  /**
   * @param {number} matchingNumbers
   * @param {number} money
   */
  constructor(matchingNumbers, money) {
    this.#matchingNumbers = matchingNumbers;
    this.#money = money;
  }

  getMatchingNumber() {
    return this.#matchingNumbers;
  }

  getMoney() {
    return this.#money;
  }

  /**
   * @param {Lotto} lotto
   * @param {WinningLotto} winningLotto
   * @returns {boolean}
   */
  canReceive(lotto, winningLotto) {
    return winningLotto.countMatchingNumbers(lotto) === this.#matchingNumbers;
  }

  getTitle() {
    return `${this.#matchingNumbers}개 (${this.#money.toLocaleString()}원)`;
  }
}

export default Reward;
