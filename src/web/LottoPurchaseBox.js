import Component from './Component';
import MoneyInput from './MoneyInput';
import Validator from '../domain/Validator';

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
    try {
      this.setState({ money: Validator.validateMoney(newMoney) });
    } catch (error) {
      alert(error.message);
    }
  }
}

export default LottoPurchaseBox;
