import { Component } from '../../shared/models/index.js';
import { $$, $ } from '../../shared/utils/DOM.js';
import { LOTTO_NUMBER_COUNT, MAX_LOTTO_NUMBER, MSG_SPENT_ALL_MONEY, UNIT_AMOUNT } from '../utils/constants.js';
import { getInputNumbers } from '../utils/util.js';
import { checkValidNumbers } from '../utils/validate.js';

export default class PurchasingForm extends Component {
  constructor($target, props) {
    super($target, props);
    this.props.state.subscribe(this.renderState.bind(this));
  }

  initDOM() {
    this.$manualForm = $('#manual-purchasing-form');
    this.$lottoNumberInputs = $$('[data-lotto-number]');
    this.$manualButton = $('#manual-purchasing-button');
    this.$autoButton = $('#auto-purchasing-button');
    this.$remains = $('#remains');
  }

  initEvent() {
    this.$target.addEventListener('input', this.limitInputLength);
    this.$manualForm.addEventListener('submit', this.onSubmit.bind(this));
    this.$autoButton.addEventListener('click', this.onClick.bind(this));
  }

  limitInputLength({ target }) {
    if (target.dataset.lottoNumber === undefined) {
      return;
    }

    const maxLength = String(MAX_LOTTO_NUMBER).length;

    if (target.value.length > maxLength) {
      target.value = target.value.slice(0, maxLength);
    }
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.props.state.getState().money === 0) {
      alert(MSG_SPENT_ALL_MONEY);

      return;
    }

    const numbers = getInputNumbers(this.$lottoNumberInputs);
    const alertMessage = checkValidNumbers(numbers, LOTTO_NUMBER_COUNT);

    if (alertMessage) {
      alert(alertMessage);

      return;
    }

    this.props.handlePurchase(this.props.machine.publishLotto(numbers));
    this.$lottoNumberInputs.forEach($input => {
      $input.value = '';
    });
  }

  onClick() {
    const { money } = this.props.state.getState();
    const tickets = [];

    if (money === 0) {
      alert(MSG_SPENT_ALL_MONEY);

      return;
    }

    for (let i = 0; i < money / UNIT_AMOUNT; i++) {
      tickets.push(this.props.machine.publishLotto());
    }
    this.props.handlePurchase(...tickets);
  }

  mountTemplate() {
    this.$target.innerHTML = `
      <form class="mt-5" id="manual-purchasing-form" novalidate>
        <label class="mb-2 d-inline-block">원하는 로또 번호를 입력해주세요. (1 - 45)</label>
        <div class="d-flex justify-between items-center">
          <div>${lottoNumberInputs()}</div>
          <button type="submit" class="btn btn-cyan" id="manual-purchasing-submit">
            확인
          </button>
        </div>
      </form>
      <button type="click" class="btn btn-cyan mt-4 w-100" id="auto-purchasing-button">
        남은 금액은 자동 구매할래요. (잔액: <span id="remains"></span> 원)
      </button>
    `;

    function lottoNumberInputs() {
      let html = '';

      for (let idx = 0; idx < LOTTO_NUMBER_COUNT; idx++) {
        html += `
          <input
            type="number"
            class="lotto-number mx-1 text-center"
            data-lotto-number=${idx}
          />`;
      }

      return html;
    }
  }

  renderState() {
    this.$remains.innerText = `${this.props.state.getState().money}`;
  }
}
