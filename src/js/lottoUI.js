import { $, $$ } from './utils/util.js';
import { UI_SETTINGS, LOTTO_SETTINGS } from './utils/constants/settings.js';
import { DOM_CLASSES, DOM_IDS } from './utils/constants/dom.js';

export default class LottoUI {
  initUI() {
    this.renderMoneyInputUI();
  }

  renderMoneyInputUI() {
    this.showElement(`.${DOM_CLASSES.MONEY_INPUT_CONTAINER}`);
  }

  renderLottoAmountUI() {
    this.showElement(`.${DOM_CLASSES.LOTTO_AMOUNT_CONTAINER}`);
  }

  renderManualSelectUI(amount) {
    this.showElement(`.${DOM_CLASSES.MANUAL_SELECT_CONTAINER}`);
    $(`.${DOM_CLASSES.MANUAL_SELECT_FORM}`).innerHTML = this._getTemplateManualSelects(amount);
  }

  renderCheckLottoUI(numbersBundle) {
    this.showElement(`.${DOM_CLASSES.LOTTO_CONTAINER}`);
    $(`.${DOM_CLASSES.LOTTO_LABEL}`).innerHTML = `총 ${numbersBundle.length}개를 구매하였습니다.`
    $(`#${DOM_IDS.CHECK_LOTTO_SWITCH}`).checked = UI_SETTINGS.DEFAULT_VISIBILITY;
    $(`.${DOM_CLASSES.LOTTO_TICKETS}`).innerHTML = this._getTemplateCheckLottoUI(numbersBundle);
  }

  renderResultInputUI() {
    this.showElement(`.${DOM_CLASSES.RESULT_INPUT_CONTAINER}`);
    $(`.${DOM_CLASSES.RESULT_INPUT_WINNING_NUMBERS}`).innerHTML = this._getTemplateResultWinningNumbers();
  }

  renderWinningResult(winnings, earningRate) {
    this.openModal();
    [...$$(`.${DOM_CLASSES.MODAL_WINNING_COUNT}`)].forEach(($winningCount) => {
      const rank = $winningCount.dataset.rank;
      $winningCount.textContent = `${winnings[rank]}개`;
    });

    $(`.${DOM_CLASSES.MODAL_EARNING_RATE}`).textContent = `당신의 총 수익률은 ${earningRate}%입니다.`;
  }

  toggleLottoNumbers() {
    $$(`.${DOM_CLASSES.LOTTO_TICKET_NUMBER}`).forEach(lottoTicket => {
      lottoTicket.classList.toggle('hidden');
    });
  }

  showElement(selector) {
    $(selector).classList.remove('hidden');

  }

  hideElement(selector) {
    $(selector).classList.add('hidden');
  }

  openModal() {
    $(`.${DOM_CLASSES.MODAL}`).classList.add('open');
  }

  closeModal() {
    $(`.${DOM_CLASSES.MODAL}`).classList.remove('open');
  }

  disablePreviousForm(formElement) {
    const buttons = formElement.getElementsByTagName('button');
    const inputElements = formElement.getElementsByTagName('input');
    [...buttons].forEach((button) => {
      button.disabled = true;
    });
    [...inputElements].forEach((inputElement) => {
      inputElement.disabled = true;
    });
  }

  initAllForm() {
    $$(`form button`).forEach((button) => button.disabled = false);
    $$(`form input`).forEach((input) => {
      input.disabled = false;
      input.value = '';
    });
  }

  _getTemplateManualSelects(amount) {
    const templates = new Array(amount).fill(0).map((template, lottoIdx) =>
      `<span class= "mx-1 text-4xl mt-2 ${DOM_CLASSES.CSS_LOTTO_TICKET}">
        🎟️
          ${this._getTemplateManualInputs(lottoIdx)}
        </span>
      `);

    return `
    ${templates.join('')}
    <button type="submit" class="btn btn-cyan mt-5 w-100 ${DOM_CLASSES.MANUAL_SELECT_SUBMIT}">수동구매</button>
    `
  }

  _getTemplateManualInputs(lottoIdx) {
    const templates = new Array(LOTTO_SETTINGS.LOTTO_NUMBER_SIZE).fill(0)
      .map((template, numberIdx) =>
        `
        <input 
        type="number" 
        min="${LOTTO_SETTINGS.MIN_LOTTO_NUMBER}" 
        max="${LOTTO_SETTINGS.MAX_LOTTO_NUMBER}"
        class="winning-number mx-1 text-center ${DOM_CLASSES.MANUAL_SELECT_INPUT}"
        aria-label="${lottoIdx + 1}번째 로또 중 ${numberIdx + 1}번째 숫자"
        required
        />
        `);
    return templates.join('');
  }

  _getTemplateCheckLottoUI(numbersBundle) {
    return numbersBundle.map(numbers => `
      <span class= "mx-3 text-4xl lotto-ticket ${DOM_CLASSES.LOTTO_TICKET}">
      🎟️
        <span class="${DOM_CLASSES.LOTTO_TICKET_NUMBER}${UI_SETTINGS.DEFAULT_VISIBILITY ? '' : ' hidden'}">
          ${numbers.join(', ')}
        </span>
      </span>
    `).join('');
  }

  _getTemplateResultWinningNumbers() {
    const templates = new Array(LOTTO_SETTINGS.LOTTO_NUMBER_SIZE).fill(0)
      .map((template, idx) => `
      <input 
        type="number" 
        min="${LOTTO_SETTINGS.MIN_LOTTO_NUMBER}" 
        max="${LOTTO_SETTINGS.MAX_LOTTO_NUMBER}"
        class="winning-number mx-1 text-center ${DOM_CLASSES.RESULT_WINNING_NUMBER}"
        aria-label="당첨번호 ${idx + 1}번째 숫자"
        required
        />`);
    return templates.join('');
  }
}
