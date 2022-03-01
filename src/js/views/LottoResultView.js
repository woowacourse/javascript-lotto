import { SELECTOR } from '../constants/selector';
import { RANK_PRICE } from '../constants/win';
import { findElement } from '../utils/dom';
import { changeCurrencyFormat } from '../utils/util';

class LottoResultView {
  constructor({ $app }) {
    this.$app = $app;
    this.#initializeTemplate();
    this.#initializeDOM();
  }

  #initializeTemplate() {
    this.$app.insertAdjacentHTML('beforeend', this.#basicTemplate);
  }

  #initializeDOM() {
    this.$winNumberInputSection = findElement(SELECTOR.WIN_NUMBER_INPUT_SECTION);
    this.$winNumberInputForm = findElement(SELECTOR.WIN_NUMBER_INPUT_FORM);

    this.$winStatistics = findElement(SELECTOR.WIN_STATISTICS);
    this.$statisticsTableBody = findElement(SELECTOR.STATISTICS_TABLE_BODY);
    this.$profitRatioText = findElement(SELECTOR.PROFIT_RATIO_TEXT);
    this.$restartButton = findElement(SELECTOR.RESTART_BUTTON);
    this.$modalCancelButton = findElement(SELECTOR.MODAL_CANCEL_BUTTON);
  }

  bindEventHandler({ onSubmitResultForm, onClickRestartButton, onClickModalCancelButton }) {
    this.$winNumberInputForm.addEventListener('submit', onSubmitResultForm);
    this.$restartButton.addEventListener('click', onClickRestartButton);
    this.$modalCancelButton.addEventListener('click', onClickModalCancelButton);
  }

  showWinNumberInputSection() {
    this.$winNumberInputSection.classList.replace('hide', 'show');
  }

  renderStatisticsModal({ statistics, profitRatio }) {
    this.#showWinStatisticsModal();
    this.$statisticsTableBody.innerHTML = Object.keys(statistics).reduce((prev, currentKey) => {
      const price = RANK_PRICE[currentKey];
      const count = statistics[currentKey];

      return prev + this.#generateStatisticsTableData(currentKey, price, count);
    }, '');
    this.$profitRatioText.innerHTML = this.#generateProfitRatioText(profitRatio);
  }

  hideWinStatisticsModal() {
    this.$winStatistics.classList.replace('show', 'hide');
  }

  #showWinStatisticsModal() {
    this.$winStatistics.classList.replace('hide', 'show');
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
  <form id="win-number-input-form">
    <div class="win-number-input-wrapper">
      <div>
        <p>당첨 번호</p>
        <input class="winning-number-input" type="number" />
        <input class="winning-number-input" type="number" />
        <input class="winning-number-input" type="number" />
        <input class="winning-number-input" type="number" />
        <input class="winning-number-input" type="number" />
        <input class="winning-number-input" type="number" />
      </div>

      <div class="bonus-number-wrapper flex-column-align-end">
        <p>보너스 번호</p>
        <input class="bonus-number-input" type="number" />
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
