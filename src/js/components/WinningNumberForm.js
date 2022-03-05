import { ACTION, LOTTO, VALIDATION_ERROR_NAME } from '../constants';
import createAction from '../flux/actionCreator';
import Component from '../abstracts/component';
import { validateWinningNumbers } from '../validation/validators';
import ValidationError from '../validation/validation-error';
import { consoleErrorWithConditionalAlert } from '../utils';
import Store from '../flux/store';

class WinningNumberForm extends Component {
  normalInputs(normal) {
    let normalInputs = [...Array(LOTTO.COUNT).keys()]
      .map((order) => `<input class="form-control" data-order="${order}" maxlength="2"/>`)
      .join('');
    const didSubmitLottoNum = normal.length === LOTTO.COUNT;
    if (didSubmitLottoNum) {
      normalInputs = normal
        .map(
          (num, order) =>
            `<input class="form-control" data-order="${order}" value="${num}" maxlength="2"/>`
        )
        .join('');
    }
    return normalInputs;
  }

  bonusInput(bonus) {
    const bonusInput =
      bonus && bonus > 0
        ? `<input class="form-control" data-order="${LOTTO.COUNT}" value="${bonus}" maxlength="2"/>`
        : `<input class="form-control" data-order="${LOTTO.COUNT}" maxlength="2"/>`;
    return bonusInput;
  }

  // eslint-disable-next-line max-lines-per-function
  template({ normal, bonus }) {
    return `
      <form>
        <label>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</label>
        <div class="wrapper">
          <fieldset>
            <label>당첨 번호</label>
            <div class="d-flex">
              ${this.normalInputs(normal)}
            </div>
          </fieldset>
          <fieldset>
            <label>보너스 번호</label>
            ${this.bonusInput(bonus)}
          </fieldset>
        </div>
        <button class="btn btn-cyan w-100">결과 확인하기</button>
      </form>
    `;
  }

  // eslint-disable-next-line max-lines-per-function
  setEvent() {
    this.addEvent('submit', 'form', (event) => {
      event.preventDefault();
      const $winningNumberInputs = [...this.querySelectorAll('input')];
      const winningNumbers = $winningNumberInputs.map((input) => input.value);

      try {
        this.submitLottoNumbers(winningNumbers);
      } catch (e) {
        consoleErrorWithConditionalAlert(e, VALIDATION_ERROR_NAME);
      }
    });

    // eslint-disable-next-line max-lines-per-function
    this.addEvent('keyup', '.wrapper', ({ target, key }) => {
      const maxLength = parseInt(target.getAttribute('maxlength'), 10);
      const currentLength = `${target.value}`.length;
      const order = parseInt(target.getAttribute('data-order'), 10);
      if (Number.isNaN(order)) {
        return;
      }
      if (currentLength >= maxLength && order < LOTTO.COUNT) {
        const nextInput = this.querySelector(`input[data-order="${order + 1}"]`);
        nextInput.focus();
      } else if (currentLength === 0 && order > 0 && key === 'Backspace') {
        const prevInput = this.querySelector(`input[data-order="${order - 1}"]`);
        prevInput.focus();
      }
    });
  }

  submitLottoNumbers(winningNumbers) {
    const { hasError, errorMessage } = validateWinningNumbers(winningNumbers);

    if (hasError) {
      throw new ValidationError(errorMessage);
    }

    Store.instance.dispatch(
      createAction(ACTION.SET_WINNING_NUMBERS, {
        normal: winningNumbers.slice(0, winningNumbers.length - 1).map(Number),
        bonus: Number(winningNumbers[winningNumbers.length - 1]),
      })
    );
    Store.instance.dispatch(createAction(ACTION.TOGGLE_STATISTICS_MODAL, true));
  }

  render() {
    const { money, winningNumbers } = Store.instance.getState();
    this.innerHTML = '';
    if (money > 0) {
      this.innerHTML = this.template(winningNumbers);
    }
  }
}

customElements.define('winning-number-form', WinningNumberForm);

export default WinningNumberForm;
