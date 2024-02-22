import Condition from '../constants/Condition';

const { PRIZE } = Condition;

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers;
  }

  getNumbers() {
    return this.#numbers;
  }

  compareBonus(bonusNumber) {
    return this.#numbers.includes(bonusNumber) ? '2' : '3';
  }

  calculatePrize(winningNumbers, bonusNumber) {
    const match = this.#numbers.filter((number) => winningNumbers.includes(number)).length;
    const prize = Object.entries(PRIZE).find(([, detail]) => detail.MATCH === match);

    if (prize === undefined) return '0';

    return prize[0] === '2' ? this.compareBonus(bonusNumber) : prize[0];
  }
}

export default Lotto;
