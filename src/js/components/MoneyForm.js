import Component from '../abstracts/component';
import createAction from '../flux/actionCreator';
import { PURCHASE_LOTTO } from '../flux/reducer';
import { validateMoney } from '../validation/validators';
import ValidationError from '../validation/validation-error';

class MoneyForm extends Component {
  connectedCallback() {
    this.render();
    this.subscribe();
    this.setEvent();
  }

  render() {
    this.innerHTML = this.template();
  }

  template() {
    return `
      <form>
        <label class="form-label">구입할 금액을 입력해주세요.</label>
        <div class="d-flex">
          <input class="form-control mr-4" placeholder="금액"></input>
          <button class="btn btn-cyan">구입</button>
        </div>
      </form>
    `;
  }

  setEvent() {
    this.addEvent('submit', 'form', (event) => {
      event.preventDefault();
      const $moneyInput = this.querySelector('input');

      try {
        this.updateMoney($moneyInput.value);
      } catch (e) {
        console.error(e);
        alert(e.message);
      }
    });
  }

  updateMoney(money) {
    const { hasError, errorMessage } = validateMoney(money);

    if (hasError) {
      throw new ValidationError(errorMessage);
    }

    window.store.dispatch(createAction(PURCHASE_LOTTO, money));
  }
}

customElements.define('money-form', MoneyForm);

export default MoneyForm;
