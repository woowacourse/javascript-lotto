import LottoGame from '../domain/lottoGame/LottoGame';
import { $, $$ } from '../js/dom';
import View from '../view/webView/View';
class LottoGameWebController {
  #lottoGame = new LottoGame();

  init() {
    this.bindEventListener();
  }

  handleClickPurchaseButton = () => {
    const money = View.getMoneyInput();
    try {
      this.#lottoGame.purchaseLottos(money);
      if (!$('#lotto-list')) View.renderLottoTemplate();
      View.renderLottoCount(money / 1000);
      View.renderLottoList(this.#lottoGame.getLottos());
      $('#result-button').addEventListener('click', this.handleClickResultButton);
    } catch (error) {
      alert(error.message);
    }
    View.resetMoneyInput();
  };

  handleClickResultButton = () => {
    const lottoNumber = View.getLottoNumberInput();
    const bonusNumber = View.getBonusNumberInput();
    try {
      this.#lottoGame.generateWinningLotto(lottoNumber, bonusNumber);
      const winningRankResult = this.#lottoGame.getWinningRankResult();
      const profitRate = this.#lottoGame.getProfitRateOfPrize();
      View.renderRankResult(winningRankResult, profitRate);
      View.showModal();
    } catch (error) {
      alert(error);
    }
  };

  handleClickResetButton = () => {
    View.resetTemplate();
    View.closeModal();
  };

  bindEventListener() {
    $('#purchase-button').addEventListener('click', this.handleClickPurchaseButton);

    $('#modal-close-button').addEventListener('click', View.closeModal);

    $('#reset-button').addEventListener('click', this.handleClickResetButton);
  }
}

const controller = new LottoGameWebController();
controller.init();
