import { Component, State } from '../shared/models/index.js';
import { PaymentForm, PurchasingForm, LottoDetail } from './components/index.js';
import LottoMachine from './models/LottoMachine.js';
import { $ } from '../shared/utils/DOM.js';
import { UNIT_AMOUNT } from './utils/constants.js';

export default class App extends Component {
  initState() {
    this.state = new State({
      money: 0,
      tickets: [],
    });
  }

  initDOM() {
    this.$paymentSection = $('#payment-section');
    this.$purchasingSection = $('#purchasing-section');
    this.$lottoDetailSection = $('#lotto-detail-section');
    this.$resultSection = $('#result-section');
  }

  insert(money) {
    this.state.setState({ money });
    this.$purchasingSection.style.display = 'block';
    this.$lottoDetailSection.style.display = 'block';
  }

  purchase(...purchasedTickets) {
    const { money, tickets } = this.state.getState();
    const newMoney = money - UNIT_AMOUNT * purchasedTickets.length;
    const newTickets = [...tickets, ...purchasedTickets];

    this.state.setState({ money: newMoney, tickets: newTickets });

    if (newMoney === 0) {
      this.$resultSection.style.display = 'block';
    }
  }

  mountTemplate() {
    this.$target.innerHTML = `
      <div class="d-flex justify-center mt-5">
        <section class="w-100">
          <h1 class="text-center">🎱 행운의 로또</h1>
          <section id="payment-section"></section>
          <section id="purchasing-section" class="d-none"></section>
          <section id="lotto-detail-section" class="mt-9 d-none"></section>
          <section id="result-section" class="d-none"></section>
        </section>
      </div>`;
  }

  mountChildComponents() {
    new PaymentForm(this.$paymentSection, {
      insert: this.insert.bind(this),
    });
    new PurchasingForm(this.$purchasingSection, {
      state: this.state,
      machine: new LottoMachine(),
      purchase: this.purchase.bind(this),
    });
    new LottoDetail(this.$lottoDetailSection, {
      state: this.state,
    });
  }
}
