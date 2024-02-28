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
    const { lottoTickets, isModalOpen } = this.state;

    return `    
      <section class="lotto-purchase-box">
          <p class="lotto-purchase-title">🎱 내 번호 당첨 확인 🎱</p>
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
    const $moneyInput = this.$target.querySelector('.money-input-container');

    new MoneyInput($moneyInput, {
      purchaseLottoTickets: (money) => this.purchaseLottoTickets(money),
    });
  }

  initializeLottoDisplay() {
    const $lottoDisplay = this.$target.querySelector('.lotto-display-container');

    new LottoDisplay($lottoDisplay, { lottoTickets: this.state.lottoTickets });
  }

  initializeWinningLottoInput() {
    const $winningLottoInput = this.$target.querySelector('.winning-lotto-input-container');

    new WinningLottoInput($winningLottoInput, {
      makeWinningLotto: (winningNumbers, bonusNumber) => this.makeWinningLotto(winningNumbers, bonusNumber),
    });
  }

  initializeLottoStatisticsModal() {
    const $lottoStatisticsModal = this.$target.querySelector('.lotto-statistics-modal-container');

    new LottoStatisticsModal($lottoStatisticsModal, {
      lottoStatistics: this.state.lottoStatistics,
      closeModal: () => this.closeModal(),
      restart: () => this.props.restart(),
    });
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  purchaseLottoTickets(money) {
    try {
      Validator.validateMoney(money);
      this.setState({ lottoTickets: LottoGenerator.createLotto(money) });
    } catch (error) {
      alert(error.message);
    }
  }

  validateWinningLottoNumbers(winningNumbers, bonusNumber) {
    const validWinningNumbers = Validator.validateLottoNumbers(
      winningNumbers.filter((number) => number !== '' && number !== undefined && number !== null).map(Number),
    );
    const validBonusNumber = Validator.validateBonusNumber(validWinningNumbers, Number(bonusNumber));

    return { winningNumbers: validWinningNumbers, bonusNumber: validBonusNumber };
  }

  makeWinningLotto(winningNumbers, bonusNumber) {
    try {
      this.setState({
        winningLotto: this.validateWinningLottoNumbers(winningNumbers, bonusNumber),
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
}

export default LottoPurchaseBox;
