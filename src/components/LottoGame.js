import PurchaseForm from "./PurchaseForm.js";
import LottoPurchaseHistory from "./LottoPurchaseHistory.js";
import { divideByUnit } from "../utils/count.js";
import { PRICE } from "../constants/price.js";
import LottoWinningInfoForm from "./LottoWinningInfoForm.js";
import WinningStatistic from "./WinningStatistic.js";
import Modal from "./common/Modal.js";
import LottoMachine from "../domain/LottoMachine.js";
import LottoResult from "../domain/LottoResult.js";

export default class LottoGame {
  #target;
  #lottoTransaction;
  #winningLottoInfo;
  #lottoResult;
  #show;

  constructor($target) {
    this.#target = $target;
    this.#lottoTransaction = { price: 0, lottos: [] };
    this.#winningLottoInfo = { winningNumbers: [], bonusNumber: 0 };
    this.#lottoResult = { lottoHistory: [], rate: 0 };
    this.#show = false;
    this.render();
  }

  setLottoTransaction = (newState) => {
    this.#lottoTransaction = { ...this.#lottoTransaction, ...newState };
    this.render();
  };

  setWinningLottoInfo = (newState) => {
    this.#winningLottoInfo = { ...this.#winningLottoInfo, ...newState };
    this.render();
  };

  setLottoResult = (newState) => {
    this.#lottoResult = { ...this.#lottoResult, ...newState };
    this.render();
  };

  setShow = (newState) => {
    this.#show = newState;
    this.render();
  };

  setInit = () => {
    this.#lottoTransaction = { price: 0, lottos: [] };
    this.#winningLottoInfo = { winningNumbers: [], bonusNumber: 0 };
    this.#lottoResult = { lottoHistory: [], rate: 0 };
    this.#show = false;
    this.render();
  };

  render() {
    this.#target.innerHTML = "";

    const $div = document.createElement("div");
    const $title = document.createElement("p");

    $title.innerText = "🎱 내 번호 당첨 확인 🎱";
    $title.className = "lotto-winning-result-title";
    $div.className = "lotto-winning-result-container";

    $div.appendChild($title);
    this.#target.appendChild($div);

    const countNumber = divideByUnit(PRICE.UNIT, this.#lottoTransaction.price);

    new PurchaseForm($div, this.setLottoTransaction, this.setShow);
    new LottoPurchaseHistory(
      $div,
      countNumber,
      this.#lottoTransaction.lottos,
      this.#show
    );
    new LottoWinningInfoForm(
      $div,
      this.#winningLottoInfo,
      this.setWinningLottoInfo,
      this.#show
    );

    const { lottoHistory, rate } = this.calculateWinningResult();

    if (!lottoHistory && !rate) return;

    const winningStatistic = new WinningStatistic(
      lottoHistory,
      rate,
      this.setInit
    );

    new Modal(this.#target, ($target) => winningStatistic.render($target));
  }

  calculateWinningResult() {
    const { winningNumbers, bonusNumber } = this.#winningLottoInfo;

    if (winningNumbers.length === 0 && bonusNumber === 0)
      return { lottoHistory: undefined, rate: undefined };

    const lottoMachine = new LottoMachine(this.#lottoTransaction.lottos);
    lottoMachine.updateAllLottoStatus(
      this.#winningLottoInfo.winningNumbers,
      this.#winningLottoInfo.bonusNumber
    );
    const lottoStatus = lottoMachine.getMatchedLottoStatus();

    const lottoResult = new LottoResult(
      lottoStatus,
      this.#lottoTransaction.price
    );
    const lottoHistory = lottoResult.getWinningHistory();
    const rate = lottoResult.calculateRate();

    return { lottoHistory, rate };
  }
}
