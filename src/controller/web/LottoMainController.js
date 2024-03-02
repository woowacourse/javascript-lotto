import { $, $$ } from '../../util/domSelector';
import LottoMoneyController from './LottoMoneyController';
import WinLottoController from './WinLottoController';
import LottoResultModalController from './LottoResultModalController';
import { renderError, resetElementValue } from '../../util/view';
import WinLottoView from '../../view/web/WinLottoView';
import MyLottoInfoView from '../../view/web/MyLottoInfoView';
import LottoResultModalView from '../../view/web/LottoResultModalView';
import { checkInputEmpty } from '../../validation/web/lottoNumbersValidation';

class LottoMainController {
  constructor() {
    this.lottos = [];
    this.lottoMoneyController = new LottoMoneyController();
    this.winLottoController = new WinLottoController();
    this.lottoResultModalController = new LottoResultModalController();
  }

  play() {
    WinLottoView.renderNumbersInputs();
    this.bindEvents();
  }

  bindEvents() {
    $('#money-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.submitMoneyForm($('#money-input').value);
    });
    $('#winning-lotto-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.submitWinLotto();
    });
    $('#lotto-game-restart-button').addEventListener('click', () => {
      this.restartLotto();
    });
  }

  submitMoneyForm() {
    const validMoney = this.lottoMoneyController.validateMoney($('#money-input').value);
    if (validMoney) {
      const [lottos, lottosNumbers] = this.lottoMoneyController.convertMoneyToLotto(validMoney);
      this.lottos = lottos;
      this.lottoMoneyController.showLottosInfo(lottosNumbers);
    }
    resetElementValue($('#money-input'));
    WinLottoView.resetWinningLottoNumbers();
  }

  submitWinLotto() {
    try {
      checkInputEmpty([...$$('.number-input')]);
    } catch ({ message }) {
      return renderError($('#win-lotto-error'), message);
    }
    const [winNumbers, bonusNumber] = this.winLottoController.seperateLottoNumbers();
    const winLotto = this.winLottoController.makeWinLotto(winNumbers, bonusNumber);
    this.lottoResultModalController.showWinResults(this.lottos, winLotto);
  }

  restartLotto() {
    this.lottos = [];
    MyLottoInfoView.hideSection();
    LottoResultModalView.hideSection();
    MyLottoInfoView.deleteLottoInfo();
    LottoResultModalView.deleteModalInfo();
    $('#money-input').focus();
  }
}

export default LottoMainController;
