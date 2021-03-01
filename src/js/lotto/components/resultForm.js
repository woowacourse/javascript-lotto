import { Component } from '../../shared/models/index.js';
import { $$, $, disable } from '../../shared/utils/DOM.js';
import { BONUS_NUMBER_COUNT, LOTTO_NUMBER_COUNT, MAX_LOTTO_NUMBER } from '../utils/constants.js';
import { getInputNumbers } from '../utils/util.js';
import { checkValidNumbers } from '../utils/validate.js';

export default class ResultForm extends Component {
  initDOM() {
    this.$form = $('#lotto-result-form');
    this.$winningNumberInputs = $$('[data-winning-number]');
  }

  initEvent() {
    this.$target.addEventListener('input', this.limitInputLength);
    this.$form.addEventListener('submit', this.onSubmit.bind(this));
  }

  limitInputLength({ target }) {
    if (target.dataset.winningNumber === undefined) {
      return;
    }

    const maxLength = String(MAX_LOTTO_NUMBER).length;

    if (target.value.length > maxLength) {
      target.value = target.value.slice(0, maxLength);
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const { tickets } = this.props.state.getState();
    const numbers = getInputNumbers(this.$winningNumberInputs);
    const alertMessage = checkValidNumbers(numbers, LOTTO_NUMBER_COUNT + BONUS_NUMBER_COUNT);

    if (alertMessage) {
      alert(alertMessage);

      return;
    }

    this.props.handleResult(this.props.calculator.getResult(numbers, tickets));
    disable(...this.$winningNumberInputs);
  }

  mountTemplate() {
    this.$target.innerHTML = `
      <form class="mt-9" id="lotto-result-form" novalidate>
        <label class="flex-auto d-inline-block mb-3">
          지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.
        </label>
        <div class="d-flex">
          <div>
            <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
            <div>${winningNumberInputs()}</div>
          </div>
          <div class="bonus-number-container flex-grow">
            <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
            <div class="d-flex justify-center">
              <input
                type="number"
                class="bonus-number text-center"
                id="bonus-number"
                data-winning-number="6"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          class="open-result-modal-button mt-5 btn btn-cyan w-100"
          id="result-submit"
        >
        결과 확인하기
        </button>
      </form>
    `;

    function winningNumberInputs() {
      let html = '';

      for (let idx = 0; idx < LOTTO_NUMBER_COUNT; idx++) {
        html += `
          <input
            type="number"
            class="winning-number mx-1 text-center"
            data-winning-number=${idx}
          />`;
      }

      return html;
    }
  }
}
