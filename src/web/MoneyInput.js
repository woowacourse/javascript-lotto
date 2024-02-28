import Component from './Component';
import Condition from '../constants/Condition';

const { MONEY } = Condition;

class MoneyInput extends Component {
  template() {
    return `    
      <form class="money-input-form">
        <label>구입할 금액을 입력해 주세요.</label>
        <div>
          <input class="money-input" type="number" min=${MONEY.MIN} max=${MONEY.MAX} step=${MONEY.UNIT} placeholder="금액" required></input>
          <input class="money-input-btn" type="submit" value="구입"></input>
        </div>
      </form>
    `;
  }

  setEvent() {
    this.$target.querySelector('.money-input-form').addEventListener('submit', (event) => this.onFormSubmit(event));
  }

  onFormSubmit(event) {
    event.preventDefault();
    const money = this.$target.querySelector('.money-input').value;
    this.props.purchaseLottoTickets(money);
    this.resetFormValue();
  }

  resetFormValue() {
    this.$target.querySelector('.money-input').value = '';
  }
}

export default MoneyInput;
