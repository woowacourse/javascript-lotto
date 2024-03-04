import Component from './Component';
import MoneyInput from './MoneyInput';
import LottoDisplay from './LottoDisplay';
import WinningLottoInput from './WinningLottoInput';
import LottoStatisticsModal from './LottoStatisticsModal';
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
    const { lottoTickets, isModalOpen } = this.state;

    return `    
      <section class="lotto-purchase-box">
          <h1 class="lotto-purchase-title">🎱 내 번호 당첨 확인 🎱</h1>
          <section class="money-input-container"></section>
          ${
            lottoTickets.length > 0
              ? `
              <section class="lotto-display-container"></section>
              <section class="winning-lotto-input-container"></section>
              `
              : ``
          }
          ${
            isModalOpen
              ? `
              <section class="lotto-statistics-modal-container"></section>`
              : ``
          }
      </section>
    `;
  }

  mounted() {
    this.initializeMoneyInput();

    if (this.state.lottoTickets.length > 0) {
      this.initializeLottoDisplay();
      this.initializeWinningLottoInput();
    }

    if (this.state.isModalOpen) this.initializeLottoStatisticsModal();
  }

  initializeMoneyInput() {
    if (this.$target.querySelector('.money-input-container')) {
      const $moneyInput = this.$target.querySelector('.money-input-container');

      new MoneyInput($moneyInput, {
        purchaseLottoTickets: (money) => this.purchaseLottoTickets(money),
      });
    }
  }

  initializeLottoDisplay() {
    if (this.$target.querySelector('.lotto-display-container')) {
      const $lottoDisplay = this.$target.querySelector('.lotto-display-container');

      new LottoDisplay($lottoDisplay, { lottoTickets: this.state.lottoTickets });
    }
  }

  initializeWinningLottoInput() {
    if (this.$target.querySelector('.winning-lotto-input-container')) {
      const $winningLottoInput = this.$target.querySelector('.winning-lotto-input-container');

      new WinningLottoInput($winningLottoInput, {
        makeWinningLotto: (winningNumbers, bonusNumber) => this.makeWinningLotto(winningNumbers, bonusNumber),
      });
    }
  }

  initializeLottoStatisticsModal() {
    if (this.$target.querySelector('.lotto-statistics-modal-container')) {
      const $lottoStatisticsModal = this.$target.querySelector('.lotto-statistics-modal-container');

      new LottoStatisticsModal($lottoStatisticsModal, {
        lottoStatistics: this.state.lottoStatistics,
        closeModal: () => this.closeModal(),
        restart: () => this.props.restart(),
      });
    }
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  disabledSection(className) {
    this.$target
      .querySelector(className)
      .querySelectorAll('input')
      .forEach((el) => (el.disabled = true));
  }

  purchaseLottoTickets(money) {
    this.setState({ lottoTickets: LottoGenerator.createLotto(money) });
    this.disabledSection('.money-input-container');
  }

  makeWinningLotto(winningNumbers, bonusNumber) {
    this.setState({ winningLotto: { winningNumbers, bonusNumber } });
    this.showPrizeStatistics();
  }

  showPrizeStatistics() {
    const { lottoTickets, winningLotto } = this.state;

    const prizes = StatisticsGenerator.calculateAllPrize(lottoTickets, winningLotto);
    const returnOnInvestment = StatisticsGenerator.calculateReturnOnInvestment(prizes);

    this.setState({ lottoStatistics: { prizes, returnOnInvestment } });
    this.openModal();
    this.disabledSection('.winning-lotto-input-container');
  }
}

export default LottoPurchaseBox;
