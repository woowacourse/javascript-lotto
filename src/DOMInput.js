// import { Lotto, WinningLotto } from "./Lotto.js";
import Validator from "./Validator.js";

export const DOMInput = {
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

  // async readWinningLottoNumber() {
  //   const answer = await readLine("> 당첨 번호를 입력해 주세요. ");
  //   const lotto = new Lotto(answer.split(","));
  //   return lotto;
  // },

  // async readBonusNumber(winningLottoNumber) {
  //   const bonusNumber = await readLine("> 보너스 번호를 입력해 주세요. ");
  //   const winningLotto = new WinningLotto(
  //     winningLottoNumber,
  //     Number(bonusNumber),
  //   );
  //   return winningLotto;
  // },

  // async readRetry() {
  //   const answer = await readLine("> 다시 시작하시겠습니까? (y/n) ");
  //   Validator.retryValidator(answer);
  //   return answer;
  // },
};
