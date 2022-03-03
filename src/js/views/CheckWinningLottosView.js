import View from './View.js';
import { $, $$ } from '../utils/utils.js';
import { SELECTOR } from '../constants/constants.js';
import validateInputWinningNumbers from '../validations/CheckWinningLottos.js';

export default class CheckWinningLottosView extends View {
  constructor() {
    super();
    this.bindInputWinningNumberEvents();
    this.bindDeleteWinningNumberEvents();
  }

  getInputWinningNumbers() {
    const inputWinningNumbers = [];
    $$(SELECTOR.CLASS.WINNING_NUMBER_INPUT).forEach((element) => {
      inputWinningNumbers.push(Number.parseInt(element.value));
    });
    validateInputWinningNumbers(inputWinningNumbers);
    return inputWinningNumbers;
  }

  handleInputWinningNumber(index) {
    const elements = $$(SELECTOR.CLASS.WINNING_NUMBER_INPUT);
    elements[index].value = elements[index].value.substr(0, 2);
    if (index < 6 && elements[index].value.length > 1) {
      elements[index + 1].focus();
      // 이전 값들에 대한 확인
      elements.forEach((element) => {});
    }
  }

  handleDeleteWinningNumber(event, index) {
    const elements = $$(SELECTOR.CLASS.WINNING_NUMBER_INPUT);
    if (event.key === 'Backspace') {
      if (index !== 0 && elements[index].value.length === 0)
        elements[index - 1].focus();
      return;
    }
    console.log(elements[index].value);
  }

  bindInputWinningNumberEvents() {
    $$(SELECTOR.CLASS.WINNING_NUMBER_INPUT).forEach((element, index) => {
      this.bindEvent(element, 'input', () => {
        this.handleInputWinningNumber(index);
      });
    });
  }

  bindDeleteWinningNumberEvents() {
    $$(SELECTOR.CLASS.WINNING_NUMBER_INPUT).forEach((element, index) => {
      this.bindEvent(element, 'keydown', (event) => {
        this.handleDeleteWinningNumber(event, index);
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

  renderProfitRateInModal(profitRate) {
    console.log(profitRate);
    $(
      SELECTOR.ID.SHOW_PROFIT_RATE
    ).textContent = `당신의 총 수익률은 ${profitRate}%입니다.`;
  }
}
