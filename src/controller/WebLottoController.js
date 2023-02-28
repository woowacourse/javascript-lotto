import '../../style.css';
import LottoGame from './domain/LottoGame';
import LottoValidator from './validators/LottoValidator';
import WebView from '../view/WebView';
import { $, $$ } from '../util/querySelector';

class WebViewController {
  play() {
    $('#purchase__lotto__form').addEventListener('submit', (e) => this.handleUserBudgetSubmit(e));
    $('#winning__numbers__form').addEventListener('submit', (e) =>
      this.handleWinningNumberSubmit(e)
    );
    $('.restart__btn').addEventListener('click', (e) => this.handleRestart(e));
    WebView.addEventListenerModalClose();
  }

  handleUserBudgetSubmit(e) {
    e.preventDefault();
    const userBudget = $('#input__budget').value;

    WebView.show('.winning__numbers__container', '#purchased__user__lotto');
    $('.number__box1').focus();

    this.#issueLottoTickets(userBudget);
    this.#printLottoTickets();
  }

  #issueLottoTickets(userBudget) {
    this.lottoGame = new LottoGame(userBudget);
  }

  #printLottoTickets() {
    const lottoTickets = this.lottoGame.getLottoTickets();

    WebView.printLottoTicketCount(lottoTickets.length);
    WebView.printLottoTickets(lottoTickets);
  }

  handleWinningNumberSubmit(e) {
    e.preventDefault();
    this.lottoGame.initializeLottoRankResult();

    const { winningNumbers, bonusNumber } = this.getWinningNumbers();

    if (
      this.validateWinningNumbers(winningNumbers) &&
      this.validateBonusNumber(winningNumbers, bonusNumber)
    )
      this.printLottoGameResult(winningNumbers, bonusNumber);
  }

  getWinningNumbers() {
    return {
      winningNumbers: [...$$('.number__box')]
        .map((lottoNumber) => Number(lottoNumber.value))
        .slice(0, 6),
      bonusNumber: Number($('.bonus__box').value),
    };
  }

  validateWinningNumbers(winningNumbers) {
    try {
      LottoValidator.checkLottoNumbers(winningNumbers);
      return true;
    } catch (error) {
      alert(error.message);
      [...$$('.number__box')].slice(0, 6).map((lottoNumber) => (lottoNumber.value = ''));
      return false;
    }
  }

  validateBonusNumber(winningNumbers, bonusNumber) {
    try {
      LottoValidator.checkBonusNumber(winningNumbers, bonusNumber);
      return true;
    } catch (error) {
      alert(error.message);
      $('.bonus__box').value = '';
      return false;
    }
  }

  printLottoGameResult(winningNumbers, bonusNumber) {
    const lottoRanksResult = this.lottoGame.getLottoRankResult(winningNumbers, bonusNumber);
    const profitRate = this.lottoGame.calculateProfitRate(this.lottoGame.calculateTotalPrize());

    WebView.printLottoRanksResult(lottoRanksResult);
    WebView.printProfitRate(profitRate);
  }

  handleRestart() {
    WebView.hide(
      '.winning__numbers__container',
      '#purchased__user__lotto',
      '.lotto__statistics__container'
    );
    $$('.number__box').forEach((lottoNumber) => (lottoNumber.value = ''));
    $('#input__budget').value = '';
  }
}

export default WebViewController;
