import ACTION from '../flux/actions';
import createAction from '../flux/actionCreator';
import Component from '../abstracts/component';
import { validateWinningNumbers } from '../validation/validators';
import ValidationError from '../validation/validation-error';

class WinningNumberForm extends Component {
  render() {
    const { money, winningNumbers, bonusNumber } = window.store.getState();
    this.innerHTML = this.template(winningNumbers, bonusNumber);

    if (money === 0) {
      this.hide();

      return;
    }
    this.show();
  }

  // eslint-disable-next-line max-lines-per-function
  template(winningNumbers, bonusNumber) {
    const winningNumberInputs = winningNumbers
      .map((number) => `<input class="form-control" maxlength="2" value="${number}"/>`)
      .join('');
    const bonusNumberInputValue = bonusNumber > 0 ? bonusNumber : '';

    return `
      <form>
        <label class="form-label">지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</label>
        <div class="wrapper">
          <fieldset>
            <label class="form-label">당첨 번호</label>
            <div class="d-flex">
              ${winningNumberInputs}
            </div>
          </fieldset>
          <fieldset class="bonus-number-container">
            <label class="form-label">보너스 번호</label>
            <input class="form-control" maxlength="2" value="${bonusNumberInputValue}"/>
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
        this.checkResult(winningNumbers);
      } catch (e) {
        console.error(e);
        alert(e.message);
      }
    });
  }

  checkResult(winningNumbers) {
    const { hasError, errorMessage } = validateWinningNumbers(winningNumbers);

    if (hasError) {
      throw new ValidationError(errorMessage);
    }

    window.store.dispatch(createAction(ACTION.TOGGLE_RESULT_MODAL, true));
  }
}

customElements.define('winning-number-form', WinningNumberForm);

export default WinningNumberForm;
