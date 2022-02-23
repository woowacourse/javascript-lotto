import Component from '../abstracts/component';
import createAction from '../flux/actionCreator';
import { PURCHASE_LOTTO } from '../flux/reducer';

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
        <label>구입할 금액을 입력해주세요.</label>
        <input type="number" placeholder="금액"></input>
        <button>구입</button>
      </form>
    `;
  }

  setEvent() {
    this.addEvent('submit', 'form', (event) => {
      event.preventDefault();
      const $moneyInput = this.querySelector('input');
      window.store.dispatch(createAction(PURCHASE_LOTTO, $moneyInput.value));
    });
  }
}

customElements.define('money-form', MoneyForm);

export default MoneyForm;
