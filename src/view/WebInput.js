import Input from "./Input.js";
import { LOTTO } from "../constant/index.js";

class WebInput extends Input {
  #elements;

  constructor() {
    super();

    this.#elements = {
      mainContainerBody: document.querySelector(".main__container__body"),
      mainContainerFooter: document.querySelector(".main__container__footer"),
      dialog: document.querySelector("dialog"),
      dialogFooter: document.querySelector(".dialog__footer"),
    };

    if (!this.#elements.mainContainerBody) {
      throw new Error("main__container__body를 찾을 수 없습니다.");
    }

    if (!this.#elements.mainContainerFooter) {
      throw new Error("main__container__footer를 찾을 수 없습니다.");
    }

    if (!this.#elements.dialogFooter) {
      throw new Error("dialog__footer를 찾을 수 없습니다.");
    }

    if (!this.#elements.dialog) {
      throw new Error("dialog를 찾을 수 없습니다.");
    }
  }

  async readMoneyAsync() {
    const moneyFormElement = this.#renderForm({
      parentElement: this.#elements.mainContainerBody,
      className: "money__form",
      html: `
        <p>구입할 금액을 입력해주세요.</p>
        <fieldset class="money__inputs">
          <label class="hidden">금액</label>
          <input type="number" class="money__input" name="money" min="1000" step="1000" placeholder="금액" />
          <button type="submit" class="money__submit">구입</button>
        </fieldset>
      `,
    });

    return this.#handleFormSubmitAsync({
      formElement: moneyFormElement,
      extractFormData: (formData) => formData.get("money"),
      cleanupHandler: () => {
        this.#diasbleElement(".money__input");
        this.#diasbleElement(".money__submit");
      },
    });
  }

  async readWinningNumberAndBonusAsync() {
    const orders = ["first", "second", "third", "fourth", "fifth", "sixth"];

    const formElement = this.#renderForm({
      parentElement: this.#elements.mainContainerBody,
      className: "winning-number-and-bonus__form",
      html: `
        <p>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</p>
        <div class="winning-number-and-bonus__inputs">
          <div class="winning-number__container">
            <p>당첨 번호</p>
            <fieldset class="winning-number__inputs">
            ${orders
              .map(
                (order, index) => `
              <label class="hidden">
                당첨 번호 ${index + 1}번째 자리
              </label>
              <input
                type="number"
                class="winning-number__${order}__input"
                name="winning-number__${order}"
                min="${LOTTO.MIN_NUMBER}"
                max="${LOTTO.MAX_NUMBER}"
                step="1"
              />
              `,
              )
              .join("")}
            </fieldset>
          </div>
          <div class="bonus__container">
            <p>보너스 번호</p>
            <fieldset class="bonus__inputs">
              <label class="hidden">보너스 번호</label>
              <input
                type="number"
                class="bonus-number__input"
                name="bonus-number"
                min="${LOTTO.MIN_NUMBER}"
                max="${LOTTO.MAX_NUMBER}"
                step="1"
              />
            </fieldset>
          </div>
        </div>
        <button type="submit" class="winning-number-and-bonus__submit hidden">확인</button>
      `,
    });

    const showResultFormElement = this.#renderForm({
      parentElement: this.#elements.mainContainerFooter,
      className: "show-result__form",
      html: `
        <button type="submit">결과 확인하기</button>
      `,
    });

    this.#handleFormSubmitAsync({
      formElement: showResultFormElement,
      extractFormData: () => {},
      cleanupHandler: () => {
        formElement.dispatchEvent(new Event("submit"));
      },
    });

    return this.#handleFormSubmitAsync({
      formElement,
      extractFormData: (formData) => {
        return {
          winningNumbersInput: orders
            .map((order) => formData.get(`winning-number__${order}`))
            .join(","),
          bonusNumberInput: formData.get("bonus-number"),
        };
      },
      cleanupHandler: () => {
        [
          ...orders.map((order) => `.winning-number__${order}__input`),
          ".bonus-number__input",
        ].forEach((selector) => {
          this.#diasbleElement(selector);
        });
      },
    });
  }

  async readRetryAsync() {
    const formElement = this.#renderForm({
      parentElement: this.#elements.dialogFooter,
      className: "retry-form",
      html: `
        <input type="hidden" name="retry" value="y" />
        <button type="submit" class="retry__button">다시 시작</button>
      `,
    });

    return this.#handleFormSubmitAsync({
      formElement,
      extractFormData: (formData) => formData.get("retry"),
      cleanupHandler: () => {
        this.#hiddenOverlay();
        this.#removeElement(".money__form");
        this.#removeElement(".purchased-lottos__container");
        this.#removeElement(".winning-number-and-bonus__form");
        this.#removeElement(".show-result__button");
      },
    });
  }

  #diasbleElement(selector) {
    const element = document.querySelector(selector);

    if (element) {
      element.disabled = true;
    }
  }

  #removeElement(selector) {
    const element = document.querySelector(selector);

    if (element) {
      element.remove();
    }
  }

  #hiddenOverlay() {
    this.#elements.dialog.close();
  }

  #renderForm({ parentElement, className, html }) {
    this.#removeElement(`.${className}`);

    const formEl = document.createElement("form");
    formEl.className = className;
    parentElement.appendChild(formEl);

    formEl.insertAdjacentHTML("afterbegin", html);

    return formEl;
  }

  #handleFormSubmitAsync({ formElement, extractFormData, cleanupHandler }) {
    return new Promise((resolve) => {
      formElement.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        cleanupHandler();
        resolve(extractFormData(formData));
      });
    });
  }
}

export default WebInput;
