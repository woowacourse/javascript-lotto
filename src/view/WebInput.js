import Input from "./Input.js";
import { LOTTO } from "../constant/index.js";
import WebUtil from "../util/WebUtil.js";

class WebInput extends Input {
  #webUtil;
  #elements;

  constructor() {
    super();

    this.#webUtil = new WebUtil();
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
    const moneyFormElement = this.#webUtil.renderElement({
      parentElement: this.#elements.mainContainerBody,
      tagName: "form",
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

    return this.#webUtil.handleEventAsync({
      element: moneyFormElement,
      eventName: "submit",
      eventHandler: (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        return formData.get("money");
      },
      cleanupHandler: () => {
        this.#disableElement(".money__input");
        this.#disableElement(".money__submit");
      },
    });
  }

  async readWinningNumberAndBonusAsync() {
    const orders = ["first", "second", "third", "fourth", "fifth", "sixth"];

    const formElement = this.#webUtil.renderElement({
      parentElement: this.#elements.mainContainerBody,
      tagName: "form",
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

    const showResultFormElement = this.#webUtil.renderElement({
      parentElement: this.#elements.mainContainerFooter,
      tagName: "form",
      className: "show-result__form",
      html: `
        <button type="submit">결과 확인하기</button>
      `,
    });

    this.#webUtil.handleEventAsync({
      element: showResultFormElement,
      eventName: "submit",
      eventHandler: (e) => {
        e.preventDefault();
        formElement.dispatchEvent(new Event("submit"));
      },
    });

    return this.#webUtil.handleEventAsync({
      element: formElement,
      eventName: "submit",
      eventHandler: (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
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
          this.#disableElement(selector);
        });
      },
    });
  }

  async readRetryAsync() {
    const formElement = this.#webUtil.renderElement({
      parentElement: this.#elements.dialogFooter,
      tagName: "form",
      className: "retry-form",
      html: `
        <input type="hidden" name="retry" value="y" />
        <button type="submit" class="retry__button">다시 시작</button>
      `,
    });

    return this.#webUtil.handleEventAsync({
      element: formElement,
      eventName: "submit",
      eventHandler: (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        return formData.get("retry");
      },
      cleanupHandler: () => {
        this.#closeDialog();
        this.#removeElement(".money__form");
        this.#removeElement(".purchased-lottos__container");
        this.#removeElement(".winning-number-and-bonus__form");
        this.#removeElement(".show-result__form");
        this.#removeElement(".retry-form");
      },
    });
  }

  #disableElement(selector) {
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

  #closeDialog() {
    this.#elements.dialog.close();
  }
}

export default WebInput;
