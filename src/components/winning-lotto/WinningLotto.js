import validateWinningNumbers from "../../validations/validateWinningNumbers.js";
import validateBonusNumber from "../../validations/validateBonusNumber.js";
import BaseWebComponent from "../base/BaseWebComponent.js";
import "./winning-lotto.css";

class WinningLotto extends BaseWebComponent {
  constructor() {
    super();
    this.isInitialized = false;
  }

  getTemplate() {
    if (!this.isInitialized) {
      return "";
    }

    return `
      <section class="winning-lotto">
        <p class="winning-lotto__description">
          지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.
        </p>
        <p class="winning-lotto__numbers">
          <span>당첨 번호</span><span>보너스 번호</span>
        </p>
        <form class="winning-lotto__form">
          <div class="winning-lotto__inputs">
            <div class="winning-lotto__winning-numbers">
              <input class="winning-lotto__input" />
              <input class="winning-lotto__input" />
              <input class="winning-lotto__input" />
              <input class="winning-lotto__input" />
              <input class="winning-lotto__input" />
              <input class="winning-lotto__input" />
            </div>
            <div class="winning-lotto__bonus-number">
              <input class="winning-lotto__input" />
            </div>
          </div>
          <p class="winning-lotto__error"></p>
          <button class="winning-lotto__result-button">결과 확인하기</button>
        </form>
      </section>
      `;
  }

  initWinningLotto() {
    this.isInitialized = true;
    this.connectedCallback();
  }

  setEvent() {
    const form = this.querySelector(".winning-lotto__form");
    if (form) {
      this.on(
        { target: form, eventType: "submit" },
        this.#handleSubmit.bind(this),
      );
    }
  }

  #handleSubmit(event) {
    event.preventDefault();
    const inputs = this.querySelectorAll(
      ".winning-lotto__winning-numbers .winning-lotto__input",
    );
    const winningNumbersInput = Array.from(inputs)
      .map((input) => input.value)
      .join(",");

    const bonusNumberInput = this.querySelector(
      ".winning-lotto__bonus-number .winning-lotto__input",
    ).value;
    const errorElement = this.querySelector(".winning-lotto__error");

    try {
      const winningNumbers = validateWinningNumbers(winningNumbersInput);
      const bonusNumber = validateBonusNumber(bonusNumberInput, winningNumbers);
      errorElement.style.display = "none";
      this.emit("result", { winningNumbers, bonusNumber });
    } catch (error) {
      errorElement.textContent = error.message;
      errorElement.style.display = "block";
    }
  }
}

customElements.define("winning-lotto", WinningLotto);
