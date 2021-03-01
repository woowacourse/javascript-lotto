import { Component, State } from '../shared/models/index.js';
import { PaymentForm, PurchasingForm, LottoDetail, ResultForm } from './components/index.js';
import LottoMachine from './models/LottoMachine.js';
import { $ } from '../shared/utils/DOM.js';
import { UNIT_AMOUNT } from './utils/constants.js';

export default class App extends Component {
  initState() {
    this.state = new State({
      money: 0,
      tickets: [],
      rankCount: [0, 0, 0, 0, 0], //인덱스 = 순위, value = 당첨 개수.
      earningRate: 0,
    });
  }

  initDOM() {
    this.$paymentSection = $('#payment-section');
    this.$purchasingSection = $('#purchasing-section');
    this.$lottoDetailSection = $('#lotto-detail-section');
    this.$resultSection = $('#result-section');
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

  handleResult(winningNumbers) {
    const { tickets } = this.state.getState();
    const { rankCount, earningRate } = new ProfitCalculator(winningNumbers, tickets);

    this.state.setState({ rankCount, earningRate });
    this.$modal.classList.add('open');
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
      handleInsertion: this.handleInsertion.bind(this),
    });
    new PurchasingForm(this.$purchasingSection, {
      state: this.state,
      machine: new LottoMachine(),
      handlePurchasing: this.handlePurchasing.bind(this),
    });
    new LottoDetail(this.$lottoDetailSection, {
      state: this.state,
    });
    new ResultForm(this.$resultSection, {
      state: this.state,
      handleResult: this.handleResult.bind(this),
    });
  }
}
