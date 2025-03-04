import { PRICE } from "../constants/price.js";
import showLottos from "../event/showLottos.js";
import showResult from "../event/showResult.js";
import { divideByUnit } from "../utils/count.js";
import reset from "../event/reset/reset.js";
import resetWinningHistoryUI from "../event/reset/resetWinningHistoryUI.js";
import { getNeededLottoNumbers, getPrice } from "./getInputWIthRetryWeb.js";
import Ticket from "../domain/Ticket.js";
import LottoStatus from "../domain/LottoStatus.js";
import LottoResult from "../domain/LottoResult.js";
class Game {
  #lottos;
  #price;

  init() {
    this.addBuyButtonEventListener();
    this.addPriceInputEventListener();
    this.addCheckResultButtonEventListener();
    this.addResetButtonEventListener();
    this.addCloseButtonEventListener();
  }

  buyLotto() {
    reset();
    const price = getPrice();

    if (price === undefined) return;

    this.#price = price;

    const lottos = Ticket.createLottos(divideByUnit(PRICE.UNIT, this.#price));

    if (lottos === undefined) return;

    this.#lottos = lottos;
  }

  addBuyButtonEventListener() {
    const buyButton = document.querySelector(".buyButton");
    buyButton.addEventListener("click", () => {
      this.buyLotto();
      if (this.#lottos === undefined) return;

      showLottos(this.#lottos);
    });
  }

  addPriceInputEventListener() {
    const priceInput = document.querySelector(".priceInput");
    priceInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.buyLotto();
        if (this.#lottos === undefined) return;
        showLottos(this.#lottos);
      }
    });
  }

  clickCheckResult() {
    console.log("clickCheckResult");

    const { winningLotto, bonusLottoNumber } = getNeededLottoNumbers();
    const { winningHistory, rate } = this.getLottoResults(
      winningLotto,
      bonusLottoNumber
    );
    showResult({ winningHistory, rate });
  }

  getLottoResults = (winningLotto, bonusLottoNumber) => {
    const lottoStatus = new LottoStatus({
      enteredLottoNumbers: winningLotto.getLottoNumbers(),
      bonusLottoNumber,
    });

    const lottosNumbers = this.#lottos.map((lotto) => lotto.getLottoNumbers());

    const matchedStatus = lottoStatus.getMatchedLottoStatus(lottosNumbers);

    const lottoResult = new LottoResult(matchedStatus, this.#price);
    console.log(lottoResult.getWinningHistory());
    console.log(lottoResult.getRate());
    return {
      winningHistory: lottoResult.getWinningHistory(),
      rate: lottoResult.getRate(),
    };
  };

  addCheckResultButtonEventListener() {
    const checkResultButton = document.querySelector(".checkResultButton");
    checkResultButton.addEventListener("click", () => {
      this.clickCheckResult();
    });
  }

  addResetButtonEventListener() {
    const resetButton = document.querySelector("#reset");
    resetButton.addEventListener("click", () => {
      reset();
    });
  }

  addCloseButtonEventListener() {
    const closeButton = document.querySelector("#closeButton");
    closeButton.addEventListener("click", () => {
      const dialog = document.querySelector("dialog");
      dialog.close();
      resetWinningHistoryUI();
    });
  }
}

export default Game;
