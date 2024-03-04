import LottoMatcher from '../../domain/LottoMatcher';
import LottoCalculator from '../../domain/LottoCalculator';
import WinningNumberValidator from '../../validators/WinningNumberValidator';
import BonusNumberValidator from '../../validators/BonusNumberValidator';
import PurchaseAmountValidator from '../../validators/PurchaseAmountValidator';
import LottoContainer from './LottoContainer';
import ResultPopup from './ResultPopup';
import WinningNumberForm from './WinningNumberForm';
import { $, $$ } from './utils/dom';

class App {
  constructor() {
    this.lottoContainer = new LottoContainer();
    this.winningNumberForm = new WinningNumberForm({ $target: $('.winning-number-section') });
    this.resultPopup = new ResultPopup({ handleRestart: this.handleRestart.bind(this) });
    $('.purchase-form').addEventListener('submit', this.handleAmountInputForm.bind(this));
    $('.winning-bonus-number-form').addEventListener('submit', this.handleWinningInputForm.bind(this));
  }

  handleAmountInputForm(event) {
    event.preventDefault();

    this.lottoContainer.init();
    this.processPurchaseAmountInput();
  }

  processPurchaseAmountInput() {
    try {
      PurchaseAmountValidator.validate(Number($('.purchase-amount').value));
      this.lottoContainer.createLottoTickets(Number($('.purchase-amount').value));
      this.lottoContainer.renderLottoTickets();
      this.winningNumberForm.openWinningNumberForm();
    } catch (error) {
      alert(error.message);
      this.winningNumberForm.closeWinningNumberForm();
    }
    $('.purchase-amount').value = '';
  }

  handleRestart() {
    this.resultPopup.closePopup();
    this.lottoContainer.init();
    this.winningNumberForm.init();
    this.winningNumberForm.closeWinningNumberForm();
  }

  handleWinningInputForm(event) {
    event.preventDefault();

    const winningNumbers = Array.from($$('.winning-number')).map((input) => Number(input.value));
    const bonusNumber = Number($('.bonus-number').value);
    this.handleErrorAndProcessInput(winningNumbers, bonusNumber);
  }

  handleErrorAndProcessInput(winningNumbers, bonusNumber) {
    try {
      this.validateWinningBonus(winningNumbers, bonusNumber);
      const { lottoMatcher, totalProfit } = this.processWinningInput(winningNumbers, bonusNumber);
      this.resultPopup.renderPopup(lottoMatcher.matchingResult, totalProfit);
    } catch (error) {
      alert(error.message);
    }
  }

  validateWinningBonus(winningNumbers, bonusNumber) {
    WinningNumberValidator.validate(winningNumbers);
    BonusNumberValidator.validate(bonusNumber, winningNumbers);
  }

  processWinningInput(winningNumbers, bonusNumber) {
    const lottoMatcher = new LottoMatcher(winningNumbers, bonusNumber);
    const lottoTicketArray = this.lottoContainer.getLottoTicketArray();
    lottoTicketArray.forEach((lotto) => lottoMatcher.processMatches(lotto));

    const totalProfit = LottoCalculator.getRateOfReturn(lottoTicketArray.length * 1000, lottoMatcher.matchingResult);
    return { lottoMatcher, totalProfit };
  }
}

export default App;
