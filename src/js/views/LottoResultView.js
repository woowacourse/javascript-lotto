import { SELECTOR } from '../constants/selector';
import { findElement } from '../utils/elementSelector';

class LottoResultView {
  constructor({ $app, ...eventHandlers }) {
    this.$app = $app;
    this.#initializeTemplate();
    this.#initializeDOM();
    this.#bindEventHandler(eventHandlers);
  }

  #initializeTemplate() {
    this.$app.insertAdjacentHTML('beforeend', this.#basicTemplate);
  }

  #initializeDOM() {
    this.$winNumberInputSection = findElement(SELECTOR.WIN_NUMBER_INPUT_SECTION);
    this.$winNumberInputForm = findElement(SELECTOR.WIN_NUMBER_INPUT_FORM);
  }

  #bindEventHandler({ onSubmitResultForm, onClickRestartButton }) {
    this.$winNumberInputForm.addEventListener('submit', onSubmitResultForm);
  }

  showWinNumberInputSection() {
    this.$winNumberInputSection.classList.replace('hide', 'show');
  }

  #basicTemplate = `<section id="win-number-input-section" aria-labelledby="win-number-input-title" class="hide">
  <h1 id="win-number-input-title" hidden>당첨 번호 입력 섹션</h1>
  <p>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</p>
  <form id="win-number-input-form">
    <div class="win-number-input-wrapper">
      <div>
        <p>당첨 번호</p>
        <input id="win-number-1" type="number" />
        <input id="win-number-2" type="number" />
        <input id="win-number-3" type="number" />
        <input id="win-number-4" type="number" />
        <input id="win-number-5" type="number" />
        <input id="win-number-6" type="number" />
      </div>

      <div class="bonus-number-wrapper flex-column-align-end">
        <p>보너스 번호</p>
        <input id="bonus-number" type="number" />
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
     <div id="result-contents"></div>
    </div>
  </div>
</section>`;
}
export default LottoResultView;
