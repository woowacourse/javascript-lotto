import FareFromView from './FareFormView.js';
import LottoListView from './LottoListView.js';
import LottoMatchView from './LottoMatchView.js';
import WinningStatisticModalView from './WinningStatisticModalView.js';

class LottoGameView {
  #fareFormView;

  #lottoListView;

  #lottoMatchView;

  #winningStatisticModalView;

  constructor() {
    this.#fareFormView = new FareFromView();
    this.#lottoListView = new LottoListView();
    this.#lottoMatchView = new LottoMatchView();
    this.#winningStatisticModalView = new WinningStatisticModalView();
  }

  renderLottoList(lottoList) {
    this.#lottoListView.renderLottoList(lottoList);

    this.#deactivateFareForm();
    this.#renderLottoMatchSection();
  }

  renderWinningStatisticModal(winningCounts, earningsRate) {
    this.#winningStatisticModalView.renderWinningStatisticModal(winningCounts, earningsRate);
  }

  bindLottoMatchViewEvent(callback) {
    this.#lottoMatchView.setOnClickResultButtonHandler(callback);
  }

  bindWinningStatisticModalEvent(callback) {
    this.#winningStatisticModalView.setOnClickModalCloseButtonHandler();
    this.#winningStatisticModalView.setOnClickRestartButtonHandler(callback);
  }

  reset() {
    this.#fareFormView.reset();
    this.#lottoListView.reset();
    this.#lottoMatchView.reset();
    this.#winningStatisticModalView.reset();
  }

  #deactivateFareForm() {
    this.#fareFormView.deactivateFareForm();
  }

  #renderLottoMatchSection() {
    this.#lottoMatchView.renderLottoMatchSection();
  }
}

const lottoGameView = new LottoGameView();

export default lottoGameView;
