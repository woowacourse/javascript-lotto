import { ACTION, LOTTO, VALIDATION_ERROR_NAME } from '../constants';
import createAction from '../flux/actionCreator';
import Component from '../abstracts/component';
import { validateWinningNumbers } from '../validation/validators';
import ValidationError from '../validation/validation-error';
import { consoleErrorWithConditionalAlert } from '../utils';
import Store from '../flux/store';

class WinningNumberForm extends Component {
  // eslint-disable-next-line max-lines-per-function
  template({ normal, bonus }) {
    const normalInputs =
      normal.length === LOTTO.COUNT
        ? normal.map((num) => `<input class="form-control" value="${num}" maxlength="2"/>`).join('')
        : `<input class="form-control" maxlength="2"/>`.repeat(LOTTO.COUNT);
    const bonusInput =
      bonus && bonus > 0
        ? `<input class="form-control" value="${bonus}" maxlength="2"/>`
        : `<input class="form-control" maxlength="2"/>`;
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
        </div>
        <button class="btn btn-cyan w-100">결과 확인하기</button>
      </form>
    `;
  }

  setEvent() {
    this.addEvent('submit', 'form', (event) => {
      event.preventDefault();
      const $winningNumberInputs = [...this.querySelectorAll('input')];
      const winningNumbers = $winningNumberInputs.map((input) => input.value);

      try {
        this.pickLottoNumbers(winningNumbers);
      } catch (e) {
        consoleErrorWithConditionalAlert(e, VALIDATION_ERROR_NAME);
      }
    });
  }

  pickLottoNumbers(winningNumbers) {
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
    console.log('winningNumbers : ', winningNumbers);
    this.innerHTML = '';
    if (money > 0) {
      this.innerHTML = this.template(winningNumbers);
    }
  }
}

customElements.define('winning-number-form', WinningNumberForm);

export default WinningNumberForm;
