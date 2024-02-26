import Component from './Component';
import MoneyInput from './MoneyInput';
import LottoDisplay from './LottoDisplay';
import WinningLottoInput from './WinningLottoInput';
import Validator from '../domain/Validator';
import LottoGenerator from '../controller/LottoGenerator';

class LottoPurchaseBox extends Component {
  setup() {
    this.state = {
      lottoTickets: [],
      winningLotto: { winningNumbers: [], bonusNumber: 0 },
    };
  }

  template() {
    return `    
        <section class="lotto-purchase-box">
            <p class="lotto-purchase-title">🎱 내 번호 당첨 확인 🎱</p>
            <section class="money-input"></section>
            ${
              this.state.lottoTickets.length > 1
                ? `
                <section class="lotto-display"></section>
                <section class="winning-lotto-input"></section>
            `
                : ``
            } 
        </section>
    `;
  }

  mounted() {
    const $moneyInput = this.$target.querySelector('.money-input');
    const $lottoDisplay = this.$target.querySelector('.lotto-display');
    const $winningLottoInput = this.$target.querySelector('.winning-lotto-input');

    new MoneyInput($moneyInput, {
      purchaseLottoTickets: (money) => this.purchaseLottoTickets(money),
    });
    new LottoDisplay($lottoDisplay, { lottoTickets: this.state.lottoTickets });
    new WinningLottoInput($winningLottoInput, {
      makeWinningLotto: (winningNumbers, bonusNumber) =>
        this.makeWinningLotto(winningNumbers, bonusNumber),
    });
  }

  purchaseLottoTickets(money) {
    try {
      Validator.validateMoney(money);
      this.setState({ lottoTickets: LottoGenerator.createLotto(money) });
    } catch (error) {
      alert(error.message);
    }
  }

  makeWinningNumbers(winningNumbers) {
    return winningNumbers
      .filter((number) => number !== '' && number !== undefined && number !== null)
      .map(Number);
  }

  makeWinningLotto(winningNumbers, bonusNumber) {
    try {
      this.setState({
        winningLotto: { winningNumbers: this.makeWinningNumbers(winningNumbers), bonusNumber },
      });
    } catch (error) {
      alert(error.message);
    }
  }
}

export default LottoPurchaseBox;
