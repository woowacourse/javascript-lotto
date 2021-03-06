import PurchasedLotto from './PurchasedLotto.js';
import LottoTicket from '../model/LottoTicket.js';
import WinningNumberInput from './WinningNumberInput.js';
import ResultModal from './ResultModal.js';
import LottoPurchase from './LottoPurchase.js';

export default class App {
  constructor() {
    this.lottoTickets = [];
    this.winningNumber = {};

    this.lottoPurchase = new LottoPurchase({
      updateLottoTickets: this.updateLottoTickets.bind(this),
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
      lottoTickets: this.lottoTickets,
      winningNumber: this.winningNumber,
      onRestart: this.onRestart.bind(this),
    });
  }

  createLottoTickets(numOfLotto) {
    return Array(numOfLotto)
      .fill()
      .map((v) => new LottoTicket());
  }

  updateLottoTickets({ manualLottoTickets, numOfRest }) {
    const restLottoTickets = this.createLottoTickets(numOfRest);

    this.setState({
      lottoTickets: [...manualLottoTickets, ...restLottoTickets],
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
      this.winningNumberInput.setState({ isVisible: this.lottoTickets.length > 0 });
      this.resultModal.setState({ lottoTickets: this.lottoTickets });
    }

    if (winningNumber) {
      this.winningNumber = winningNumber;
      this.resultModal.setState({ winningNumber: this.winningNumber });
    }
  }
}
