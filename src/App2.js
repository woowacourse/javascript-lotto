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
    this.buyMoneyInput = Utils.$(".lotto__input-box");
    this.winningLotto = [];
    this.bonusNumber = 0;
  }
    
  play() {
    this.startLottoGame();
  }

  startLottoGame() {
    const buyButton = Utils.$(".lotto__buy-button");

    EventHandler.handleEvent(buyButton, "click", () => {
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
    const resultButton = Utils.$(".lotto__result-button");

    EventHandler.handleEvent(resultButton, "click", () => {
      const lottoScore = this.getLottoGameResult();

      this.getWinningLotto();
      this.getBonusNumber();
      this.retryLottoGame(lottoScore);
    });
  }

  getWinningLotto() {
    const winningLottosInputs = Utils.$$(".lotto__winning-lotto-input");

    winningLottosInputs.forEach((winningNumber) => {
      this.winningLotto.push(Number(winningNumber.value));
    });
  }

  getBonusNumber() {
    const bonusInput = Utils.$(".lotto__bonus-lotto-input");

    this.bonusNumber = Number(bonusInput.value);
  }

  getLottoGameResult() {
    const lottoScore = new LottoScore(this.#lottos.lottos);

    this.compareLottos(lottoScore);
    Element.createResults(lottoScore.lottoRanking);

    return lottoScore;
  }

  compareLottos(lottoScore) {
    this.#lottos.compareLottosWithWinningLotto(
      this.winningLotto,
      this.bonusNumber
    );
    lottoScore.compareLottosScore();
  }

  retryLottoGame(lottoScore) {
    const retryButton = Utils.$(".result__retry-button");

    EventHandler.handleEvent(retryButton, "click", () => {
      this.#lottos.resetLottos();
      lottoScore.resetLottoScore();
      this.resetView();
    });
  }

  resetView() {
    const resultModal = Utils.$(".result-background");

    this.buyResultSection.classList.add("hidden");
    resultModal.classList.add("hidden");
    this.buyMoneyInput.value = "";
  }
}

export default App2;
