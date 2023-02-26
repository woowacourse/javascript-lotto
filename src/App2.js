import Lotto from "./domain/Lotto";
import Random from "./util/Random";
import LottoScore from "./domain/LottoScore";
import Utils from "./util/Utils";
import EventHandler from "./view/EventHadler";
import Element from "./view/Element";
import LottoMachine from "./domain/LottoMachine";
import InputCheck from "./InputCheck";
import LOTTO_GAME from "./constants/LottoGame";
import CLASS_NAME from "./constants/ClassName";

class App2 {
  #lottos;

  constructor() {
    this.winningLotto = [];
    this.bonusNumber = 0;
    this.lottoMachine = new LottoMachine();
    this.isInitShow = true;
  }

  play() {
    this.startLottoGame();
  }

  startLottoGame() {
    const buyButton = Utils.$(CLASS_NAME.LOTTO_BUY_BUTTON);
    const buyMoneyInput = Utils.$(CLASS_NAME.LOTTO_INPUT_BOX);

    EventHandler.handleEvent(buyButton, "click", () => {
      try {
        InputCheck.validateBuyMoney(buyMoneyInput.value, true);
        this.createLotto(
          parseInt(buyMoneyInput.value / LOTTO_GAME.LOTTO_PRICE)
        );
        this.showLottos();
        this.progressLottoGame();
      } catch (e) {
        this.buyMoneyInput.value = "";
      }
    });
  }

  createLotto(lottoAmount) {
    const createdLotto = Array.from(
      { length: lottoAmount },
      () => new Lotto(Random.generateRandomNumbers())
    );

    this.#lottos = [...createdLotto];
  }

  showLottos() {
    const buyAmount = Utils.$(CLASS_NAME.LOTTO_BUY_AMOUNT_COMMENT);
    const buyResultSection = Utils.$(CLASS_NAME.LOTTO_BUY_RESULT);

    Element.removeClassList(buyResultSection, "hidden");
    this.#lottos.forEach((lotto) => {
      Element.createBuyLottos(lotto, buyAmount, this.#lottos.length);
    });
  }

  progressLottoGame() {
    const resultButton = Utils.$(CLASS_NAME.LOTTO_RESULT_BUTTON);

    EventHandler.handleEvent(resultButton, "click", () => {
      this.isInitShow ? this.showInitResult() : this.showResultAgain();
    });
  }

  showInitResult() {
    this.isInitShow = false;
    this.getWinningLotto();
    this.checkWinningLottoInputs();
  }

  showResultAgain() {
    const result = Utils.$(CLASS_NAME.RESULT_BG);

    Element.removeClassList(result, "hidden");
  }

  getWinningLotto() {
    const winningLottosInputs = Utils.$$(CLASS_NAME.WINNINGLOTTO_INPUT);

    winningLottosInputs.forEach((winningNumber) => {
      this.winningLotto.push(Number(winningNumber.value));
    });
  }

  checkWinningLottoInputs() {
    try {
      InputCheck.validateWinningNumbers(this.winningLotto, true);
      this.getBonusNumber();
      this.checkBonusNumberInput();
    } catch (e) {
      this.resetWinningLottoInputs();
    }
  }

  checkBonusNumberInput() {
    try {
      InputCheck.validateBonusNumber(this.bonusNumber, this.winningLotto, true);
      const lottoScore = this.getLottoGameResult();
      this.retryLottoGame(lottoScore);
    } catch (e) {
      this, this.resetBonusLottoInput();
    }
  }

  resetWinningLottoInputs() {
    const winningLottosInputs = Utils.$$(CLASS_NAME.WINNINGLOTTO_INPUT);
    winningLottosInputs.forEach((winningNumber) => {
      winningNumber.value = "";
    });
    this.winningLotto = [];
  }

  getBonusNumber() {
    const bonusInput = Utils.$(CLASS_NAME.BONUSLOTTO_INPUT);

    this.bonusNumber = Number(bonusInput.value);
  }

  resetBonusLottoInput() {
    const bonusInput = Utils.$(CLASS_NAME.BONUSLOTTO_INPUT);

    bonusInput.value = "";
    this.bonusNumber = 0;
    this.winningLotto = [];
  }

  getLottoGameResult() {
    const lottoScore = new LottoScore(this.#lottos);

    this.compareLottos(lottoScore);
    Element.createResults(
      lottoScore.lottoRanking,
      lottoScore.getLottoBenefitRate(this.#lottos.length)
    );
    this.closeModal();

    return lottoScore;
  }

  compareLottos(lottoScore) {
    this.lottoMachine.compareLottos(
      this.#lottos,
      this.winningLotto,
      this.bonusNumber,
      lottoScore
    );
    lottoScore.compareLottosScore();
  }

  retryLottoGame(lottoScore) {
    const retryButton = Utils.$(CLASS_NAME.RETYR_BUTTON);

    EventHandler.handleEvent(retryButton, "click", () => {
      this.resetGame(lottoScore);
    });
  }

  resetGame(lottoScore) {
    lottoScore.resetLottoScore();
    location.reload();
  }

  closeModal() {
    const closeButton = Utils.$(CLASS_NAME.MODAL_CLOSE_BUTTON);
    const result = Utils.$(CLASS_NAME.RESULT_BG);

    EventHandler.handleEvent(closeButton, "click", () => {
      Element.addClassList(result, "hidden");
    });
  }
}

export default App2;
