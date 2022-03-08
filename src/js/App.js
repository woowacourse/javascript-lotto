import AppController from './controllers/AppController.js';
import LottoModel from './models/LottoModel.js';
import PaymentSectionView from './views/PaymentSectionView';
import TicketSectionView from './views/TicketSectionView.js';
import WinningNumberSectionView from './views/WinningNumberSectionView.js';
import ResultModalWindowView from './views/ResultModalWindowView.js';
import { $ } from './utils/utils.js';
import { DOM_STRING } from './configs/contants.js';

export default class App {
  constructor() {
    const models = {
      lottoModel: new LottoModel(),
    };
    const views = {
      paymentSectionView: new PaymentSectionView(
        $(DOM_STRING.PAYMENT_SECTION, 'id')
      ),
      ticketSectionView: new TicketSectionView(
        $(DOM_STRING.TICKET_SECTION, 'id')
      ),
      winningNumberSectionView: new WinningNumberSectionView(
        $(DOM_STRING.WINNING_NUMBER_SECTION, 'id')
      ),
      resultModalWindowView: new ResultModalWindowView(
        $(DOM_STRING.RESULT_MODAL_WINDOW, 'id')
      ),
    };

    this.appController = new AppController(models, views);
  }

  init() {
    this.appController.init();
  }
}
