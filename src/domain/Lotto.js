import { RANKING } from '../constants/index.js';

class Lotto {
  constructor(numbers) {
    this.numbers = numbers;
  }

  getNumbers() {
    return this.numbers;
  }

  calculateRanking({ main, bonus }) {
    const { lost, first, second, third, fourth, fifth } = RANKING;
    const isBonusNumberMatch = this.numbers.includes(bonus);
    const matchCount = this.numbers.filter((number) => main.includes(number)).length;
    const ranking = [lost, lost, lost, fifth, fourth, isBonusNumberMatch ? second : third, first];
    return ranking[matchCount]; // 맞춘 갯수에 따른 등수를 반환
  }
}

export default Lotto;
