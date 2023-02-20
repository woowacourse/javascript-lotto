import { RANKING } from '../constants/index.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers;
  }

  getNumbers() {
    return this.#numbers;
  }

  calculateRanking({ main, bonus }) {
    const hasBonus = this.#numbers.includes(bonus);
    const matchCount = this.#numbers.filter((number) => main.includes(number)).length;
    if (matchCount === 5) {
      return RANKING[matchCount](hasBonus);
    }
    return RANKING[matchCount]; // 맞춘 갯수에 따른 등수를 반환
  }
}

export default Lotto;
