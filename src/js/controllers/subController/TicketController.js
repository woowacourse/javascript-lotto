import TicketView from '../../views/subViews/TicketView.js';
import { SELECTOR } from '../../configs/contants.js';

export default class TicketController {
  constructor(controller) {
    this.lottoModel = controller.lottoModel;
    this.ticketView = new TicketView(SELECTOR.TICKET_SECTION);
    this.ticketView.render();
    this.renderTicketListView();
    this.setEventHandler();
  }

  renderTicketListView() {
    const lottoList = this.lottoModel.getLottoList();
    this.ticketView.updateTicketListView(lottoList);
  }

  setEventHandler() {
    this.ticketView.bindOnClickNumberToggle(
      this.didClickNumberToggle.bind(this)
    );
  }

  didClickNumberToggle() {
    this.renderTicketListView();
  }
}
