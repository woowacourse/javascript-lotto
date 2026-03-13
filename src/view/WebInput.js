import Input from "./Input.js";
import { LOTTO } from "../constant/index.js";

class WebInput extends Input {
  #elements;

  constructor() {
    super();

    this.#elements = {
      mainContainerBody: document.querySelector(".main__container__body"),
      mainContainerFooter: document.querySelector(".main__container__footer"),
      modalFooter: document.querySelector(".modal__footer"),
      overlay: document.querySelector(".overlay"),
    };

    if (!this.#elements.mainContainerBody) {
      throw new Error("main__container__body를 찾을 수 없습니다.");
    }

    if (!this.#elements.mainContainerFooter) {
      throw new Error("main__container__footer를 찾을 수 없습니다.");
    }

    if (!this.#elements.modalFooter) {
      throw new Error("modal__footer를 찾을 수 없습니다.");
    }

    if (!this.#elements.overlay) {
      throw new Error("overlay를 찾을 수 없습니다.");
    }
  }

  async readMoneyAsync() {
    this.removeElement(".money__container");

    const formEl = document.createElement("form");
    formEl.className = "money__container";
    this.#elements.mainContainerBody.appendChild(formEl);

    formEl.innerHTML = `
      <p>구입할 금액을 입력해주세요.</p>
      <fieldset class="money__inputs">
        <label for="money" class="hidden">금액</label>
        <input type="number" class="money__input" name="money" min="1000" step="1000" placeholder="금액" />
        <button type="submit" class="money__submit">구입</button>
      </fieldset>
    `;

    return new Promise((resolve) => {
      formEl.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        this.diasbleElement(".money__input");
        this.diasbleElement(".money__submit");

        resolve(data.money);
      });
    });
  }

  async readWinningNumberAndBonusAsync() {
    this.removeElement(".winning-number-and-bonus__container");
    this.removeElement(".show-result__button");

    const formEl = document.createElement("form");
    formEl.className = "winning-number-and-bonus__container";
    this.#elements.mainContainerBody.appendChild(formEl);

    const orders = ["first", "second", "third", "fourth", "fifth", "sixth"];

    const inputSelectors = [
      ...orders.map((order) => `.winning-number__${order}__input`),
      ".bonus-number__input",
    ];

    formEl.innerHTML = `
      <p>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</p
      >
      <div class="winning-number-and-bonus__inputs">
        <div class="winning-number__container">
          <p>당첨 번호</p>
          <fieldset class="winning-number__inputs">
          ${orders
            .map(
              (order, index) => `
            <label for="winning-number__${order}" class="hidden">
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
            <label for="bonus-number" class="hidden">보너스 번호</label>
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
    `;

    const submitButtonEl = document.createElement("button");
    submitButtonEl.type = "submit";
    submitButtonEl.className = "winning-number-and-bonus__submit hidden";
    submitButtonEl.textContent = "확인";
    formEl.appendChild(submitButtonEl);

    const resultButtonEl = document.createElement("button");
    resultButtonEl.type = "button";
    resultButtonEl.className = "show-result__button";
    resultButtonEl.textContent = "결과 확인하기";
    resultButtonEl.addEventListener("click", () => {
      submitButtonEl.click();
    });
    this.#elements.mainContainerFooter.appendChild(resultButtonEl);

    return new Promise((resolve) => {
      formEl.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        inputSelectors.forEach((selector) => {
          this.diasbleElement(selector);
        });

        resolve({
          winningNumbersInput: orders
            .map((order) => formData.get(`winning-number__${order}`))
            .join(","),
          bonusNumberInput: formData.get("bonus-number"),
        });
      });
    });
  }

  async readRetryAsync() {
    this.#elements.modalFooter.innerHTML = "";

    const buttonEl = document.createElement("button");
    buttonEl.type = "button";
    buttonEl.className = "retry__button";
    buttonEl.textContent = "다시 시작";
    this.#elements.modalFooter.appendChild(buttonEl);

    return new Promise((resolve) => {
      buttonEl.addEventListener("click", (e) => {
        e.preventDefault();
        resolve("y");
        this.hiddenOverlay();
        this.removeElement(".money__container");
        this.removeElement(".purchased-lottos__container");
        this.removeElement(".winning-number-and-bonus__container");
        this.removeElement(".show-result__button");
      });
    });
  }

  diasbleElement(selector) {
    const element = document.querySelector(selector);

    if (element) {
      element.disabled = true;
    }
  }

  removeElement(selector) {
    const element = document.querySelector(selector);

    if (element) {
      element.remove();
    }
  }

  hiddenOverlay() {
    this.#elements.overlay.classList.add("hidden");
  }
}

export default WebInput;
