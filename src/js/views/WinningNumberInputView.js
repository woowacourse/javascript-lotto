import { SELECTOR } from '../constants/selector';
import { $, $$ } from '../utils/element-manager';
import { isNumber } from '../utils/validator';
import { onInputAutoFocus, onEnableButton } from '../utils/custom-event';

export default class WinningNumberInputView {
  #container;
  #winningNumberInputList;
  #winningNumberSubmitButton;

  constructor(containerSelector) {
    this.#container = $(containerSelector);

    this.#defaultElements();
    this.#bindViewEvents();
  }

  #defaultElements() {
    this.#winningNumberInputList = $$(this.#container, `.${SELECTOR.CLASS.LOTTO_WINNING_NUMBER}`);
    this.#winningNumberSubmitButton = $(
      this.#container,
      `#${SELECTOR.ID.LOTTO_SHOW_RESULT_BUTTON}`
    );
  }

  #bindViewEvents() {
    this.#container.addEventListener('keyup', this.#handleWinningNumberInputValue.bind(this));
  }

  init() {
    this.#winningNumberInputList.forEach((element) => {
      element.value = '';
    });

    this.hideContainer();
    this.disableSubmitButton();
  }

  #isWinningNumberInput($input) {
    const hasLottoWinningNumberClass =
      $input && $input.classList.contains(SELECTOR.CLASS.LOTTO_WINNING_NUMBER);

    return hasLottoWinningNumberClass === true;
  }

  #isWinningNumberComplete($input) {
    const inputValue = $input.value;
    return inputValue.length === 2 && isNumber(inputValue);
  }

  #isWinningNumberListEnter() {
    return [...this.#winningNumberInputList].every(($element) => $element.value);
  }

  #handleWinningNumberInputValue(event) {
    if (this.#isWinningNumberInput(event.target) === false) {
      return;
    }

    const $currentTarget = event.target;
    const $nextTarget = event.target.nextElementSibling;

    onInputAutoFocus($currentTarget, $nextTarget, ($current) =>
      this.#isWinningNumberComplete($current)
    );

    onEnableButton(this.#winningNumberSubmitButton, () => this.#isWinningNumberListEnter());
  }

  showContainer() {
    this.#container.classList.add('show');
  }

  hideContainer() {
    this.#container.classList.remove('show');
  }
}
