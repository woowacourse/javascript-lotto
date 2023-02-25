import mainPage from "./view/mainPage.js";
import resultPage from "./view/resultPage.js";
import LottoGame from "./domain/LottoGame.js";
import Validation from "./Validation.js";

class Controller {
  lottoGame;

  constructor() {
    this.mainPageAddEvent();
    this.resultAddEvent();
  }

  mainPageAddEvent() {
    mainPage.addEvent(() => {
      mainPage.clickInputAmount(this.amountTurnLotteries());
    });
  }

  resultAddEvent() {
    resultPage.addEvent(() => {
      const result = this.inputLottoBonus(resultPage.getLottoBonus());
      resultPage.clickResult(result);
    });
  }

  amountTurnLotteries() {
    const amount = +mainPage.getInputAmount();
    try {
      Validation.purchaseAmount(amount);
      return this.makeLottoGame(amount);
    } catch (error) {
      alert(error.message);
    }
  }

  makeLottoGame(amount) {
    this.lottoGame = new LottoGame(amount);
    return this.lottoGame.getLotteries();
  }

  inputLottoBonus([lotto, bonus]) {
    try {
      Validation.lottoNumbers(lotto);
      Validation.bonusNumber(lotto, bonus);
      return this.generateLottoGameResult(lotto, bonus);
    } catch (error) {
      alert(error.message);
    }
  }

  //Note: lottoResult = [0,0,0,0,0,0] = 5등~1등, 수익률
  generateLottoGameResult(lotto, bonus) {
    return this.lottoGame.getRankResult(lotto, bonus);
  }
}

export default Controller;
