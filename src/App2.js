import Lotto from "./domain/Lotto";
import Lottos from "./domain/Lottos";
import Random from "./util/Random";
import LottoScore from "./domain/LottoScore";
import Utils from "./util/Utils";
import EventHandler from "./view/EventHadler";
import Element from "./view/Element";

class App2 {
  #lottos;
  constructor() {
    this.buyResultSection = Utils.$(".lotto__buy-result");
    this.winningLottosInputs = Utils.$$(".lotto__winning-lotto-input");
    this.bonusInput = Utils.$(".lotto__bonus-lotto-input");
    this.resultButton = Utils.$(".lotto__result-button");
    this.winningLotto = [];
    this.bonusNumber = 0;
  }
  play() {
    this.startLottoGame();
  }

  startLottoGame() {
    EventHandler.handleEvent(this.buyButton, "click", () => {
      this.createLotto(parseInt(this.buyMoneyInput.value / 1000));
      this.showLottos();
      this.progressLottoGame();
    });
  }

  createLotto(lottoAmount) {
    const createdLotto = Array.from(
      { length: lottoAmount },
      () => new Lotto(Random.generateRandomNumbers())
    );
    this.#lottos = new Lottos(createdLotto);
  }

  showLottos() {
    this.buyResultSection.classList.remove("hidden");
    this.#lottos.lottos.forEach((lotto) => {
      Element.createBuyLottos(lotto);
    });
  }

  progressLottoGame() {
    EventHandler.handleEvent(this.resultButton, "click", () => {
      this.getWinningLotto();
      this.getBonusNumber();
      this.getLottoGameResult();
    });
  }

  getWinningLotto() {
    this.winningLottosInputs.forEach((winningNumber) => {
      this.winningLotto.push(Number(winningNumber.value));
    });
  }

  getBonusNumber() {
    this.bonusNumber = Number(this.bonusInput.value);
  }

  getLottoGameResult() {
    const lottoScore = new LottoScore(this.#lottos.lottos);
    this.compareLottos(lottoScore);
    Element.createResults(lottoScore.lottoRanking);
  }

  compareLottos(lottoScore) {
    this.#lottos.compareLottosWithWinningLotto(
      this.winningLotto,
      this.bonusNumber
    );
    lottoScore.compareLottosScore();
  }
}

export default App2;
