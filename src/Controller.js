// const InputView = require("./view/InputView");
// const OutputView = require("./view/OutputView");

import LottoGame from "./domain/LottoGame.js";
import Validation from "./Validation.js";
import { COMMAND } from "./constants.js";

class Controller {
  lottoGame;

  constructor() {}

  amountTurnLotteries(amount) {
    try {
      Validation.purchaseAmount(+amount);
      return this.makeLottoGame(+amount);
    } catch (error) {
      return error.message;
    }
  }

  makeLottoGame(amount) {
    this.lottoGame = new LottoGame(amount);
    return this.lottoGame.getLotteries();
  }

  inputLottoBonus(lotto, bonus) {
    try {
      Validation.lottoNumbers(lotto);
      Validation.bonusNumber(lotto, bonus);
      return this.generateLottoGameResult(lotto, bonus);
    } catch (error) {
      return error.message;
    }
  }

  //lottoResult = [0,0,0,0,0,0] = 5등~1등, 수익률
  generateLottoGameResult(lotto, bonus) {
    return this.lottoGame.getRankResult(lotto, bonus);
  }
}

export default Controller;
