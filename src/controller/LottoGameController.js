import '../../index.css';
// Domain
import Lottos from '../domain/model/Lottos';
import WinningNumbers from '../domain/model/WinningNumbers';
// View
import PurchasePriceView from '../view/PurchasePriceView';
import WinningNumbersView from '../view/WinningNumbersView';
import GameResultView from '../view/GameResultView';

const { PRICE_UNIT } = require('../constants/constants');

export default class LottoGameController {
  constructor() {
    this.model = {
      lottos: undefined,
      winningNumbers: undefined,
    };
    this.view = {
      purchasePriceView: new PurchasePriceView(),
      winningNumbersView: new WinningNumbersView(),
      gameResultView: new GameResultView(),
    };
    this.setEventHandler();
  }

  setEventHandler() {
    this.view.purchasePriceView.addSubmitEvent(
      this.onPriceSubmitHandler.bind(this)
    );
  }

  onPriceSubmitHandler(purchasePriceInput) {
    const lottoCount = this.calculateLottoCount(purchasePriceInput);

    this.model.lottos = new Lottos(lottoCount);
    const lottos = this.model.lottos.getLottos();
    this.view.purchasePriceView.renderPurchaseResult(lottoCount, lottos);

    this.view.purchasePriceView.resetInputValue();

    this.view.winningNumbersView.render();
    this.setEvent2Handler();
  }

  calculateLottoCount(priceInput) {
    return Math.floor(Number(priceInput) / PRICE_UNIT);
  }

  setEvent2Handler() {
    this.view.winningNumbersView.addSubmitEvent(
      this.onWinningNumbersSubmitHandler.bind(this)
    );
  }

  onWinningNumbersSubmitHandler(winningNumbersInput, bonusNumberInput) {
    this.model.winningNumbers = new WinningNumbers(
      winningNumbersInput,
      bonusNumberInput
    );
    this.showGameResult();
  }

  showGameResult() {
    this.calculateRanks();
    const ranks = this.model.lottos.getAllRanks();
    const profitRate = this.model.lottos.getProfitRate();
    this.view.gameResultView.render(ranks, profitRate);
    this.setEvent3Handler();
    this.setEvent4Handler();
  }

  calculateRanks() {
    this.model.lottos.calculateAllRanks(
      this.model.winningNumbers.getWinningNumbers(),
      this.model.winningNumbers.getBonusNumber()
    );
  }

  setEvent3Handler() {
    this.view.gameResultView.addRestartClickEvent(
      this.onRestartCommandClickHandler.bind(this)
    );
  }

  onRestartCommandClickHandler() {
    this.model.lottos = null;
    this.model.winningNumbers = null;
    this.view.gameResultView.close();
    this.view.purchasePriceView.resetPurchaseResult();
    this.view.winningNumbersView.removeWinningNumbersForm();
  }

  setEvent4Handler() {
    this.view.gameResultView.addCloseClickEvent(
      this.onModalCloseClickHandler.bind(this)
    );
  }

  onModalCloseClickHandler() {
    this.view.gameResultView.close();
  }
}
