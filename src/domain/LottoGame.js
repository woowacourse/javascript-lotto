import Lotto from "./Lotto.js";
import { makeOneLottoArray } from "../utils/utils.js";

class LottoGame {
  constructor(amount) {
    this.result = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    this.lottoes = this.getLottos(amount);
  }

  getGameResult() {
    return this.result;
  }

  getLottos(amount) {
    const allLottos = [];
    for (let i = 0; i < amount; i += 1) {
      const currentLotto = makeOneLottoArray();
      allLottos.push(new Lotto(currentLotto));
    }
    return allLottos;
  }

  calculate(targetNumber, bonusNumber) {
    this.lottoes.forEach((lotto) => {
      const correctNumber = lotto.getCorretNumber(targetNumber);
      const isBonus = lotto.hasBonusNumber(bonusNumber);
      if (correctNumber === 3) this.result["5"] += 1;
      if (correctNumber === 4) this.result["4"] += 1;
      if (correctNumber === 5 && !isBonus) this.result["3"] += 1;
      if (correctNumber === 5 && isBonus) this.result["2"] += 1;
      if (correctNumber === 6) this.result["1"] += 1;
    });
  }

  getWinMoney() {
    return (
      this.result["5"] * 5_000 +
      this.result["4"] * 50_000 +
      this.result["3"] * 1_500_000 +
      this.result["2"] * 30_000_000 +
      this.result["1"] * 2_000_000_000
    );
  }

  getEarningRate(amount) {
    const rawEarningRate = (this.getWinMoney() / (amount * 1000)) * 100;
    return rawEarningRate.toFixed(1);
  }
}

export default LottoGame;
