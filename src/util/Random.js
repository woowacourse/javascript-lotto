import Lotto from "../constants/Lotto";

const Random = {
  makeTargetNumbers() {
    const targetNumbers = [];
    for (let i = Lotto.MIN_NUMBER; i <= Lotto.MAX_NUMBER; i++) {
      targetNumbers.push(i);
    }
    return targetNumbers;
  },

  generateRandomNumbers() {
    const shuffledNumbers = this.makeTargetNumbers().sort(() => Math.random() - 0.5)
    return shuffledNumbers.slice(0,6)
  }

};

export default Random;
