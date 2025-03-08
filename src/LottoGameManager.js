import LottoMachine from "./Model/LottoMachine.js";
import Validate from "./Model/Validate.js";
import Winning from "./Model/Winning.js";

class LottoGameManager {
  constructor() {
    this.price = 0;
    this.lottos = [];
    this.lottoMachine = new LottoMachine();
    this.winning = null;
  }

  purchaseLotto(price) {
    Validate.validatePrice(price);
    this.price = price;
    this.lottos = this.lottoMachine.generateLotto(this.price);
  }

  setWinningNumbers(winningNumbers, bonusNumber) {
    Validate.validateWinningNumbers(winningNumbers, bonusNumber);
    this.winning = new Winning(winningNumbers);
    this.winning.validateBonusNumber(bonusNumber);
    this.winning.setBonusNumber(bonusNumber);
  }

  getWinningResult() {
    this.winning.calculateRank(this.lottos);
    return {
      rankHistory: this.winning.rankHistory,
      prizeRate: this.winning.getCalculatedPrizeRate(this.price),
    };
  }

  getLottos() {
    return this.lottos;
  }

  getPrice() {
    return this.price;
  }

  resetGame() {
    this.price = 0;
    this.lottos = [];
  }
}

export default LottoGameManager;
