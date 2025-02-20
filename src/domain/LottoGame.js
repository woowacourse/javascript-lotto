import Lotto from "./Lotto.js";
import { makeOneLottoArray } from "../utils/utils.js";
import Constants from "../constant/Constants.js";

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
      if (correctNumber === Constants.LOTTO.CORRECT_NUMBER.FIFTH)
        this.result["5"] += 1;
      if (correctNumber === Constants.LOTTO.CORRECT_NUMBER.FOURTH)
        this.result["4"] += 1;
      if (correctNumber === Constants.LOTTO.CORRECT_NUMBER.THIRD && !isBonus)
        this.result["3"] += 1;
      if (correctNumber === Constants.LOTTO.CORRECT_NUMBER.SECOND && isBonus)
        this.result["2"] += 1;
      if (correctNumber === Constants.LOTTO.CORRECT_NUMBER.FIRST)
        this.result["1"] += 1;
    });
  }

  getWinMoney() {
    return (
      this.result["5"] * Constants.LOTTO.PRIZE.FIFTH +
      this.result["4"] * Constants.LOTTO.PRIZE.FOURTH +
      this.result["3"] * Constants.LOTTO.PRIZE.THIRD +
      this.result["2"] * Constants.LOTTO.PRIZE.SECOND +
      this.result["1"] * Constants.LOTTO.PRIZE.FIRST
    );
  }

  getEarningRate(amount) {
    const rawEarningRate =
      (this.getWinMoney() / (amount * Constants.LOTTO.UNIT)) * 100;
    return rawEarningRate.toFixed(1);
  }
}

export default LottoGame;
