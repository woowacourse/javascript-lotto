import { RESTART } from "../constants/constant";

export const webInputReader = {
  isRestarting: false,

  readPurchaseMoney() {
    return new Promise((resolve) => {
      const purchaseInput = document.getElementById("purchaseInput");
      const purchaseButton = document.getElementById("purchaseButton");

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
      const getResultButton = document.getElementById("getResultButton");
      const winningInput = document.querySelectorAll("input.winningInput");
      const bonusInput = document.getElementById("bonusInput");
      const resultModal = document.getElementById("resultModal");
      const purchaseButton = document.getElementById("purchaseButton");
      purchaseButton.addEventListener("click", () => {
        this.isRestarting = true;
        resolve(RESTART);
      });

      const onClick = () => {
        resultModal.classList.add("active");
        this.savedBonusNumber = bonusInput.value;
        const winningNumberArray = Array.from(winningInput)
          .map((item) => item.value)
          .filter(Boolean);
        const winningNumberString = winningNumberArray.join(",");
        resolve(winningNumberString);
      };

      getResultButton.addEventListener("click", onClick);
    });
  },

  readBonusNumber() {
    return new Promise((resolve) => {
      if (this.checkedBonusNumber) {
        const getResultButton = document.getElementById("getResultButton");
        const bonusInput = document.getElementById("bonusInput");

        const onClick = () => {
          resolve(bonusInput.value);
          return;
        };

        getResultButton.addEventListener("click", onClick);
      } else {
        this.checkedBonusNumber = true;
        resolve(this.savedBonusNumber);
        this.savedBonusNumber = null;
      }
    });
  },

  readRetry() {
    return new Promise((resolve) => {
      const myLotto = document.getElementById("myLotto");
      const winningDiv = document.getElementById("winningDiv");
      const getResultButton = document.getElementById("getResultButton");
      const resultModal = document.getElementById("resultModal");

      const retryButton = document.getElementById("retryButton");

      const onClick = () => {
        this.isRestarting = false;
        this.checkedBonusNumber = false;

        resultModal.classList.remove("active");
        myLotto.style.display = "none";
        winningDiv.style.display = "none";
        getResultButton.style.display = "none";
        resultModal.style.display = "none";

        document.querySelectorAll("input[type=number]").forEach((item) => {
          item.value = "";
        });

        document.querySelectorAll(".myLottoListLi").forEach((element) => {
          element.remove();
        });

        resolve("y");
      };

      retryButton.addEventListener("click", onClick);
    });
  },
};
