import '../../index.css';
import LottoGame from '../domain/LottoGame';
import { $, $$ } from '../util/querySelector';
import LottoValidator from '../validators/LottoValidator';
import WebView from '../view/WebView';

class WebLottoGameController {
  play() {
    $('#user-budget-form').addEventListener('submit', (e) => this.handleUserBudgetSubmit(e));
    $('#winning-numbers-form').addEventListener('submit', (e) => this.handleWinningNumberSubmit(e));
    $('#modal-close-area').addEventListener('click', (e) => this.handleModalClose(e));
    $('#restart-button').addEventListener('click', (e) => this.handleRestart(e));
  }

  handleUserBudgetSubmit(e) {
    e.preventDefault();
    const userBudget = $('#user-budget-input').value;

    this.#issueLottoTickets(userBudget);
    this.#printLottoTickets();
    WebView.showHiddenSection();
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

    const lottoNumbers = [...$$('.lotto-number-input')].map((lottoNumber) =>
      Number(lottoNumber.value)
    );
    const winningNumbers = lottoNumbers.slice(0, 6);
    const bonusNumber = $('#bonus-number-input').value;

    const isValidWinningNumber = this.validateWinningNumbers(winningNumbers);
    const isValidBonusNumber = this.validateBonusNumber(winningNumbers, bonusNumber);

    if (isValidWinningNumber && isValidBonusNumber)
      this.printLottoGameResult(winningNumbers, bonusNumber);
  }

  validateWinningNumbers(winningNumbers) {
    try {
      LottoValidator.checkLottoNumbers(winningNumbers);
      return true;
    } catch (error) {
      alert(error.message);
      [...$$('.lotto-number-input')].slice(0, 6).map((lottoNumber) => (lottoNumber.value = ''));
      return false;
    }
  }

  validateBonusNumber(winningNumbers, bonusNumber) {
    try {
      LottoValidator.checkBonusNumber(winningNumbers, bonusNumber);
      return true;
    } catch (error) {
      alert(error.message);
      $('#bonus-number-input').value = '';
      return false;
    }
  }

  printLottoGameResult(winningNumbers, bonusNumber) {
    const lottoRanksResult = this.lottoGame.getLottoRankResult(winningNumbers, bonusNumber);
    const profitRate = this.lottoGame.calculateProfitRate(this.lottoGame.calculateTotalPrize());

    WebView.printLottoRanksResult(lottoRanksResult);
    WebView.printProfitRate(profitRate);
  }

  handleModalClose() {
    $('#modal').classList.add('hidden');
  }

  handleRestart() {
    $('#modal').classList.add('hidden');
    WebView.hideShowingSection();
    [...$$('.lotto-number-input')].map((lottoNumber) => (lottoNumber.value = ''));
    $('#user-budget-input').value = '';
  }
}

export default WebLottoGameController;
