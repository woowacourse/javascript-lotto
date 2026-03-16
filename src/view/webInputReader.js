import { RESTART } from "../constants/constant";

export const webInputReader = {
  isRestarting: false,

  determinePurchaseMoney() {
    return new Promise((resolve) => {
      const purchaseInput = document.getElementById("purchase-input");
      const purchaseButton = document.getElementById("purchase-button");

      if (this.isRestarting) {
        this.isRestarting = false;
        return resolve(purchaseInput.value);
      }

      const onClick = () => {
        resolve(purchaseInput.value);
      };

      purchaseButton.addEventListener("click", onClick);
    });
  },

  savedBonusNumber: null,
  checkedBonusNumber: false,

  determineWinningNumber() {
    return new Promise((resolve) => {
      const resultButton = document.getElementById("result-button");
      const winningNumbersInput = document.querySelectorAll("input.winning-numbers-input");
      const bonusNumberInput = document.getElementById("bonus-number-input");
      const purchaseButton = document.getElementById("purchase-button");
      purchaseButton.addEventListener("click", () => {
        this.isRestarting = true;
        resolve(RESTART);
      });
      const onClick = () => {
        this.savedBonusNumber = bonusNumberInput.value;
        const winningNumberArray = Array.from(winningNumbersInput)
          .map((item) => item.value)
          .filter(Boolean);
        const winningNumberString = winningNumberArray.join(",");
        resolve(winningNumberString);
      };

      resultButton.addEventListener("click", onClick);
    });
  },

  determineBonusNumber() {
    return new Promise((resolve) => {
      if (this.checkedBonusNumber) {
        const resultButton = document.getElementById("result-button");
        const bonusNumberInput = document.getElementById("bonus-number-input");

        const onClick = () => {
          resolve(bonusNumberInput.value);
          return;
        };

        resultButton.addEventListener("click", onClick);
      } else {
        this.checkedBonusNumber = true;
        resolve(this.savedBonusNumber);
        this.savedBonusNumber = null;
      }
    });
  },

  determineRetry() {
    return new Promise((resolve) => {
      const resultModalClose = document.getElementById("result-modal-close");
      const retryButton = document.getElementById("retry-button");

      const onClick = () => {
        this.isRestarting = false;
        this.checkedBonusNumber = false;
        
        resolve("y");
      };

      retryButton.addEventListener("click", onClick);
      resultModalClose.addEventListener('click', onClick);
    });
  },
};
