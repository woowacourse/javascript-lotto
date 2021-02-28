import Component from '../../shared/models/Component.js';
import { $, disable } from '../../shared/utils/DOM.js';
import { LOTTO_NUMBER_COUNT } from '../utils/constants.js';

export default class PurchasingForm extends Component {
  constructor($target, props) {
    super($target, props);
  }

  mountTemplate() {
    return `
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
}
