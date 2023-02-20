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
    const { lost, first, second, third, fourth, fifth } = RANKING;
    const bonusBoolean = this.#numbers.includes(bonus);
    const matchCount = this.#numbers.filter((number) => main.includes(number)).length;
    const ranking = [lost, lost, lost, fifth, fourth, bonusBoolean ? second : third, first];
    return ranking[matchCount]; // 맞춘 갯수에 따른 등수를 반환
  }
}

export default Lotto;
