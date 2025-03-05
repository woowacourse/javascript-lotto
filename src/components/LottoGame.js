import PurchaseForm from "./PurchaseForm.js";
import LottoPurchaseHistory from "./lottoHistoryItem/LottoPurchaseHistory.js";
import LottoWinningInfoForm from "./winningLottoInfoForm/LottoWinningInfoForm.js";
import WinningStatistic from "./winningStatistic/WinningStatistic.js";
import Modal from "./common/Modal.js";
import LottoMachine from "../domain/LottoMachine.js";
import LottoResult from "../domain/LottoResult.js";
import lottoTransactionStore from "../store/lottoTransactionStore.js";
import winningLottoInfoStore from "../store/winningLottoInfo.js";
import customCreateElement from "../utils/customElement.js";

export default class LottoGame {
  #target;
  #show;
  $div;

  constructor($target) {
    this.#target = $target;
    this.#show = false;

    lottoTransactionStore.subscribe(() => this.render());
    winningLottoInfoStore.subscribe(() => this.render());

    this.renderStaticElement();
    this.render();
  }

  setShow = (newState) => {
    this.#show = newState;
    this.render();
  };

  setInit = () => {
    this.#show = false;

    lottoTransactionStore.resetState();
    winningLottoInfoStore.resetState();
  };

  renderStaticElement() {
    const $div = customCreateElement({
      tagName: "div",
      className: "lotto-winning-result-container",
    });
    const $title = customCreateElement({
      tagName: "div",
      className: "lotto-winning-result-title",
      text: "🎱 내 번호 당첨 확인 🎱",
    });

    $div.appendChild($title);
    this.#target.appendChild($div);

    new PurchaseForm($div, this.setShow);

    this.$div = customCreateElement({
      tagName: "div",
    });

    $div.appendChild(this.$div);

    document.addEventListener("keydown", (e) => {
      const $modalBg = document.querySelector(".modal-bg");
      const $modal = document.querySelector(".modal");

      if (!$modalBg.classList.contains("modal-none") && e.key === "Escape") {
        $modalBg.classList.add("modal-none");
        $modal.classList.add("modal-none");
      }
    });
  }

  resetStaticElements() {
    const $modal = document.querySelector(".modal-bg");
    if ($modal) $modal.remove();

    const $input = document.querySelector(".purchase-form-input");
    $input.value = "";
  }

  render() {
    this.resetStaticElements();

    this.$div.replaceChildren();

    const $modal = document.querySelector(".modal-bg");
    if ($modal) $modal.remove();

    const $input = document.querySelector(".purchase-form-input");
    $input.value = "";

    this.$div.replaceChildren();

    new LottoPurchaseHistory(this.$div, this.#show);
    new LottoWinningInfoForm(this.$div, this.#show);

    const winningResult = this.calculateWinningResult();

    if (!winningResult) return;

    const winningStatistic = new WinningStatistic(winningResult, this.setInit);

    new Modal(this.#target, ($target) => winningStatistic.render($target));
  }

  calculateWinningResult() {
    const { winningNumbers, bonusNumber } =
      winningLottoInfoStore.getState().winningLottoInfo;

    const { lottos, price } = lottoTransactionStore.getState().lottoTransaction;
    if (winningNumbers.length === 0 && bonusNumber === 0) return;

    const lottoMachine = new LottoMachine(lottos);
    lottoMachine.updateAllLottoStatus(winningNumbers, bonusNumber);
    const lottoStatus = lottoMachine.getMatchedLottoStatus();

    const lottoResult = new LottoResult(lottoStatus, price);
    const lottoHistory = lottoResult.getWinningHistory();
    const rate = lottoResult.calculateRate();

    return { lottoHistory, rate };
  }
}
