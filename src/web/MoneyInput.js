import Component from './Component';

class MoneyInput extends Component {
  template() {
    const MONEY_INPUT_TEMPLATE = `    
      <form class="money-input-form">
        <label>구입할 금액을 입력해 주세요.</label>
        <div>
          <input class="money-input" type="text" placeholder="금액"></input>
          <input class="money-input-btn" type="submit" value="구입"></input>
        </div>
      </form>
    `;

    return MONEY_INPUT_TEMPLATE;
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
