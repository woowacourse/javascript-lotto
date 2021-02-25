import PurchaseAmountInput from './PurchaseAmountInput.js';
import PurchasedLotto from './PurchasedLotto.js';
import LottoTicket from '../model/LottoTicket.js';
import WinningNumberInput from './WinningNumberInput.js';
import ResultModal from './ResultModal.js';

export default class App {
  constructor() {
    this.lottoTickets = [];
    this.winningNumber = {};

    this.purchaseAmountInput = new PurchaseAmountInput({
      createLottoTickets: this.createLottoTickets.bind(this),
    });
    this.purchasedLotto = new PurchasedLotto({
      lottoTickets: this.lottoTickets,
    });
    this.winningNumberInput = new WinningNumberInput({
      isVisible: false,
      updateWinningNumber: this.updateWinningNumber.bind(this),
      onShowModal: this.onShowModal.bind(this),
    });
    this.resultModal = new ResultModal({
      isVisible: false,
      lottoTickets: this.lottoTickets,
      winningNumber: this.winningNumber,
      onRestart: this.onRestart.bind(this),
    });
  }

  createLottoTickets(numOfLotto) {
    this.setState({
      lottoTickets: new Array(numOfLotto).fill().map((v) => new LottoTicket()),
    });
  }

  updateWinningNumber(winningNumber) {
    this.setState({ winningNumber });
  }

  onShowModal() {
    this.resultModal.showModal();
  }

  onRestart() {
    this.setState({ lottoTickets: [], winningNumber: {} });
    this.purchaseAmountInput.reset();
  }

  setState({ lottoTickets, winningNumber }) {
    if (lottoTickets) {
      this.lottoTickets = lottoTickets;
      this.purchasedLotto.setState({ lottoTickets: this.lottoTickets });
      this.winningNumberInput.setState({ isVisible: lottoTickets.length > 0 });
      this.resultModal.setState({ lottoTickets: this.lottoTickets });
    }

    if (winningNumber) {
      this.winningNumber = winningNumber;
      this.resultModal.setState({ winningNumber: this.winningNumber });
    }
  }
}
