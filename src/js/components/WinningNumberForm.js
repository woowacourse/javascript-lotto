import Component from '../abstracts/component';
import createAction from '../flux/actionCreator';
import { SET_WINNING_NUMBERS } from '../flux/reducer';

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
            <input type="number" />
            <input type="number" />
            <input type="number" />
            <input type="number" />
            <input type="number" />
            <input type="number" />
          </div>
        </fieldset>
        <fieldset>
          <label>보너스 번호</label>
          <input type="number" />
        </fieldset>
        <button>결과 확인하기</button>
      </form>
    `;
  }

  setEvent() {
    this.addEvent('submit', 'form', (event) => {
      event.preventDefault();
      const $winningNumberInputs = [...this.querySelectorAll('input')];
      const winningNumbers = $winningNumberInputs.map((input) => input.valueAsNumber);
      window.store.dispatch(createAction(SET_WINNING_NUMBERS, winningNumbers));
    });
  }
}

customElements.define('winning-number-form', WinningNumberForm);

export default WinningNumberForm;
