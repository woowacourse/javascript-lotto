import Lotto from "./lotto.js";

class LottoMachine {
  getLottoCount(input) {
    const lottoCount = input / 1000;
    return lottoCount;
  }

  drawRandomNumbers(count) {
    const randomNumbers = new Set();
    while (randomNumbers.size < count) {
      const randomNumber = Math.floor(Math.random() * 45 + 1);
      randomNumbers.add(randomNumber);
    }

    return Array.from(randomNumbers).sort((a, b) => a - b);
  }

  drawLotto(count) {
    return Array.from({ length: count }).map(() => {
      const randomNumber = this.drawRandomNumbers(6);
      return new Lotto(randomNumber);
    });
  }
}

export default LottoMachine;
