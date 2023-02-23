import '../../index.css';
import LottoGame from '../domain/LottoGame';
import { $, $$ } from '../util/querySelector';
import LottoValidator from '../validators/LottoValidator';
import WebView from '../view/WebView';

class WebLottoGameController {
  play() {
    $('#user-budget-form').addEventListener('submit', (e) => this.handleUserBudgetSubmit(e));
    $('#winning-number-form').addEventListener('submit', (e) => this.handleWinningNumberSubmit(e));
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
}

export default WebLottoGameController;
