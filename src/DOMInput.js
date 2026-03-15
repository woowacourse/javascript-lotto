import Validator from "./Validator.js";
import { Lotto, WinningLotto } from "./Lotto.js";

export const DOMInput = {
  winningLotto: null,

  async reRead(func, funcArgs) {
    while (true) {
      try {
        const answer = await func.call(this, funcArgs);
        return answer;
      } catch (err) {
        alert(`[ERROR] ${err.message}`);
      }
    }
  },

  getPurchaseInputValue() {
    return document.querySelector("#purchase-amount-input-field").value;
  },

  showLottoContainer() {
    document.querySelector("#lotto-container").style.display = "flex";
  },

  handlePurchaseSubmit(e, resolve) {
    e.preventDefault();
    const answer = this.getPurchaseInputValue();
    Validator.purchaseAmountValidator(answer);
    this.showLottoContainer();
    resolve(answer);
  },

  registerPurchaseSubmitHandler(resolve, reject) {
    document.querySelector("#purchase-amount-area").addEventListener(
      "submit",
      (e) => {
        try {
          this.handlePurchaseSubmit(e, resolve);
        } catch (err) {
          reject(err);
        }
      },
      { once: true },
    );
  },

  async readPurchaseAmount() {
    return new Promise((resolve, reject) =>
      this.registerPurchaseSubmitHandler(resolve, reject),
    );
  },

  getWinningNumbers() {
    return [...document.querySelectorAll(".winning-number")].map(
      (input) => input.value,
    );
  },

  getBonusInputValue() {
    return document.querySelector("#bonus-number-input").value;
  },

  handleWinningSubmit(e, resolve) {
    e.preventDefault();
    const numbers = this.getWinningNumbers();
    const bonus = this.getBonusInputValue();
    const winningLotto = new WinningLotto(numbers, Number(bonus));
    this.winningLotto = winningLotto;
    resolve(new Lotto(numbers));
  },

  registerWinningSubmitHandler(resolve, reject) {
    document.querySelector("#winning-number-area").addEventListener(
      "submit",
      (e) => {
        try {
          this.handleWinningSubmit(e, resolve);
        } catch (err) {
          reject(err);
        }
      },
      { once: true },
    );
  },

  async readWinningLottoNumber() {
    return new Promise((resolve, reject) =>
      this.registerWinningSubmitHandler(resolve, reject),
    );
  },

  async readBonusNumber() {
    return this.winningLotto;
  },

  // async readRetry() {
  //   const answer = await readLine("> 다시 시작하시겠습니까? (y/n) ");
  //   Validator.retryValidator(answer);
  //   return answer;
  // },
};
