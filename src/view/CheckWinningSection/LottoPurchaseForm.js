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
      placeholder="금액 (1,000 단위, 최대 10,000원)"
      autofocus
      required
      />
      <button type="submit" class="lotto-purchase-button typo-button">구입</button>
    </div>
  </form>
  `;

  $target;

  constructor($target) {
    this.$target = $target;
  }

  render() {
    this.$target.replaceChildren();
    this.$target.insertAdjacentHTML('afterbegin', this.#template);
    this.$target.addEventListener('submit', (e) => this.handleSubmit(e));

    $('#lotto-purchase-input').focus();
  }

  handleSubmit(e) {
    e.preventDefault();

    const [inputEl] = e.target;

    dispatchCustomEvent($('#app'), {
      eventType: 'purchaseLotto',
      data: inputEl.valueAsNumber,
    });
    this.disableForm(e.target);
  }

  disableForm($form) {
    const [inputEl, buttonEl] = $form;

    inputEl.disabled = true;
    buttonEl.disabled = true;
  }
}

export default LottoPurchaseForm;
