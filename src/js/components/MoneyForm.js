import { ACTION, VALIDATION_ERROR_NAME } from '../constants';
import createAction from '../flux/actionCreator';
import Component from '../abstracts/component';
import { validateMoney } from '../validation/validators';
import ValidationError from '../validation/validation-error';
import { consoleErrorWithConditionalAlert } from '../utils';
import Store from '../flux/store';

class MoneyForm extends Component {
  template() {
    return `
      <form>
        <label class="mb-1">구입할 금액을 입력해주세요.</label>
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
        consoleErrorWithConditionalAlert(e, VALIDATION_ERROR_NAME);
      }
    });
  }

  updateMoney(money) {
    const { hasError, errorMessage } = validateMoney(money);

    if (hasError) {
      throw new ValidationError(errorMessage);
    }

    Store.instance.dispatch(createAction(ACTION.PURCHASE_LOTTO, money));
  }
}

customElements.define('money-form', MoneyForm);

export default MoneyForm;
