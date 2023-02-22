import { $ } from '../../utils/dom';

class WinningNumbersSubmitForm {
  #template = /* html */ `
  <form class="winning-numbers-form">
    <fieldset>
      <legend>
        지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.
      </legend>
      <div class="flex space-between number-input-container">
        <div class="flex-col input-wrapper">
          <label for="winning-numbers-input">당첨 번호</label>
          <div>
            <input
              id="winning-numbers-input"
              class="number-input"
              type="number"
              min="1"
              max="45"
              required
            />
            <input
              class="number-input"
              type="number"
              min="1"
              max="45"
              required
            />
            <input
              class="number-input"
              type="number"
              min="1"
              max="45"
              required
            />
            <input
              class="number-input"
              type="number"
              min="1"
              max="45"
              required
            />
            <input
              class="number-input"
              type="number"
              min="1"
              max="45"
              required
            />
            <input
              class="number-input"
              type="number"
              min="1"
              max="45"
              required
            />
          </div>
        </div>
        <div class="flex-col input-wrapper">
          <label class="bonus-number-label" for="bonus-number-input">
            보너스 번호
          </label>
          <input
            id="bonus-number-input"
            class="number-input"
            type="number"
            min="1"
            max="45"
            required
          />
        </div>
      </div>
      <button class="check-result-button typo-button" type="submit">결과 확인하기</button>
    </fieldset>
  </form>
  `;

  FIRST_INPUT_INDEX = 1;

  LAST_INPUT_INDEX = 8;

  constructor($target) {
    this.$target = $target;
  }

  render() {
    this.$target.insertAdjacentHTML('afterbegin', this.#template);
    $('.winning-numbers-form').addEventListener('submit', (e) =>
      this.handleSubmit(e)
    );
  }

  handleSubmit(e) {
    console.log(e);
    e.preventDefault();

    const numbers = Array.from(e.target)
      .slice(this.FIRST_INPUT_INDEX, this.LAST_INPUT_INDEX)
      .map((inputEl) => inputEl.valueAsNumber);
  }
}

export default WinningNumbersSubmitForm;
