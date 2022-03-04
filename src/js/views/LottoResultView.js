import { EVENT } from '../constants/events';
import { SELECTOR } from '../constants/selector';
import { findElement } from '../utils/dom';
import { changeCurrencyFormat } from '../utils/util';
import { emitListener } from '../utils/event';
import { RANK_PRIZE } from '../constants/rank';

class LottoResultView {
  #app = null;

  #winNumberInputSection = null;

  #winNumberInputForm = null;

  #winStatistics = null;

  #statisticsTableBody = null;

  #profitRatioText = null;

  #restartButton = null;

  #onSubmitResult = null;

  #onClickRestartButton = null;

  #onClickModal = null;

  #onInputOverMaxLength = null;

  constructor({ $app }) {
    this.#app = $app;
    this.#initializeTemplate();
    this.#initializeDOM();
    this.#bindEventHandler();
  }

  #initializeTemplate() {
    this.#app.insertAdjacentHTML('beforeend', this.#basicTemplate);
  }

  #initializeDOM() {
    this.#winNumberInputSection = findElement(SELECTOR.WIN_NUMBER_INPUT_SECTION);
    this.#winNumberInputForm = findElement(SELECTOR.WIN_NUMBER_INPUT_FORM);

    this.#winStatistics = findElement(SELECTOR.WIN_STATISTICS);
    this.#statisticsTableBody = findElement(SELECTOR.STATISTICS_TABLE_BODY);
    this.#profitRatioText = findElement(SELECTOR.PROFIT_RATIO_TEXT);
    this.#restartButton = findElement(SELECTOR.RESTART_BUTTON);
  }

  #bindEventHandler() {
    this.#onSubmitResult = (e) => emitListener(EVENT.SUBMIT_RESULT, e);
    this.#onClickRestartButton = (e) => emitListener(EVENT.CLICK_RESTART_BUTTON, e);
    this.#onClickModal = (e) => emitListener(EVENT.CLICK_MODAL, e);
    this.#onInputOverMaxLength = (e) => emitListener(EVENT.INPUT_OVER_MAX_LENGTH, e);

    this.#winNumberInputForm.addEventListener('submit', this.#onSubmitResult);
    this.#restartButton.addEventListener('click', this.#onClickRestartButton);
    this.#winStatistics.addEventListener('click', this.#onClickModal);
    this.#winNumberInputForm.addEventListener('input', this.#onInputOverMaxLength);
  }

  showWinNumberInputSection() {
    this.#winNumberInputSection.classList.replace(SELECTOR.HIDE, SELECTOR.SHOW);
  }

  renderStatisticsModalContents({ statistics, profitRatio }) {
    this.#statisticsTableBody.innerHTML = Object.keys(statistics).reduce((prev, currentKey) => {
      const count = statistics[currentKey] ?? '';
      const price = RANK_PRIZE[currentKey] ?? '';

      return prev + this.#generateStatisticsTableData(currentKey, price, count);
    }, '');
    this.#profitRatioText.innerHTML = this.#generateProfitRatioText(profitRatio);
  }

  hideStatisticsModal() {
    this.#winStatistics.classList.replace(SELECTOR.SHOW, SELECTOR.HIDE);
  }

  showStatisticsModal() {
    this.#winStatistics.classList.replace(SELECTOR.HIDE, SELECTOR.SHOW);
  }

  #generateStatisticsTableData(currentKey, price, count) {
    return `<tr><td>${currentKey}</td><td>${changeCurrencyFormat(
      price
    )}</td><td>${count}</td> </tr>`;
  }

  #generateProfitRatioText(profitRatio) {
    return `당신의 총 수익률은 ${profitRatio}%입니다.`;
  }

  #basicTemplate = `<section id="win-number-input-section" aria-labelledby="win-number-input-title" class="hide">
  <h1 id="win-number-input-title" hidden>당첨 번호 입력 섹션</h1>
  <p>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</p>
  <p><b>(중복이 없는 1~45의 숫자를 입력해주세요.)</b></p>
  <form id="win-number-input-form">
    <div class="win-number-input-wrapper">
      <div>
        <p>당첨 번호</p>
        <input class="winning-number-input" type="number" min="1" max="45" required maxlength="2" />
        <input class="winning-number-input" type="number" min="1" max="45" required maxlength="2" />
        <input class="winning-number-input" type="number" min="1" max="45" required maxlength="2" />
        <input class="winning-number-input" type="number" min="1" max="45" required maxlength="2" />
        <input class="winning-number-input" type="number" min="1" max="45" required maxlength="2" />
        <input class="winning-number-input" type="number" min="1" max="45" required maxlength="2" />
        <label for="bonus-number-input" />
        </div>
        <div class="bonus-number-wrapper flex-column-align-end">
        <p>보너스 번호</p>
        <input id="bonus-number-input" class="bonus-number-input" type="number" min="1" max="45" required maxlength="2"/>
      </div>
    </div>

    <button id="result-button">결과 확인하기</button>
  </form>
</section>
<section id="win-statistics" aria-labelledby="win-statistics-title" class="hide">
  <h1 id="win-statistics-title" hidden>당첨 통계 출력</h1>
  <div class='modal-wrapper'>
  <div id="result-container"class="modal-container">
  <span class="modal-cancel-button">❌</span>
     <div id="result-contents">
     <table  class=".result-container-section">
     <caption hidden>결과 테이블입니다.</caption>
     <thead>
      <tr>
        <th>등수</th>
        <th>당첨금</th>
        <th>당첨갯수</th>
      </tr>
     </thead>
     <tbody id="statistics-table-body">
     </tbody>
     </table>
     <div id="profit-ratio-text"  class=".result-container-section"></div>
     <button id="restart-button"  class=".result-container-section">다시 시작하기</button>
     </div>
    </div>
  </div>
</section>`;
}
export default LottoResultView;
