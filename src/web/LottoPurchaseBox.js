import Component from './Component';
import MoneyInput from './MoneyInput';

class LottoPurchaseBox extends Component {
  setup() {
    this.state = {
      money: 0,
    };
  }

  template() {
    return `    
        <section class="lotto-purchase-box">
            <p class="lotto-purchase-title">🎱 내 번호 당첨 확인 🎱</p>
            <section class="money-input"></section>
        </section>
    `;
  }

  mounted() {
    const $moneyInput = this.$target.querySelector('.money-input');
    new MoneyInput($moneyInput, { updateMoney: (newMoney) => this.updateMoney(newMoney) });
  }

  updateMoney(newMoney) {
    this.setState({ money: newMoney });
  }
}

export default LottoPurchaseBox;
