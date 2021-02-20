import Component from '../lib/core/Component.js';
import State from '../lib/core/State.js';
import { $ } from '../lib/utils/dom.js';
import PaymentForm from './PaymentForm.js';
import ResultModal from './ResultModal.js';
import TicketList from './TicketList.js';
import WinningNumberForm from './WinningNumberForm.js';
import { getProfitPercentage, getWinners } from '../lib/utils/ticket.js';

class App extends Component {
  initStates() {
    this.tickets = new State([]);
    this.open = new State(false);
    this.winningNumber = new State({});
    this.result = new State({
      winners: { first: 0, second: 0, third: 0, fourth: 0, fifth: 0 },
      profitPercentage: 0,
    });
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
    new WinningNumberForm($('#winning-number-form-wrapper'), {
      open: this.open,
      winningNumber: this.winningNumber,
      tickets: this.tickets,
    });
    new ResultModal($('.modal'), {
      open: this.open,
      result: this.result,
      reset: this.reset.bind(this),
    });
  }

  subscribeStates() {
    this.open.subscribe(this.toggleModal.bind(this));
    this.winningNumber.subscribe(this.calculateResult.bind(this));
  }

  toggleModal() {
    if (this.open.get()) {
      $('.modal').classList.add('open');
    } else {
      $('.modal').classList.remove('open');
    }
  }

  calculateResult() {
    const winners = getWinners(this.tickets.get(), this.winningNumber.get());
    const profitPercentage = getProfitPercentage(
      this.tickets.get().length,
      winners
    );
    this.result.set({
      winners,
      profitPercentage,
    });
  }

  initEvent() {
    this.$target.addEventListener('click', ({ target }) => {
      if (target.classList.contains('modal')) {
        this.open.set(false);
      }
    });
  }

  reset() {
    this.tickets.set([]);
    this.open.set(false);
    this.winningNumber.set({});
  }
}

export default App;
