import AppController from './controllers/AppController.js';
import LottoModel from './models/LottoModel.js';
import PaymentSectionView from './views/PaymentSectionView';
import TicketSectionView from './views/TicketSectionView.js';
import WinningNumberSectionView from './views/WinningNumberSectionView.js';
import { $ } from './utils/utils.js';
import { SELECTOR } from './configs/contants.js';

export default class App {
  constructor() {
    const models = {
      lottoModel: new LottoModel(),
    };
    const views = {
      paymentSectionView: new PaymentSectionView($(SELECTOR.PAYMENT_SECTION)),
      ticketSectionView: new TicketSectionView($(SELECTOR.TICKET_SECTION)),
      winningNumberSectionView: new WinningNumberSectionView(
        $(SELECTOR.WINNING_NUMBER_SECTION)
      ),
    };

    this.appController = new AppController(models, views);
  }

  init() {
    this.appController.init();
  }
}
