import ascendingOrderSort from '../utils/ascendingSortArr.js';
import prize from './prize.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers.map((number) => Number(number));
  }

  getNumbers() {
    return ascendingOrderSort(this.#numbers);
  }

  #getMatchCountAndIsBonus({ winningLottoNumbers, bonusNumber }) {
    const numberMatchCount = this.#numbers.filter((number) => winningLottoNumbers.includes(number)).length;

    const isBonus = this.#numbers.includes(bonusNumber);

    return { numberMatchCount, isBonus };
  }

  getRank({ winningLottoNumbers, bonusNumber }) {
    const { numberMatchCount, isBonus } = this.#getMatchCountAndIsBonus({
      winningLottoNumbers,
      bonusNumber,
    });

    const rank = prize.findRankByMatchCountAndBonus({ numberMatchCount, isBonus });

    return rank;
  }
}
export default Lotto;
