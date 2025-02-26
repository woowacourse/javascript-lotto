import PurchaseForm from "./PurchaseForm.js";
import LottoPurchaseHistory from "./LottoPurchaseHistory.js";
import LottoWinningInfoForm from "./LottoWinningInfoForm.js";
import WinningStatistic from "./WinningStatistic.js";
import Modal from "./common/Modal.js";
import LottoMachine from "../domain/LottoMachine.js";
import LottoResult from "../domain/LottoResult.js";
import lottoTransactionStore from "../store/lottoTransactionStore.js";

export default class LottoGame {
  #target;
  #winningLottoInfo;
  #lottoResult;
  #show;

  constructor($target) {
    this.#target = $target;
    this.#winningLottoInfo = { winningNumbers: [], bonusNumber: 0 };
    this.#lottoResult = { lottoHistory: [], rate: 0 };
    this.#show = false;

    lottoTransactionStore.subscribe(() => this.render());

    this.render();
  }

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
    this.#winningLottoInfo = { winningNumbers: [], bonusNumber: 0 };
    this.#lottoResult = { lottoHistory: [], rate: 0 };
    this.#show = false;

    lottoTransactionStore.setState((state) => ({
      lottoTransaction: { ...state.lottoTransaction, price: 0, lottos: [] },
    }));

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

    new PurchaseForm($div, this.setShow);
    new LottoPurchaseHistory($div, this.#show);
    new LottoWinningInfoForm(
      $div,
      this.#winningLottoInfo,
      this.setWinningLottoInfo,
      this.#show
    );

    const winningResult = this.calculateWinningResult();

    if (!winningResult) return;

    const winningStatistic = new WinningStatistic(winningResult, this.setInit);

    new Modal(this.#target, ($target) => winningStatistic.render($target));
  }

  calculateWinningResult() {
    const { winningNumbers, bonusNumber } = this.#winningLottoInfo;
    const { lottos, price } = lottoTransactionStore.getState().lottoTransaction;

    if (winningNumbers.length === 0 && bonusNumber === 0) return;

    const lottoMachine = new LottoMachine(lottos);
    lottoMachine.updateAllLottoStatus(
      this.#winningLottoInfo.winningNumbers,
      this.#winningLottoInfo.bonusNumber
    );
    const lottoStatus = lottoMachine.getMatchedLottoStatus();

    const lottoResult = new LottoResult(lottoStatus, price);
    const lottoHistory = lottoResult.getWinningHistory();
    const rate = lottoResult.calculateRate();

    return { lottoHistory, rate };
  }
}
