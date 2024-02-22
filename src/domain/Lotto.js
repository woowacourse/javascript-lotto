import Condition from '../constants/Condition';

const { RANK, PRIZE } = Condition;

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers;
  }

  getNumbers() {
    return this.#numbers;
  }

  compareBonus(bonusNumber) {
    return this.#numbers.includes(bonusNumber) ? RANK.SECOND_PLACE : RANK.THIRD_PLACE;
  }

  calculatePrize(winningNumbers, bonusNumber) {
    const match = this.#numbers.filter((number) => winningNumbers.includes(number)).length;
    const prize = PRIZE.find(([, detail]) => detail.MATCH === match);

    if (prize === undefined) return RANK.LAST_PLACE;

    return prize[0] === RANK.SECOND_PLACE ? this.compareBonus(bonusNumber) : prize[0];
  }
}

export default Lotto;
