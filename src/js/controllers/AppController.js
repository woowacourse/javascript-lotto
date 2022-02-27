import Controller from '../core/Controller.js';
import LottoModel from '../models/LottoModel.js';
import PaymentSectionView from '../views/PaymentSectionView';
import TicketSectionView from '../views/TicketSectionView.js';
import WinningNumberSectionView from '../views/WinningNumberSectionView.js';
import { $ } from '../utils/utils.js';
import { SELECTOR } from '../configs/contants.js';

export default class AppController extends Controller {
  constructor() {
    super();

    this.lottoModel = new LottoModel();
    this.paymentSectionView = new PaymentSectionView(
      $(SELECTOR.PAYMENT_SECTION)
    );
    this.ticketSectionView = new TicketSectionView($(SELECTOR.TICKET_SECTION));
    this.winningNumberSectionView = new WinningNumberSectionView(
      $(SELECTOR.WINNING_NUMBER_SECTION)
    );
  }

  init() {
    this.lottoModel.init((message) => {
      this.ticketSectionView.update(message);
    });

    this.bindEventHandlers();
  }

  bindEventHandlers() {
    this.paymentSectionView.bindOnClickPaymentSubmit(this.purchase.bind(this));
    this.ticketSectionView.bindOnClickNumberToggle();
  }

  issueLottoWithCount(count) {
    this.lottoModel.update({
      lottoList: Array(count)
        .fill()
        .map(() => LottoModel.issueLotto()),
    });

    return this.lottoModel.getState();
  }

  purchase(amount) {
    const message = this.issueLottoWithCount(LottoModel.getLottoCount(amount));

    this.ticketSectionView.update(message);
  }
}
