// Domain
import Lottos from '../domain/model/Lottos';
import WinningNumbers from '../domain/model/WinningNumbers';
// View
import PurchasePriceView from '../view/PurchasePriceView';
import WinningNumbersView from '../view/WinningNumbersView';
import GameResultView from '../view/GameResultView';

const { PRICE_UNIT } = require('../constants/constants');

export default class LottoGameController {
  #model = {};

  #view = {
    purchasePriceView: new PurchasePriceView(),
    winningNumbersView: new WinningNumbersView(),
    gameResultView: GameResultView,
  };

  constructor() {
    this.setEventHandler();
  }

  setEventHandler() {
    this.#view.purchasePriceView.addSubmitEvent(this.onSubmitPrice.bind(this));
  }

  onSubmitPrice(purchasePriceInput) {
    const lottoCount = this.calculateLottoCount(purchasePriceInput);

    this.#model.lottos = new Lottos(lottoCount);
    const lottos = this.#model.lottos.getLottos();
    this.#view.purchasePriceView.renderPurchaseResult(lottoCount, lottos);

    this.#view.purchasePriceView.resetInputValue();

    this.#view.winningNumbersView.render();

    this.#view.winningNumbersView.addSubmitEvent(
      this.onSubmitWinningNumbers.bind(this)
    );
  }

  calculateLottoCount(priceInput) {
    return Math.floor(Number(priceInput) / PRICE_UNIT);
  }

  onSubmitWinningNumbers(winningNumbersInput, bonusNumberInput) {
    this.#model.winningNumbers = new WinningNumbers(
      winningNumbersInput,
      bonusNumberInput
    );
    this.showGameResult();
  }

  showGameResult() {
    this.calculateRanks();
    const ranks = this.#model.lottos.getAllRanks();
    const profitRate = this.#model.lottos.getProfitRate();

    this.#view.gameResultView.render(ranks, profitRate);
    this.#view.gameResultView.addRestartClickEvent(
      this.onClickRestartCommand.bind(this)
    );
    this.#view.gameResultView.addCloseClickEvent(
      this.onClickModalClose.bind(this)
    );
  }

  calculateRanks() {
    this.#model.lottos.calculateAllRanks(
      this.#model.winningNumbers.getWinningNumbers(),
      this.#model.winningNumbers.getBonusNumber()
    );
  }

  onClickRestartCommand() {
    this.#model.lottos = null;
    this.#model.winningNumbers = null;
    this.#view.gameResultView.close();
    this.#view.purchasePriceView.resetPurchaseResult();
    this.#view.winningNumbersView.removeWinningNumbersForm();
  }

  onClickModalClose() {
    this.#view.gameResultView.close();
  }
}
