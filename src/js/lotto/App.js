import Component from '../shared/models/Component.js';
import State from '../shared/models/State.js';
import PaymentForm from './components/paymentForm.js';
import PurchasingForm from './components/purchasingForm.js';
import { $ } from '../shared/utils/DOM.js';

export default class App extends Component {
  constructor($target) {
    super($target);
    this.initState();
  }

  initState() {
    this.state = new State({
      money: 0,
      tickets: [],
    });
  }

  initDOM() {
    this.$paymentSection = $('#payment-section');
    this.$purchasingSection = $('#purchasing-section');
  }

  insert(money) {
    this.state.setState({ money });
  }

  renderPurchasingForm() {
    this.$purchasingSection.style.display = 'block';
  }

  mountTemplate() {
    return `
      <div class="d-flex justify-center mt-5">
        <section class="w-100">
          <h1 class="text-center">🎱 행운의 로또</h1>
          <section id="payment-section"></section>
          <section id="purchasing-section" class="d-none"></section>
          <section id="result-section" class="d-none"></section>
        </section>
      </div>`;
  }

  mountChildComponents() {
    new PaymentForm(this.$paymentSection, {
      insert: this.insert.bind(this),
      render: this.renderPurchasingForm.bind(this),
    });
    new PurchasingForm(this.$purchasingSection, {});
  }
}
