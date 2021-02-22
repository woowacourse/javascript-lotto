import PurchaseAmountInput from './PurchaseAmountInput.js';
import PurchasedLotto from './PurchasedLotto.js';
import LottoTicket from '../model/LottoTicket.js';
import WinningNumberInput from './WinningNumberInput.js';
import ResultModal from './ResultModal.js';

export default class App {
  constructor() {
    this.lottoTickets = [];

    this.purchaseAmountInput = new PurchaseAmountInput({
      createLottoTickets: this.createLottoTickets.bind(this),
    });
    this.purchasedLotto = new PurchasedLotto({
      lottoTickets: this.lottoTickets,
    });
    this.winningNumberInput = new WinningNumberInput({
      isVisible: false,
      onShowModal: this.onShowModal.bind(this),
    });
    this.resultModal = new ResultModal({
      isVisible: false,
    });
  }

  createLottoTickets(numOfLotto) {
    this.setState({
      lottoTickets: new Array(numOfLotto).fill().map((v) => new LottoTicket()),
    });
  }

  onShowModal() {
    this.resultModal.setState({ isVisible: true });
  }

  setState({ lottoTickets }) {
    this.lottoTickets = lottoTickets;
    this.purchasedLotto.setState({ lottoTickets: this.lottoTickets });
    this.winningNumberInput.setState({ isVisible: lottoTickets.length > 0 ? true : false });
  }
}
