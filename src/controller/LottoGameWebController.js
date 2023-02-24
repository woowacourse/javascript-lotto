import LottoGame from '../domain/lottoGame/LottoGame';
import { $, $$ } from '../js/dom';
import { LOTTO_PRICE } from '../utils/constants';
import View from '../view/webView/View';
class LottoGameWebController {
  #lottoGame = new LottoGame();

  init = () => {
    this.bindEventListener();
  };

  handleClickPurchaseButton = () => {
    const money = View.getMoneyInput();

    try {
      this.#lottoGame.purchaseLottos(money);
    } catch (error) {
      alert(error.message);
      return;
    }

    this.renderTemplateAndLottoList();
  };

  renderTemplateAndLottoList = () => {
    if (!View.isRenderedTemplate()) {
      View.renderLottoTemplate();
      this.addEventListenerLottoInput();
    }
    View.renderLottoCount(this.#lottoGame.getLottos().length);
    View.renderLottoList(this.#lottoGame.getLottos());
    View.resetMoneyInput();
  };

  handleClickResultButton = () => {
    const lottoNumber = View.getLottoNumberInput();
    const bonusNumber = View.getBonusNumberInput();

    try {
      this.#lottoGame.generateWinningLotto(lottoNumber, bonusNumber);
    } catch (error) {
      alert(error);
      return;
    }

    this.renderResultModal();
  };

  renderResultModal = () => {
    const winningRankResult = this.#lottoGame.getWinningRankResult();
    const profitRate = this.#lottoGame.getProfitRateOfPrize();
    View.renderRankResult(winningRankResult, profitRate);
    View.showModal();
  };

  handleClickResetButton = () => {
    View.resetTemplate();
    View.closeModal();
  };

  addEventListenerLottoInput = () => {
    $('#result-button').addEventListener('click', this.handleClickResultButton);

    $$('.lotto-number-input').forEach((numberInput) => {
      numberInput.addEventListener('keypress', (e) => {
        if (e.key !== 'Enter') return;
        this.handleClickResultButton();
      });
    });
  };

  addEventListenerPurchaseInput = () => {
    $('#purchase-button').addEventListener('click', this.handleClickPurchaseButton);

    $('#money-input').addEventListener('keypress', (e) => {
      if (e.key !== 'Enter') return;
      this.handleClickPurchaseButton();
    });
  };

  bindEventListener = () => {
    this.addEventListenerPurchaseInput();

    $('#modal-close-button').addEventListener('click', View.closeModal);

    $('#reset-button').addEventListener('click', this.handleClickResetButton);
  };
}

const controller = new LottoGameWebController();
controller.init();
