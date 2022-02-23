import Component from '../abstracts/component';
import createAction from '../flux/actionCreator';
import { SET_WINNING_NUMBERS } from '../flux/reducer';
import ValidationError from '../validation/validation-error';
import { validateWinningNumbers } from '../validation/validators';

class WinningNumberForm extends Component {
  connectedCallback() {
    this.render();
    this.subscribe();
    this.setEvent();
  }

  // eslint-disable-next-line max-lines-per-function
  template() {
    return `
      <form>
        <label>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</label>
        <fieldset>
          <label>당첨 번호</label>
          <div>
            <input />
            <input />
            <input />
            <input />
            <input />
            <input />
          </div>
        </fieldset>
        <fieldset>
          <label>보너스 번호</label>
          <input />
        </fieldset>
        <button>결과 확인하기</button>
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
        console.error(e);
        alert(e.message);
      }
    });
  }

  pickLottoNumbers(winningNumbers) {
    const { hasError, errorMessage } = validateWinningNumbers(winningNumbers);

    if (hasError) {
      throw new ValidationError(errorMessage);
    }

    window.store.dispatch(createAction(SET_WINNING_NUMBERS, winningNumbers));
  }
}

customElements.define('winning-number-form', WinningNumberForm);

export default WinningNumberForm;
