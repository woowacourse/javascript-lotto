import Input from "./Input.js";
import { LOTTO } from "../constant/index.js";

class WebInput extends Input {
  constructor() {
    super();
  }

  async readMoneyAsync() {
    const formEl = document.querySelector(".money__container");

    if (formEl) {
      formEl.innerHTML = `
        <label>구입금액을 입력해 주세요.</label>
        <div>
          <input type="number" id="money__input" name="money" min="1000" step="1000" />
          <button id="money__submit">구입</button>
        </div>
      `;
    }

    return new Promise((resolve) => {
      if (formEl) {
        formEl.addEventListener("submit", (e) => {
          e.preventDefault();
          const formData = new FormData(formEl);
          const data = Object.fromEntries(formData.entries());

          this.diasbleElement("#money__input");
          this.diasbleElement("#money__submit");

          resolve(data.money);
        });
      }
    });
  }

  async readWinningNumberAndBonusAsync() {
    const formEl = document.querySelector(
      ".winning-number-and-bonus__container",
    );

    const orders = ["first", "second", "third", "fourth", "fifth", "sixth"];

    const inputSelectors = [
      ...orders.map((order) => `#winning-number__${order}__input`),
      "#bonus-number__input",
      // "#winning-number-and-bonus__submit",
    ];

    if (formEl) {
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
    }

    return new Promise((resolve) => {
      formEl.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        inputSelectors.forEach((selector) => {
          this.diasbleElement(selector);
        });

        resolve({
          winningNumbersInput: [
            formData.get("winning-number__first"),
            formData.get("winning-number__second"),
            formData.get("winning-number__third"),
            formData.get("winning-number__fourth"),
            formData.get("winning-number__fifth"),
            formData.get("winning-number__sixth"),
          ].join(","),
          bonusNumberInput: formData.get("bonus-number"),
        });
      });
    });
  }

  async readRetryAsync() {
    const modalFooterEl = document.querySelector(".modal__footer");

    if (modalFooterEl) {
      modalFooterEl.innerHTML = '<button class="retry__button">다시 시작</button>';
    }

    const retryButtonEl = document.querySelector(".retry__button");

    return new Promise((resolve) => {
      if (retryButtonEl) {
        retryButtonEl.addEventListener("click", (e) => {
          e.preventDefault();
          resolve("y");
          this.hiddenOverlay();
          this.clearMoneyContainer();
          this.clearPurchasedLottosContainer();
          this.clearWinningNumberAndBonusContainer();
          this.clearShowResultButtonContainer();
        });
      }
    });
  }

  diasbleElement(selector) {
    const element = document.querySelector(selector);

    if (element) {
      element.disabled = true;
    }
  }

  hiddenOverlay() {
    document.querySelector(".overlay")?.classList.add("hidden");
  }

  clearMoneyContainer() {
    if (document.querySelector(".money__container")) {
      document.querySelector(".money__container").innerHTML = "";
    }
  }

  clearPurchasedLottosContainer() {
    if (document.querySelector(".purchased-lottos__container")) {
      document.querySelector(".purchased-lottos__container").innerHTML = "";
    }
  }

  clearWinningNumberAndBonusContainer() {
    if (document.querySelector(".winning-number-and-bonus__container")) {
      document.querySelector(".winning-number-and-bonus__container").innerHTML =
        "";
    }
  }

  clearShowResultButtonContainer() {
    if (document.querySelector(".show-result__button__container")) {
      document.querySelector(".show-result__button__container").innerHTML = "";
    }
  }
}

export default WebInput;
