import { $, dispatchCustomEvent } from '../../utils/dom';

class LottoPurchaseForm {
  #template = /* html */ `
  <form class="lotto-purchase-form">  
    <label for="lotto-purchase-input">구입할 금액을 입력해주세요.</label>
    <div class="purchase-input-container">
      <input
      id="lotto-purchase-input"
      type="number"
      min="1000"
      max="10000"
      step="1000"
      placeholder="금액 (1,000 단위)"
      autofocus
      required
      />
      <button type="submit" class="lotto-purchase-button">구입</button>
    </div>
  </form>
  `;

  $target;

  constructor($target) {
    this.$target = $target;
  }

  render() {
    this.$target.insertAdjacentHTML('afterbegin', this.#template);
    this.$target.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  handleSubmit(e) {
    e.preventDefault();

    const [inputEl, buttonEl] = e.target;

    dispatchCustomEvent($('#app'), {
      eventType: 'purchaseLotto',
      data: inputEl.valueAsNumber,
    });
    inputEl.disabled = true;
    buttonEl.disabled = true;
  }
}

export default LottoPurchaseForm;
