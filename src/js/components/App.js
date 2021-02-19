import Component from '../lib/core/Component.js';
import State from '../lib/core/State.js';
import { $ } from '../lib/utils/dom.js';
import PaymentForm from './PaymentForm.js';
import ResultModal from './ResultModal.js';
import TicketList from './TicketList.js';
import WinningNumberForm from './WinningNumberForm.js';

class App extends Component {
  initStates() {
    this.tickets = new State([]);
  }

  mountTemplate() {
    this.$target.innerHTML = `
      <div class="d-flex justify-center mt-5">
        <div class="w-100">
          <h1 class="text-center">🎱 행운의 로또</h1>
          <form id="payment-form-wrapper" class="mt-5"></form>
          <section id="ticket-view-wrapper" class="mt-9"></section>
          <form id="winning-number-form-wrapper" class="mt-9"></form>
        </div>
      </div>
      <div class="modal"></div>
    `;
  }

  mountChildComponents() {
    new PaymentForm($('#payment-form-wrapper'), { tickets: this.tickets });
    new TicketList($('#ticket-view-wrapper'), { tickets: this.tickets });
    new WinningNumberForm($('#winning-number-form-wrapper'));
    new ResultModal($('.modal'));
  }
}

export default App;
