/* eslint-disable max-lines-per-function */
import {
  ACTION,
  DUPLICATE_ERROR_CLASS_NAMES,
  INVALID_RANGE_ERROR_CLASS_NAME,
  LOTTO,
  WINNING_NUM_PLACEHOLDER,
} from '../constants';
import createAction from '../flux/actionCreator';
import Component from '../abstracts/component';
import Store from '../flux/store';
import { duplicateIndexs, findGroupIndex } from '../utils';
import {
  checkInvalidRangeOfWinningNumberList,
  validateWinningNumberList,
} from '../validation/validators';
import ValidationError from '../validation/validation-error';

class WinningNumberForm extends Component {
  inputTemplate({ normal, bonus }) {
    const winningNumbers = [...normal, bonus];
    const duplicateNumIndexArrList = duplicateIndexs(
      winningNumbers.filter((num) => num !== WINNING_NUM_PLACEHOLDER)
    );
    let hasFocusInput = false;
    const inputs = winningNumbers.map((num, index) => {
      const val = num;
      let isFocus = false;
      if (!hasFocusInput) {
        isFocus = num === WINNING_NUM_PLACEHOLDER;
        hasFocusInput = isFocus;
      }
      const focus = isFocus ? 'data-is-focus' : '';
      const groupIndex = findGroupIndex(duplicateNumIndexArrList, index);
      const duplicateErrorClassName =
        groupIndex !== null ? DUPLICATE_ERROR_CLASS_NAMES[groupIndex] : '';
      const invalidRangeErrorClassName =
        num !== WINNING_NUM_PLACEHOLDER && checkInvalidRangeOfWinningNumberList([num]).hasError
          ? INVALID_RANGE_ERROR_CLASS_NAME
          : '';
      const classNames = [duplicateErrorClassName, invalidRangeErrorClassName].join(' ');
      return `<winning-number-input class="${classNames}" data-order="${index}" ${focus} data-value="${val}"></winning-number-input>`;
    });
    return {
      normalInputs: inputs.slice(0, inputs.length - 1).join('\n'),
      bonusInput: inputs[inputs.length - 1],
    };
  }

  errorListTemplate({ normal, bonus }) {
    // 아무것도 입력 안했는데 오류를 뿜으면 안되니까 PLACEHODER는 제거해주고 유효성 검사를 한다.
    const winningNumberList = [...normal, bonus].filter((num) => num !== WINNING_NUM_PLACEHOLDER);
    const validationResults = validateWinningNumberList(winningNumberList);
    const errorItems = validationResults
      .map(({ hasError, errorMessage }) => {
        return hasError ? `<li class="error-message">${errorMessage}</li>` : '';
      })
      .join('\n');
    return `<ul class="error-list">${errorItems}</ul>`;
  }

  buttonTemplate({ normal, bonus }) {
    const winningNumberList = [...normal, bonus];
    const hasError = validateWinningNumberList(winningNumberList).some((result) => result.hasError);
    const disabled = hasError ? 'disabled' : '';
    return `<div class="btn-wrapper"><button type="button" class="btn btn-cyan w-100" ${disabled}>결과 확인하기</button></div>`;
  }

  template(winningNumbers) {
    const { normalInputs, bonusInput } = this.inputTemplate(winningNumbers);
    return `
      <form>
        <label>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</label>
        <div class="wrapper">
          <fieldset>
            <label>당첨 번호</label>
            <div class="d-flex">
              ${normalInputs}
            </div>
          </fieldset>
          <fieldset>
            <label>보너스 번호</label>
            ${bonusInput}
          </fieldset>
          ${this.errorListTemplate(winningNumbers)}
        </div>
        ${this.buttonTemplate(winningNumbers)}
      </form>
    `;
  }

  setEvent() {
    this.addEvent('change', 'winning-number-form', () => {
      const winningNumberList = this.$inputs.map((input) => input.valueAsNumber);
      this.submitLottoNumbers(winningNumberList);
    });

    this.addEvent('keyup', 'winning-number-form', (event) => {
      const { path, key } = event;
      const target = path[1];
      this.handleKeyupEvent(target, key);
    });

    this.addEvent('keydown', 'winning-number-form', (event) => {
      const { path, key } = event;
      const target = path[1];
      this.handleKeydownEvent(target, key);
    });

    this.addEvent('click', 'winning-number-form', (event) => {
      const { path } = event;
      const target = path[1];
      if (target.tagName.toLowerCase() !== 'winning-number-input') return;
      const { order } = target;
      const winningNumberList = this.$inputs.map((input) =>
        input.order === order ? WINNING_NUM_PLACEHOLDER : input.valueAsNumber
      );
      this.submitLottoNumbers(winningNumberList);
    });

    this.addEvent('click', 'winning-number-form', ({ target }) => {
      if (target.tagName.toLowerCase() !== 'button') return;
      this.handleEnter(); // 버튼 누른거는 Enter친것과 같은 행위이다
    });
  }

  handleKeyupEvent(target, key) {
    const { order } = target;
    if (key === 'Backspace' || key === 'Enter') return;
    if (target.isFull() && order < LOTTO.COUNT) {
      const nextInput = this.$inputs[order + 1];
      nextInput.focus();
    }
  }

  handleKeydownEvent(target, key) {
    const { order, length } = target;
    if (key !== 'Backspace' && key !== 'Enter') return;

    if (length === 0 && order > 0 && key === 'Backspace') {
      const winningNumberList = this.$inputs.map((input) => {
        if (input.order === target.order - 1) return WINNING_NUM_PLACEHOLDER; // 방금 지운 input의 이전 input도 지워준다
        return input.valueAsNumber;
      });
      this.submitLottoNumbers(winningNumberList);
      return;
    }

    if (key === 'Enter') {
      this.handleEnter();
    }
  }

  handleEnter() {
    const winningNumberList = this.$inputs.map((input) => input.valueAsNumber);
    try {
      this.showStatisticsModal(winningNumberList);
    } catch (e) {
      this.submitLottoNumbers(winningNumberList);
    }
  }

  handleMouseEnterOnButton() {
    const winningNumberList = this.$inputs.map(($input) => $input.valueAsNumber);
    if (winningNumberList.every((num) => num > 0)) {
      document.activeElement.blur(); // chnage이벤트가 발생하면서 state가 업데이트된다
    }
  }

  submitLottoNumbers(winningNumberList) {
    Store.instance.dispatch(
      createAction(ACTION.SET_WINNING_NUMBERS, {
        normal: winningNumberList.slice(0, winningNumberList.length - 1),
        bonus: winningNumberList[winningNumberList.length - 1],
      })
    );
  }

  showStatisticsModal(winningNumberList) {
    const hasError = validateWinningNumberList(winningNumberList).some((result) => result.hasError);
    if (hasError) {
      throw new ValidationError(errorMessage);
    }
    this.submitLottoNumbers(winningNumberList);
    Store.instance.dispatch(createAction(ACTION.TOGGLE_STATISTICS_MODAL, true));
  }

  render() {
    const { lottoList, winningNumbers } = Store.instance.getState();
    this.innerHTML = '';
    if (lottoList.length > 0) {
      this.innerHTML = this.template(winningNumbers);
      this.$inputs = [...this.querySelectorAll('winning-number-input')];
      // addEvent가 작동하지 않아서 이렇게 event handler를 property로 직접 넣어준다.
      this.$btnWrapper = this.querySelector('.btn-wrapper');
      this.$btnWrapper.onmouseenter = this.handleMouseEnterOnButton.bind(this);
    }
  }
}

customElements.define('winning-number-form', WinningNumberForm);

export default WinningNumberForm;
