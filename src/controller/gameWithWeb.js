import { PRICE } from "../constants/price.js";
import showLottos from "../ui/showLottos.js";
import showResult from "../ui/showResult.js";
import { divideByUnit } from "../utils/count.js";
import reset from "../ui/reset/reset.js";
import resetWinningHistoryUI from "../ui/reset/resetWinningHistoryUI.js";
import { getNeededLottoNumbers, getPrice } from "./getInputWIthRetryWeb.js";
import Ticket from "../domain/Ticket.js";
import initEvent from "../event/initEvent.js";
import getLottoResult from "../service/getLottoResult.js";
import getMatchedLottoStatus from "../service/getMatchedLottoStatus.js";
class Game {
  #lottos;
  #price;

  init() {
    initEvent.addBuyLottosEventListener(this.handleLottoPurchase);

    initEvent.addCheckResultButtonEventListener(this.handleClickCheckResult);

    initEvent.addResetButtonEventListener(reset);

    initEvent.addCloseButtonEventListener(this.handleClickCloseButton);
  }

  handleLottoPurchase = (e) => {
    e.preventDefault();

    this.buyLotto();

    if (this.#lottos === undefined) return;

    showLottos(this.#lottos);
  };

  handleClickCheckResult = () => {
    const { winningLotto, bonusLottoNumber } = getNeededLottoNumbers();

    const matchedStatus = getMatchedLottoStatus({
      winningLotto,
      bonusLottoNumber,
      lottos: this.#lottos,
    });

    const { winningHistory, rate } = getLottoResult(matchedStatus, this.#price);

    showResult({ winningHistory, rate });
  };

  buyLotto = () => {
    reset();
    this.reset();

    const price = getPrice();

    if (price === undefined) return;

    this.#price = price;

    const lottos = Ticket.createLottos(divideByUnit(PRICE.UNIT, this.#price));

    if (lottos === undefined) return;

    this.#lottos = lottos;
  };

  handleClickCloseButton = () => {
    const dialog = document.querySelector("dialog");

    dialog.close();

    resetWinningHistoryUI();
  };

  reset() {
    this.#lottos = undefined;
    this.#price = undefined;
  }
}

export default Game;
