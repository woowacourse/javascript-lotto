import { CONFIRMATION } from "../constants/validateConstants.js";

const Input = {
  readPurchaseAmount() {
    return new Promise((resolve) => {
      const purchaseAmount = document
        .querySelector("#purchase-amount")
        .value.trim();
      resolve(purchaseAmount);
    });
  },

  readWinningNumbers() {
    return new Promise((resolve) => {
      const input = prompt("\n> 당첨 번호를 입력해 주세요.").trim();
      resolve(input);
    });
  },

  readBonusNumber() {
    return new Promise((resolve) => {
      const input = prompt("\n> 보너스 번호를 입력해 주세요.").trim();
      resolve(input);
    });
  },

  readRestartConfirm() {
    return new Promise((resolve) => {
      const input = prompt(
        `\n> 다시 시작하시겠습니까? (${CONFIRMATION.YES}/${CONFIRMATION.NO}) `
      ).trim();
      resolve(input);
    });
  },
};

export default Input;
