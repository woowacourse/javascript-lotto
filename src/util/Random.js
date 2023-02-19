import LOTTO_GAME from "../constants/LottoGame";

const Random = {
  makeTargetNumbers() {
    const targetNumbers = [];
    for (let i = LOTTO_GAME.MIN_NUMBER; i <= LOTTO_GAME.MAX_NUMBER; i++) {
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
