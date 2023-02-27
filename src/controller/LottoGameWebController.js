import LottoGame from '../domain/lottoGame/LottoGame';
import View from '../view/webView/View';
import { $ } from '../js/dom';

class LottoGameWebController {
  #lottoGame = new LottoGame();

  constructor() {
    this.bindEventListener();
  }

  handleClickPurchaseButton = (event) => {
    event.preventDefault();
    const $moneyInput = event.target.querySelector('#money-input');
    const money = $moneyInput.value;

    try {
      this.#lottoGame.purchaseLottos(money);
    } catch (error) {
      alert(error.message);
      return;
    }

    this.renderTemplateAndLottoList();
    $moneyInput.value = '';
  };

  renderTemplateAndLottoList = () => {
    if (!View.isRenderedTemplate()) {
      View.renderLottoTemplate();
      $('#winning-lotto-form').addEventListener('submit', this.handleClickResultButton);
    }
    View.renderLottoCount(this.#lottoGame.getLottos().length);
    View.renderLottoList(this.#lottoGame.getLottos());
  };

  handleClickResultButton = (event) => {
    event.preventDefault();

    const lottoNumber = [...event.target.querySelectorAll('.winning-number')]
      .filter((input) => input.value !== '')
      .map((input) => Number(input.value));
    const bonusNumber = event.target.querySelector('.bonus-number').value;

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

  handleClickResetButton = (event) => {
    View.resetTemplate();

    const $modalBackground = event.target.closest('#modal-background');
    $modalBackground.style.display = 'none';
  };

  bindEventListener = () => {
    $('#purchase-form').addEventListener('submit', this.handleClickPurchaseButton);

    $('#modal-background').addEventListener('click', (event) => {
      if (event.target.id !== 'modal-background') return;
      event.target.style.display = 'none';
    });

    $('#modal-close-button').addEventListener('click', (event) => {
      const $modalBackground = event.target.closest('#modal-background');
      $modalBackground.style.display = 'none';
    });

    $('#reset-button').addEventListener('click', this.handleClickResetButton);
  };
}

new LottoGameWebController();
