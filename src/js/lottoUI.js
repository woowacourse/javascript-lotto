import { $, $$ } from './utils/util.js';
import { UI_SETTINGS, LOTTO_SETTINGS, RANK } from './utils/constants/settings.js';
import { DOM_CLASSES, DOM_IDS } from './utils/constants/dom.js';

export default class LottoUI {
  initUI() {
    this.renderMoneyInputUI();
    this.initModal();
  }

  renderMoneyInputUI() {
    $(`.${DOM_CLASSES.MONEY_INPUT_CONTAINER}`)
      .insertAdjacentHTML('beforeend', this._getTemplateMoneyInputUI());
  }

  _getTemplateMoneyInputUI() {
    return `
    <form class= "${DOM_CLASSES.MONEY_FORM} mt-5">
      <label for="${DOM_IDS.MONEY_FORM_INPUT}" class="mb-2 d-inline-block">구입할 금액을 입력해주세요.
      </label>
      <div class="d-flex">
        <input type="number" id="${DOM_IDS.MONEY_FORM_INPUT}" step='1' class="w-100 mr-2 pl-2 ${DOM_CLASSES.MONEY_FORM_INPUT}" placeholder="구입 금액" />
        <button type="submit" class="btn btn-cyan ${DOM_CLASSES.MONEY_FORM_SUBMIT}">확인</button>
      </div>
    </form>
    `;
  }

  renderLottoAmountUI() {
    $(`.${DOM_CLASSES.MONEY_FORM_SUBMIT}`).disable();
    $(`.${DOM_CLASSES.LOTTO_AMOUNT_CONTAINER}`)
      .insertAdjacentHTML('beforeend', this._getTemplateLottoAmount());
  }

  _getTemplateLottoAmount() {
    return `
    <form class="${DOM_CLASSES.LOTTO_AMOUNT_FORM}">
      <label> 수동으로 구매할 갯수를 입력해주세요.
        <p>수동 : <input type="number" class="${DOM_CLASSES.LOTTO_AMOUNT_INPUT_MANUAL}" placeholder="수동 구매 갯수"/></p>
      </label>
      <button type="submit" class="btn btn-cyan ${DOM_CLASSES.LOTTO_AMOUNT_SUBMIT}">확인</button>
    </form>
    `
  }

  renderManualSelectUI(amount) {
    $(`.${DOM_CLASSES.LOTTO_AMOUNT_SUBMIT}`).disable();
    $(`.${DOM_CLASSES.LOTTO_AMOUNT_CONTAINER}`)
      .insertAdjacentHTML('beforeend', this._getTemplateManualSelects(amount));
  }

