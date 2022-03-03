import ACTION from '../flux/actions';
import createAction from '../flux/actionCreator';
import Component from '../abstracts/component';
import { validateMoney } from '../validation/validators';
import ValidationError from '../validation/validation-error';

class MoneyForm extends Component {
  render() {
    const { money } = window.store.getState();
    this.innerHTML = this.template(money);
  }

  template(money) {
    const moneyInputValue = money > 0 ? money : '';

    return `
      <form>
        <label class="form-label mb-1">구입할 금액을 입력해주세요.</label>
        <div class="d-flex">
          <input class="form-control mr-4" placeholder="금액" value="${moneyInputValue}"></input>
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

    window.store.dispatch(createAction(ACTION.PURCHASE_LOTTO, money));
  }
}

customElements.define('money-form', MoneyForm);

export default MoneyForm;
