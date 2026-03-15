import { RESTART } from "../constants/constant";

export const webInputReader = {
  isRestarting: false,

  readPurchaseMoney() {
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

  readWinningNumber() {
    return new Promise((resolve) => {
      const resultButton = document.getElementById("result-button");
      const winningNumbersInput = document.querySelectorAll("input.winning-numbers-input");
      const bonusNumberInput = document.getElementById("bonus-number-input");
      const resultModal = document.getElementById("result-modal");
      const purchaseButton = document.getElementById("purchase-button");
      purchaseButton.addEventListener("click", () => {
        this.isRestarting = true;
        resolve(RESTART);
      });

      const onClick = () => {
        resultModal.classList.add("active");
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

  readBonusNumber() {
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

  readRetry() {
    return new Promise((resolve) => {
      const myLotto = document.getElementById("myLotto-section");
      const winningBonusSection = document.getElementById("winning-bonus-section");
      const resultButton = document.getElementById("result-button");
      const resultModal = document.getElementById("result-modal");

      const resultModalClose = document.getElementById("result-modal-close");
      const retryButton = document.getElementById("retry-button");

      const onClick = () => {
        this.isRestarting = false;
        this.checkedBonusNumber = false;

        resultModal.classList.remove("active");
        myLotto.style.display = "none";
        winningBonusSection.style.display = "none";
        resultButton.style.display = "none";
        resultModal.style.display = "none";

        document.querySelectorAll("input[type=number]").forEach((item) => {
          item.value = "";
        });

        document.querySelectorAll(".myLotto-ticket").forEach((element) => {
          element.remove();
        });

        resolve("y");
      };

      retryButton.addEventListener("click", onClick);
      resultModalClose.addEventListener('click', onClick);
    });
  },
};
