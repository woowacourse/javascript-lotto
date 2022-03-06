import { ACTION } from '../constants';
import createAction from '../flux/actionCreator';
import Component from '../abstracts/component';
import { validateMoney } from '../validation/validators';
import { transformToNumber } from '../utils';
import Store from '../flux/store';

class MoneyForm extends Component {
  errorListTemplate(errorMessages) {
    const errorItems = errorMessages
      .map((message) => `<li class="error-message">${message}</li>`)
      .join('\n');
    return `<ul class="error-list">${errorItems}</ul>`;
  }

  // eslint-disable-next-line max-lines-per-function
  template(money, errorMessages, lottoList) {
    const disabledBtn = errorMessages.length > 0 || lottoList.length > 0 ? 'disabled' : '';
    const disabledInput = lottoList.length > 0 ? 'disabled' : '';
    const moneyWithComma = money.toLocaleString('ko-KR');
    const value = moneyWithComma !== '0' ? moneyWithComma : '';
    return `
      <form>
        <label class="mb-1">구입할 금액을 입력해주세요.</label>
        <div class="d-flex mb-2">
          <input class="form-control mr-4" ${disabledInput} value="${value}" placeholder="금액"></input>
          <button class="btn btn-cyan" ${disabledBtn}>구입</button>
        </div>
        ${errorMessages.length > 0 ? this.errorListTemplate(errorMessages) : ''}
      </form>
    `;
  }

  setEvent() {
    this.addEvent('submit', 'form', (event) => {
      event.preventDefault();
      this.handleSubmit();
    });
    this.addEvent('input', 'input', (event) => {
      this.handleInput(event);
    });
  }

  handleSubmit() {
    this.purchaseLotto();
  }

  getErrorMessages(money) {
    const validationResults = validateMoney(money);
    const errorMessages = validationResults.reduce((errorList, { hasError, errorMessage }) => {
      hasError && errorList.push(errorMessage);
      return errorList;
    }, []);
    return errorMessages;
  }

  handleInput(event) {
    const { target } = event;
    const onlyNumber = transformToNumber(target.value);
    this.updateMoney(onlyNumber);
    const errorMessages = onlyNumber > 0 ? this.getErrorMessages(onlyNumber) : [];
    this.updateErrorMessages(errorMessages);
  }

  updateMoney(money) {
    Store.instance.dispatch(createAction(ACTION.SET_MONEY, money));
  }

  purchaseLotto() {
    Store.instance.dispatch(createAction(ACTION.PURCHASE_LOTTO));
  }

  updateErrorMessages(errorMessages) {
    Store.instance.dispatch(createAction(ACTION.SET_MONEY_FORM_ERROR_MESSAGES, errorMessages));
  }

  render() {
    const { money, lottoList, moneyFormErrorMessages } = Store.instance.getState();
    this.innerHTML = this.template(money, moneyFormErrorMessages, lottoList);
    this.$button = this.querySelector('button');
    this.$input = this.querySelector('input');
    if (lottoList.length === 0) {
      this.$input.focus();
      this.$input.setSelectionRange(-1, -1); // cursor를 마지막으로 이동시킨다
    }
  }
}

customElements.define('money-form', MoneyForm);

export default MoneyForm;
