import { Component, State } from '../shared/models/index.js';
import { PaymentForm, PurchasingForm, LottoDetail, ResultForm, ResultModal } from './components/index.js';
import { LottoMachine, ProfitCalculator } from './models/index.js';
import { $ } from '../shared/utils/DOM.js';
import { UNIT_AMOUNT } from './utils/constants.js';

export default class App extends Component {
  initState() {
    this.state = new State({
      money: 0,
      tickets: [],
      rankCounts: [0, 0, 0, 0, 0], //인덱스 = 순위, value = 당첨 개수.
      earningRate: 0,
    });
    this.machine = new LottoMachine();
    this.calculator = new ProfitCalculator();
  }

  initDOM() {
    this.$paymentSection = $('#payment-section');
    this.$purchasingSection = $('#purchasing-section');
    this.$lottoDetailSection = $('#lotto-detail-section');
    this.$resultSection = $('#result-section');
    this.$modal = $('#modal');
  }

  handleInsertion(money) {
    this.state.setState({ money });
    this.$purchasingSection.style.display = 'block';
    this.$lottoDetailSection.style.display = 'block';
  }

  handlePurchasing(...purchasedTickets) {
    const { money, tickets } = this.state.getState();
    const newMoney = money - UNIT_AMOUNT * purchasedTickets.length;
    const newTickets = [...tickets, ...purchasedTickets];

    this.state.setState({ money: newMoney, tickets: newTickets });

    if (newMoney === 0) {
      this.$resultSection.style.display = 'block';
    }
  }

  handleResult({ rankCounts, earningRate }) {
    this.state.setState({ rankCounts, earningRate });
    this.$modal.classList.add('open');
  }

  close() {
    this.$modal.classList.remove('open');
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
          <div class="modal" id="modal"></div>
        </section>
      </div>`;
  }

  reset() {
    this.initState();
    this.mountTemplate();
    this.initDOM();
    this.mountChildComponents();
  }

  mountChildComponents() {
    new PaymentForm(this.$paymentSection, {
      handleInsertion: this.handleInsertion.bind(this),
    });
    new PurchasingForm(this.$purchasingSection, {
      state: this.state,
      machine: this.machine,
      handlePurchasing: this.handlePurchasing.bind(this),
    });
    new LottoDetail(this.$lottoDetailSection, {
      state: this.state,
    });
    new ResultForm(this.$resultSection, {
      state: this.state,
      calculator: this.calculator,
      handleResult: this.handleResult.bind(this),
    });
    new ResultModal(this.$modal, {
      state: this.state,
      close: this.close.bind(this),
      reset: this.reset.bind(this),
    });
  }
}
