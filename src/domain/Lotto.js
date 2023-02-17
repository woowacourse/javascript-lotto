import { FIFTH, FIRST, FOURTH, LOST, SECOND, THIRD } from '../constants/index.js';

class Lotto {
  constructor(numbers) {
    this.numbers = numbers;
  }

  getNumbers() {
    return this.numbers;
  }

  calculateRanking({ main, bonus }) {
    const isBonusNumberMatch = this.numbers.includes(bonus);
    const matchCount = this.numbers.filter((number) => main.includes(number)).length;
    const ranking = [LOST, LOST, LOST, FIFTH, FOURTH, isBonusNumberMatch ? SECOND : THIRD, FIRST];
    return ranking[matchCount]; // 맞춘 갯수에 따른 등수를 반환
  }
}

export default Lotto;
