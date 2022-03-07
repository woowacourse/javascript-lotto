import { DOM_NAME, SELECTOR } from '../constants/selector';
import { $, $$ } from '../utils/element-manager';
import { isNumber } from '../utils/validator';
import { onInputAutoFocus, onEnableButton, addEventOnce } from '../utils/custom-event';

export default class WinningNumberInputView {
  #container;

  #winningNumberInputList;
  #winningNumberErrorMessage;
  #winningNumberSubmitButton;

  constructor(containerSelector) {
    this.#container = $(containerSelector);

    this.#defaultElements();
    this.#bindViewEvents();

    this.init();
  }

  #defaultElements() {
    this.#winningNumberInputList = $$(this.#container, SELECTOR.CLASS.LOTTO_WINNING_NUMBER);
    this.#winningNumberSubmitButton = $(this.#container, SELECTOR.ID.LOTTO_SHOW_RESULT_BUTTON);

    this.#winningNumberErrorMessage = $(this.#container, SELECTOR.CLASS.ERROR_MESSAGE);
  }

  #bindViewEvents() {
    this.#container.addEventListener('keyup', this.#handleWinningNumberInputValue.bind(this));
  }

  init() {
    this.#winningNumberInputList.forEach((element) => {
      element.value = '';
    });

    this.#winningNumberSubmitButton.disabled = true;
    this.hideContainer();
  }

  #isWinningNumberInput($input) {
    const hasLottoWinningNumberClass =
      $input && $input.classList.contains(DOM_NAME.CLASS.LOTTO_WINNING_NUMBER);

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

  renderWinningNumberInputError(message, errorInputIndex) {
    this.#winningNumberErrorMessage.classList.add('show');
    this.#winningNumberErrorMessage.textContent = message;

    const handleInputChange = ({ target: $target }) => {
      $target.classList.remove('error');

      const inputErrorCount = $$(
        this.#container,
        `${SELECTOR.CLASS.LOTTO_WINNING_NUMBER}.error`
      ).length;
      if (inputErrorCount > 0) {
        return;
      }

      this.#winningNumberErrorMessage.classList.remove('show');
    };

    errorInputIndex.forEach((elementIndex) => {
      const $winningNumberInput = this.#winningNumberInputList[elementIndex];
      $winningNumberInput.classList.add('error');
      addEventOnce('change', $winningNumberInput, handleInputChange);
    });
  }

  bindWinningNumberInputSubmit(handler) {
    this.#winningNumberSubmitButton.addEventListener('click', (event) => {
      event.preventDefault();

      const winningNumberList = [...this.#winningNumberInputList].map(($element) => $element.value);
      handler({
        winningNumberList,
      });
    });
  }
}
