import View from './View.js';
import { $, $$ } from '../utils/utils.js';
import { SELECTOR } from '../constants/constants.js';

export default class CheckWinningLottosView extends View {
  constructor() {
    super();
    this.bindInputWinningNumberEvents();
  }

  getInputWinningNumbers() {
    const inputWinningNumbers = new Set();
    $$(SELECTOR.CLASS.WINNING_NUMBER_INPUT).forEach((element) => {
      inputWinningNumbers.add(Number.parseInt(element.value));
    });
    if (inputWinningNumbers.size === 7) return [...inputWinningNumbers];
    const error = new Error('중복된 숫자가 있습니다.');
    error.name = 'Duplicated input';
    throw error;
  }

  handleInputWinningNumber(index) {
    const element = $$(SELECTOR.CLASS.WINNING_NUMBER_INPUT);
    element[index].value = element[index].value.substr(0, 2);
    if (index < 6 && element[index].value.length > 1) {
      element[index + 1].focus();
    }
  }

  bindInputWinningNumberEvents() {
    $$(SELECTOR.CLASS.WINNING_NUMBER_INPUT).forEach((element, index) => {
      this.bindEvent(element, 'input', () => {
        this.handleInputWinningNumber(index);
      });
    });
  }

  openModal() {
    $(SELECTOR.CLASS.MODAL).classList.toggle('show');
  }

  closeModal() {
    $(SELECTOR.CLASS.MODAL).classList.toggle('show');
  }

  renderWinLottosCountInModal(winLottos, winLottosWithBonus) {
    $$(SELECTOR.CLASS.COINCIDE_COUNT).forEach((element, index) => {
      element.textContent = `${winLottos[index + 3]}개`;
    });
    $(SELECTOR.ID.COINCIDE_COUNT_BONUS).textContent = `${winLottosWithBonus}개`;
  }
}
