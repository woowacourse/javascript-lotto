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
      step="1000"
      placeholder="금액 (1,000 단위)"
      required
      />
      <button type="submit" class="lotto-purchase-button">구입</button>
    </div>
  </form>
  `;

  $target;

  constructor($target) {
    this.$target = $target;
    this.render();
    this.$target.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  render() {
    this.$target.insertAdjacentHTML('afterbegin', this.#template);
  }

  handleSubmit(e) {
    e.preventDefault();

    const [inputEl] = e.target;

    dispatchCustomEvent($('#app'), {
      eventType: 'purchaseLotto',
      data: inputEl.valueAsNumber,
    });
    $('#lotto-purchase-input').disabled = true;
    $('.lotto-purchase-button').disabled = true;
  }
}

export default LottoPurchaseForm;
