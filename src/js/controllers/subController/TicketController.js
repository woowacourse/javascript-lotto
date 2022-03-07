import TicketView from '../../views/subViews/TicketView.js';
import { SELECTOR } from '../../configs/contants.js';

export default class TicketController {
  constructor(lottoController, lottoModel) {
    this.lottoController = lottoController;
    this.lottoModel = lottoModel;
  }

  renderView() {
    this.ticketView = new TicketView(SELECTOR.TICKET_SECTION);
    this.ticketView.render();
    this.renderTicketListView();
    this.setEventHandler();
  }

  renderTicketListView() {
    const { lottoList } = this.lottoModel.getState();
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