  _getTemplateManualSelects(amount) {
    //TODO: form tag의 aria-label 동작하는지 확인해야함
    const templates = new Array(amount).fill(0).map((template, lottoIdx) =>
      `<span class= "mx-1 text-4xl ${DOM_CLASSES.CSS_LOTTO_TICKET}">
        🎟️
          ${this._getTemplateManualInputs(lottoIdx)}
        </span>
      `);

    return `
    <form aria-label="각 로또 번호를 수동으로 입력해주세요." class="${DOM_CLASSES.MANUAL_SELECT_FORM}">
      ${templates.join("")}
      <button type="submit" class="btn btn-cyan ${DOM_CLASSES.MANUAL_SELECT_SUBMIT}">수동구매</button>
    </form>
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

  renderCheckLottoUI(numbersBundle) {
    $(`.${DOM_CLASSES.MANUAL_SELECT_SUBMIT}`).disable();
    $(`.${DOM_CLASSES.LOTTO_CONTAINER}`)
      .insertAdjacentHTML('beforeend', this._getTemplateCheckLottoUI(numbersBundle));
  }

  _getTemplateCheckLottoUI(numbersBundle) {
    return `
    <section class= "mt-9">
      <div class="d-flex">
        <label class="flex-auto my-0">총 ${numbersBundle.length}개를 구매하였습니다.</label>
        <div class="flex-auto d-flex justify-end pr-1">
          <label class="switch">
            <input type="checkbox" ${UI_SETTINGS.DEFAULT_VISIBILITY ? 'checked' : ''}/>
            <span class="text-base font-normal ${DOM_CLASSES.LOTTO_SWITCH}">번호보기</span>
          </label>
        </div>
      </div>
      <div class="d-flex flex-wrap lotto-ticket-container">
      ${numbersBundle.map(numbers => `
        <span class= "mx-1 text-4xl lotto-ticket ${DOM_CLASSES.LOTTO_TICKET}">
        🎟️
          <span class="${DOM_CLASSES.LOTTO_TICKET_NUMBER}${UI_SETTINGS.DEFAULT_VISIBILITY ? '' : ' hidden'}">
            ${numbers.join(', ')}
          </span>
        </span>
      `).join('')}
      </div>
    </section>
    `;
  }

  renderResultInputUI() {
    $(`.${DOM_CLASSES.RESULT_INPUT_CONTAINER}`)
      .insertAdjacentHTML('beforeend', this._getTemplateResultInputUI());
  }

  _getTemplateResultInputUI() {
    return `
    
    <form class= "${DOM_CLASSES.RESULT_INPUT_FORM} mt-9">
      <label class="flex-auto d-inline-block mb-3 result-info">지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.    
      </label>
      <div class="d-flex">
        <div>
          <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
          <div>
            ${this._getTemplateResultWinningNumbers()}
          </div>
        </div>
        <div class="bonus-number-container flex-grow">
          <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
          <div class="d-flex justify-center">
            <input 
            type="number" 
            min="${LOTTO_SETTINGS.MIN_LOTTO_NUMBER}" 
            max="${LOTTO_SETTINGS.MAX_LOTTO_NUMBER}"
            class="bonus-number text-center ${DOM_CLASSES.RESULT_BONUS_NUMBER}" 
            aria-label="보너스 번호"
            required
            />
          </div>
        </div>
      </div>
      <button type="submit" class="${DOM_CLASSES.RESULT_INPUT_SUBMIT} mt-5 btn btn-cyan w-100">
    결과 확인하기
      </button>
    </form>
    `;
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

  initModal() {
    $(`#${DOM_IDS.APP}`)
      .insertAdjacentHTML('beforeend', this._getTemplateModal());
  }

  _getTemplateModal() {
    return `
    <div class="modal">
      <div class="modal-inner p-10">
        <div class="${DOM_CLASSES.MODAL_CLOSE} modal-close">
          <svg viewbox="0 0 40 40">
            <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
          </svg>
        </div>

        <h2 class="text-center">🏆 당첨 통계 🏆</h2>
        <div class="d-flex justify-center">
          <table class="result-table border-collapse border border-black">
            <thead>
              <tr class="text-center">
                <th class="p-3">일치 갯수</th>
                <th class="p-3">당첨금</th>
                <th class="p-3">당첨 갯수</th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-center">
                <td class="p-3">3개</td>
                <td class="p-3">5,000</td>
                <td class="${DOM_CLASSES.MODAL_WINNING_COUNT} p-3" data-rank="${RANK.FIFTH}">n개</td>
              </tr>
              <tr class="text-center">
                <td class="p-3">4개</td>
                <td class="p-3">50,000</td>
                <td class="${DOM_CLASSES.MODAL_WINNING_COUNT} p-3" data-rank="${RANK.FOURTH}">n개</td>
              </tr>
              <tr class="text-center">
                <td class="p-3">5개</td>
                <td class="p-3">1,500,000</td>
                <td class="${DOM_CLASSES.MODAL_WINNING_COUNT} p-3" data-rank="${RANK.THIRD}">n개</td>
              </tr>
              <tr class="text-center">
                <td class="p-3">5개 + 보너스볼</td>
                <td class="p-3">30,000,000</td>
                <td class="${DOM_CLASSES.MODAL_WINNING_COUNT} p-3" data-rank="${RANK.SECOND}">n개</td>
              </tr>
              <tr class="text-center">
                <td class="p-3">6개</td>
                <td class="p-3">2,000,000,000</td>
                <td class="${DOM_CLASSES.MODAL_WINNING_COUNT} p-3" data-rank="${RANK.FIRST}">n개</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="${DOM_CLASSES.MODAL_EARNING_RATE} text-center font-bold">당신의 총 수익률은 n%입니다.</p>
        <div class="d-flex justify-center mt-5">
          <button type="button" class="${DOM_CLASSES.MODAL_RESTART_BUTTON} btn btn-cyan">다시 시작하기</button>
        </div>
      </div>
    </div>
  `;
  }

  renderWinningResult(winnings, earningRate) {
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

  showModal() {
    $(`.${DOM_CLASSES.MODAL}`).classList.add('open');
  }

  hideModal() {
    $(`.${DOM_CLASSES.MODAL}`).classList.remove('open');
  }
}
