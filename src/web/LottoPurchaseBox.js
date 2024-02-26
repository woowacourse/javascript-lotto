import Component from './Component';
import MoneyInput from './MoneyInput';
import LottoDisplay from './LottoDisplay';
import Validator from '../domain/Validator';
import LottoGenerator from '../controller/LottoGenerator';

class LottoPurchaseBox extends Component {
  setup() {
    this.state = {
      lottoTickets: [],
    };
  }

  template() {
    return `    
        <section class="lotto-purchase-box">
            <p class="lotto-purchase-title">🎱 내 번호 당첨 확인 🎱</p>
            <section class="money-input"></section>
            <section class="lotto-display"></section>
        </section>
    `;
  }

  mounted() {
    const $moneyInput = this.$target.querySelector('.money-input');
    const $lottoDisplay = this.$target.querySelector('.lotto-display');

    new MoneyInput($moneyInput, {
      purchaseLottoTickets: (money) => this.purchaseLottoTickets(money),
    });
    new LottoDisplay($lottoDisplay, { lottoTickets: this.state.lottoTickets });
  }

  purchaseLottoTickets(money) {
    try {
      Validator.validateMoney(money);
      this.setState({ lottoTickets: LottoGenerator.createLotto(money) });
    } catch (error) {
      alert(error.message);
    }
  }
}

export default LottoPurchaseBox;
