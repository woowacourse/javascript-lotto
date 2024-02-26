import Component from './Component';

class MoneyInput extends Component {
  template() {
    return `    
        <form class="money-input-form">
            <label>구입할 금액을 입력해 주세요.</label>
            <section>
                <input id="money" type="text" placeholder="금액"></input>
                <input id="money-input-btn" type="submit" value="구입"></input>
            </section>
        </form>
    `;
  }

  setEvent() {
    this.$target
      .querySelector('.money-input-form')
      .addEventListener('submit', (event) => this.onFormSubmit(event));
  }

  onFormSubmit(event) {
    event.preventDefault();
    const money = this.$target.querySelector('#money').value;
    this.props.updateMoney(money);
  }
}

export default MoneyInput;
