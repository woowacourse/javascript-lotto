import View from '../core/View.js';
import { $, $all } from '../utils/utils.js';
import { validator } from '../utils/validator.js';
import { DOM_STRING, LOTTO } from '../configs/contants.js';

export default class WinningNumberSectionView extends View {
  setup() {
    this.state = { lottoList: [] };
  }

  template() {
    const { lottoList } = this.state;

    return `
      <label>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</label>
      <form id="${DOM_STRING.WINNING_NUMBER_FORM}">
        <fieldset id="${DOM_STRING.MAIN_NUMBER_FIELDSET}">
          <legend>당첨 번호</legend>
          <div id="${DOM_STRING.MAIN_NUMBER_INPUT_WRAP}">
            ${Array.from(
              { length: LOTTO.NUMBER_LENGTH },
              () => `
                  <input
                    class="${DOM_STRING.WINNING_NUMBER_INPUT} ${DOM_STRING.MAIN_NUMBER_INPUT}"
                    type="number"
                    min="${LOTTO.NUMBER_RANGE.MIN}"
                    max="${LOTTO.NUMBER_RANGE.MAX}"
                    step="1"
                  >
                `
            ).join('')}
          </div>
        </fieldset>
        <fieldset id="${DOM_STRING.BONUS_NUMBER_FIELDSET}">
          <label>보너스 번호</label>
          <input
            class="${DOM_STRING.WINNING_NUMBER_INPUT} ${
      DOM_STRING.BONUS_NUMBER_INPUT
    }"
            type="number"
            min="${LOTTO.NUMBER_RANGE.MIN}"
            max="${LOTTO.NUMBER_RANGE.MAX}"
            step="1"
          >
        </fieldset>
      </form>
      <button
        id="${DOM_STRING.SHOW_RESULT_BUTTON}"
        ${(lottoList.length === 0 && 'disabled') || ''}
      >
        결과 확인하기
      </button>
    `;
  }

  bindOnClickShowResultButton(callback) {
    this.bindEventListener(
      'click',
      { attributeName: DOM_STRING.SHOW_RESULT_BUTTON, attributeType: 'id' },
      () => {
        const winningNumbers = {
          main: [...$all(DOM_STRING.MAIN_NUMBER_INPUT, 'class')].map(
            (node) => node.valueAsNumber
          ),
          bonus: $(DOM_STRING.BONUS_NUMBER_INPUT, 'class').valueAsNumber,
        };

        try {
          validator.checkWinningNumbers(winningNumbers);
          callback(winningNumbers);
        } catch (e) {
          alert(e);
        }
      }
    );
  }
}
