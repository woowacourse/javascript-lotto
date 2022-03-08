import View from '../core/View.js';
import {
  $,
  $all,
  concatWinningNumbers,
  forceIntegerValue,
  focusNextSibling,
} from '../utils/utils.js';
import { validate, winningNumbersValidator } from '../utils/validator.js';
import { DOM_STRING, LOTTO } from '../configs/contants.js';

export default class WinningNumberSectionView extends View {
  setup() {
    this.state = { lottoList: [] };
  }

  template() {
    const { lottoList } = this.state;

    return `
      <label class="${DOM_STRING.HINT}">
        지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.
      </label>
      <form id="${DOM_STRING.WINNING_NUMBER_FORM}" class="${
      DOM_STRING.INPUT_FORM
    }">
        <fieldset id="${DOM_STRING.MAIN_NUMBER_FIELDSET}">
          <legend class="${DOM_STRING.WINNING_NUMBER_LEGEND}">당첨 번호</legend>
          <div id="${DOM_STRING.MAIN_NUMBER_INPUT_WRAP}">
            ${Array.from(
              { length: LOTTO.NUMBER_LENGTH },
              () => `
                  <input
                    class="${DOM_STRING.STYLED_INPUT} ${DOM_STRING.WINNING_NUMBER_INPUT} ${DOM_STRING.MAIN_NUMBER_INPUT}"
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
          <label class="${DOM_STRING.HINT}">보너스 번호</label>
          <input
            class="${DOM_STRING.STYLED_INPUT} ${
      DOM_STRING.WINNING_NUMBER_INPUT
    } ${DOM_STRING.BONUS_NUMBER_INPUT}"
            type="number"
            min="${LOTTO.NUMBER_RANGE.MIN}"
            max="${LOTTO.NUMBER_RANGE.MAX}"
            step="1"
          >
        </fieldset>
      </form>
      <button
        id="${DOM_STRING.SHOW_RESULT_BUTTON}"
        class="${DOM_STRING.SUBMIT_BUTTON}"
        ${(lottoList.length === 0 && 'disabled') || ''}
        type="submit"
        form="${DOM_STRING.WINNING_NUMBER_FORM}"
      >
        결과 확인하기
      </button>
    `;
  }

  bindOnInputWinningNumberInput() {
    const attribute = {
      attributeName: DOM_STRING.WINNING_NUMBER_INPUT,
      attributeType: 'class',
    };

    this.bindEventListener('input', attribute, ({ target }) => {
      forceIntegerValue(target);
      focusNextSibling(target, attribute, LOTTO.NUMBER_RANGE.MAX);
    });
  }

  bindOnSubmitWinningNumberForm(callback) {
    this.bindEventListener(
      'submit',
      { attributeName: DOM_STRING.WINNING_NUMBER_FORM, attributeType: 'id' },
      () => {
        try {
          const winningNumbers = this.getWinningNumbers();

          validate(
            winningNumbers,
            winningNumbersValidator,
            concatWinningNumbers
          );
          callback(winningNumbers);
        } catch (e) {
          alert(e);
        }
      }
    );
  }

  getWinningNumbers() {
    return {
      main: [...$all(DOM_STRING.MAIN_NUMBER_INPUT, 'class')].map((elem) =>
        parseInt(elem.valueAsNumber, 10)
      ),
      bonus: parseInt(
        $(DOM_STRING.BONUS_NUMBER_INPUT, 'class').valueAsNumber,
        10
      ),
    };
  }
}
