import Component from './Component';
import MoneyInput from './MoneyInput';
import LottoDisplay from './LottoDisplay';
import WinningLottoInput from './WinningLottoInput';
import LottoStatisticsModal from './LottoStatisticsModal';
import Validator from '../domain/Validator';
import LottoGenerator from '../controller/LottoGenerator';
import StatisticsGenerator from '../controller/StatisticsGenerator';

class LottoPurchaseBox extends Component {
  setup() {
    this.state = {
      lottoTickets: [],
      winningLotto: { winningNumbers: [], bonusNumber: 0 },
      lottoStatistics: { prizes: [], returnOnInvestment: 0 },
      isModalOpen: false,
    };
  }

  template() {
    return `    
        <section class="lotto-purchase-box">
            <p class="lotto-purchase-title">🎱 내 번호 당첨 확인 🎱</p>
            <section class="money-input"></section>
            ${
              this.state.lottoTickets.length > 0
                ? `
                <section class="lotto-display"></section>
                <section class="winning-lotto-input"></section>
                `
                : ``
            }
            ${
              this.state.isModalOpen
                ? `
                <section class="lotto-statistics-modal"></section>`
                : ``
            }
        </section>
    `;
  }

  mounted() {
    const $moneyInput = this.$target.querySelector('.money-input');

    new MoneyInput($moneyInput, {
      purchaseLottoTickets: (money) => this.purchaseLottoTickets(money),
    });

    if (this.state.lottoTickets.length > 0) {
      const $lottoDisplay = this.$target.querySelector('.lotto-display');
      const $winningLottoInput = this.$target.querySelector('.winning-lotto-input');

      new LottoDisplay($lottoDisplay, { lottoTickets: this.state.lottoTickets });
      new WinningLottoInput($winningLottoInput, {
        makeWinningLotto: (winningNumbers, bonusNumber) =>
          this.makeWinningLotto(winningNumbers, bonusNumber),
      });
    }

    if (this.state.isModalOpen) {
      const $lottoStatisticsModal = this.$target.querySelector('.lotto-statistics-modal');
      new LottoStatisticsModal($lottoStatisticsModal, {
        lottoStatistics: this.state.lottoStatistics,
        closeModal: () => this.closeModal(),
      });
    }
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
    return Validator.validateLottoNumbers(
      winningNumbers
        .filter((number) => number !== '' && number !== undefined && number !== null)
        .map(Number),
    );
  }

  makeBonusNumber(winningNumbers, bonusNumber) {
    return Validator.validateBonusNumber(winningNumbers, Number(bonusNumber));
  }

  makeWinningLotto(winningNumbers, bonusNumber) {
    try {
      const validWinningNumbers = this.makeWinningNumbers(winningNumbers);
      const validBonusNumber = this.makeBonusNumber(validWinningNumbers, bonusNumber);
      this.setState({
        winningLotto: { winningNumbers: validWinningNumbers, validBonusNumber },
      });
      this.showPrizeStatistics();
    } catch (error) {
      alert(error.message);
    }
  }

  showPrizeStatistics() {
    const { lottoTickets, winningLotto } = this.state;

    const prizes = StatisticsGenerator.calculateAllPrize(lottoTickets, winningLotto);
    const returnOnInvestment = StatisticsGenerator.calculateReturnOnInvestment(prizes);

    this.setState({ lottoStatistics: { prizes, returnOnInvestment } });
    this.openModal();
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }
}

export default LottoPurchaseBox;
