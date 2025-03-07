import validateWinningNumbers from "../../validations/validateWinningNumbers.js";
import validateBonusNumber from "../../validations/validateBonusNumber.js";
import BaseWebComponent from "../base/BaseWebComponent.js";
import "./winning-lotto.css";
import { hideElement, renderElement, eventOn } from "../../utils/domUtils.js";
import {
  CUSTOM_ELEMENTS,
  EVENT_TYPES,
  STYLE_SELECTORS,
} from "../../constants/constants.js";

class WinningLotto extends BaseWebComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `
      <section class="winning-lotto ${STYLE_SELECTORS.hidden}">
        <p class="winning-lotto__description">
          지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.
        </p>
        <p class="winning-lotto__numbers">
          <span>당첨 번호</span><span>보너스 번호</span>
        </p>
        <form class="winning-lotto__form">
          <div class="winning-lotto__inputs">
            <div class="winning-lotto__winning-numbers">
              <input class="winning-lotto__input" maxlength="2" />
              <input class="winning-lotto__input" maxlength="2" />
              <input class="winning-lotto__input" maxlength="2" />
              <input class="winning-lotto__input" maxlength="2" />
              <input class="winning-lotto__input" maxlength="2" />
              <input class="winning-lotto__input" maxlength="2" />
            </div>
            <div class="winning-lotto__bonus-number">
              <input class="winning-lotto__input" maxlength="2" />
            </div>
          </div>
          <p class="winning-lotto__error ${STYLE_SELECTORS.hidden}"></p>
          <button class="winning-lotto__result-button">결과 확인하기</button>
        </form>
      </section>
      `;
  }

  initWinningLotto() {
    this.connectedCallback();
  }

  setEvent() {
    this.#setFormEventListeners();
    this.#setInputEventListeners();
  }

  #setFormEventListeners() {
    const form = this.querySelector(".winning-lotto__form");
    if (form) {
      eventOn(
        { target: form, eventType: EVENT_TYPES.submit },
        this.#handleSubmit.bind(this),
      );
    }
  }

  #setInputEventListeners() {
    const inputs = this.querySelectorAll(".winning-lotto__input");
    inputs.forEach((input, index) => {
      eventOn({ target: input, eventType: EVENT_TYPES.input }, () => {
        const maxLength = input.getAttribute("maxlength");
        if (
          input.value.length === parseInt(maxLength, 10) &&
          index < inputs.length - 1
        ) {
          inputs[index + 1].focus();
        }
      });
    });
  }

  #handleSubmit(event) {
    event.preventDefault();
    const { winningNumbersInput, bonusNumberInput } =
      this.#getWinningAndBonusNumbers();
    const errorElement = this.querySelector(".winning-lotto__error");

    this.#handleValidation(winningNumbersInput, bonusNumberInput, errorElement);
  }

  #handleValidation(winningNumbersInput, bonusNumberInput, errorElement) {
    try {
      const winningNumbers = validateWinningNumbers(winningNumbersInput);
      const bonusNumber = validateBonusNumber(bonusNumberInput, winningNumbers);
      hideElement(errorElement);
      this.emit(EVENT_TYPES.result, { winningNumbers, bonusNumber });
    } catch (error) {
      errorElement.textContent = error.message;
      renderElement(errorElement);
    }
  }

  #getWinningAndBonusNumbers() {
    const inputs = this.querySelectorAll(
      ".winning-lotto__winning-numbers .winning-lotto__input",
    );
    const winningNumbersInput = Array.from(inputs)
      .map((input) => input.value)
      .join(",");
    const bonusNumberInput = this.querySelector(
      ".winning-lotto__bonus-number .winning-lotto__input",
    ).value;
    return { winningNumbersInput, bonusNumberInput };
  }
}

customElements.define(CUSTOM_ELEMENTS.winningLotto, WinningLotto);
