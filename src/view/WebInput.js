import Input from "./Input.js";
import { LOTTO } from "../constant/index.js";

class WebInput extends Input {
  #elements;

  constructor() {
    super();

    this.#elements = {
      mainContainer: document.querySelector(".main__container"),
      modalFooter: document.querySelector(".modal__footer"),
      overlay: document.querySelector(".overlay"),
    };

    if (!this.#elements.mainContainer) {
      throw new Error("main__container를 찾을 수 없습니다.");
    }

    if (!this.#elements.modalFooter) {
      throw new Error("modal__footer를 찾을 수 없습니다.");
    }

    if (!this.#elements.overlay) {
      throw new Error("overlay를 찾을 수 없습니다.");
    }
  }

  async readMoneyAsync() {
    const formEl = document.createElement("form");
    formEl.className = "money__container";
    this.#elements.mainContainer.appendChild(formEl);

    formEl.innerHTML = `
      <label>구입금액을 입력해 주세요.</label>
      <div>
        <input type="number" id="money__input" name="money" />
        <button id="money__submit">구입</button>
      </div>
    `;

    return new Promise((resolve) => {
      formEl.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(formEl);
        const data = Object.fromEntries(formData.entries());

        this.diasbleElement("#money__input");
        this.diasbleElement("#money__submit");

        resolve(data.money);
      });
    });
  }

  async readWinningNumberAndBonusAsync() {
    const formEl = document.createElement("form");
    formEl.className = "winning-number-and-bonus__container";
    this.#elements.mainContainer.appendChild(formEl);

    const orders = ["first", "second", "third", "fourth", "fifth", "sixth"];

    const inputSelectors = [
      ...orders.map((order) => `#winning-number__${order}__input`),
      "#bonus-number__input",
    ];

    formEl.innerHTML = `
      <label for="#winning-number-and-bonus__input">구입금액을 입력해 주세요.</label>
      <div>
        <div>
          <label for="winning-number__first__input">당첨 번호</label>
          <div>
          ${orders
            .map(
              (order) => `
              <input type="number" id="winning-number__${order}__input" name="winning-number__${order}" min="${LOTTO.MIN_NUMBER}" max="${LOTTO.MAX_NUMBER}" step="1"/>
            `,
            )
            .join("")}
          </div>
        <div>
          <label for="bonus-number__input">보너스 번호</label>
          <div>
            <input type="number" id="bonus-number__input" name="bonus-number" min="${LOTTO.MIN_NUMBER}" max="${LOTTO.MAX_NUMBER}" step="1"/>
          </div>
        </div>
      </div>
      <button id="winning-number-and-bonus__submit">결과 확인하기</button>
    `;

    return new Promise((resolve) => {
      formEl.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        inputSelectors.forEach((selector) => {
          this.diasbleElement(selector);
        });

        resolve({
          winningNumbersInput: orders.map((order) => formData.get(`winning-number__${order}`)).join(","),
          bonusNumberInput: formData.get("bonus-number"),
        });
      });
    });
  }

  async readRetryAsync() {
    const buttonEl = document.createElement("button");
    buttonEl.className = "retry__button";
    buttonEl.textContent = "다시 시작";
    this.#elements.modalFooter.appendChild(buttonEl);

    return new Promise((resolve) => {
      buttonEl.addEventListener("click", (e) => {
        e.preventDefault();
        resolve("y");
        this.hiddenOverlay();
        this.clearMoneyContainer();
        this.clearPurchasedLottosContainer();
        this.clearWinningNumberAndBonusContainer();
        this.clearShowResultButtonContainer();
      });
    });
  }

  diasbleElement(selector) {
    const element = document.querySelector(selector);

    if (element) {
      element.disabled = true;
    }
  }

  hiddenOverlay() {
    this.#elements.overlay.classList.add("hidden");
  }

  clearMoneyContainer() {
    const moneyContainer = document.querySelector(".money__container");

    if (moneyContainer) {
      moneyContainer.innerHTML = "";
    }
  }

  clearPurchasedLottosContainer() {
    const purchasedLottosContainer = document.querySelector(
      ".purchased-lottos__container",
    );
    if (purchasedLottosContainer) {
      purchasedLottosContainer.innerHTML = "";
    }
  }

  clearWinningNumberAndBonusContainer() {
    const winningNumberAndBonusContainer = document.querySelector(
      ".winning-number-and-bonus__container",
    );
    if (winningNumberAndBonusContainer) {
      winningNumberAndBonusContainer.innerHTML = "";
    }
  }

  clearShowResultButtonContainer() {
    const showResultButtonContainer = document.querySelector(
      ".show-result__button__container",
    );
    if (showResultButtonContainer) {
      showResultButtonContainer.innerHTML = "";
    }
  }
}

export default WebInput;
