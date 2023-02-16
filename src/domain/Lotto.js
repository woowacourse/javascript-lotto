import { RANKING } from '../constants/index.js';

class Lotto {
  constructor(numbers) {
    this.numbers = numbers;
  }

  getNumbers() {
    return this.numbers;
  }

  calculateRanking(winningNumber, bonusNumber) {
    const { lost, first, second, third, fourth, fifth } = RANKING;
    const bonus = this.numbers.includes(bonusNumber);
    const matchCount = this.numbers.filter((number) => winningNumber.includes(number)).length;
    const ranking = [lost, lost, lost, fifth, fourth, bonus ? second : third, first];
    return ranking[matchCount]; // 맞춘 갯수에 따른 등수를 반환
  }
}

export default Lotto;
