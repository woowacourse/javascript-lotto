import Component from './Component';

class MoneyInput extends Component {
  template() {
    return `    
        <form id="money-input-form">
            <label>구입할 금액을 입력해 주세요.</label>
            <input id="money" type="text"></input>
            <input type="submit" value="구입"></input>
        </form>
    `;
  }

  setEvent() {
    this.$target
      .querySelector('#money-input-form')
      .addEventListener('submit', (event) => this.onFormSubmit(event));
  }

  onFormSubmit(event) {
    event.preventDefault();
    const money = this.$target.querySelector('#money').value;
    this.props.updateMoney(money);
  }
}

export default MoneyInput;
