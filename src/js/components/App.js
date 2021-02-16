import Component from '../lib/core/Component.js';
import { $ } from '../lib/utils/dom.js';
import PaymentInput from './PaymentInput.js';
import TicketView from './TicketView.js';

class App extends Component {
  mountTemplate() {
    this.$target.innerHTML = ` 
      <div class="d-flex justify-center mt-5">
        <div class="w-100">
          <h1 class="text-center">🎱 행운의 로또</h1>
          <form id="payment-input-wrapper" class="mt-5"></form>
          <section id="ticket-view-wrapper" class="mt-9"></section>
        </div>
      </div>
    `;
  }

  mountChildComponents() {
    new PaymentInput($('#payment-input-wrapper'));
    new TicketView($('#ticket-view-wrapper'));
  }
}

export default App;
