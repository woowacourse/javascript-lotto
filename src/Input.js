import Validator from "./Validator/validator.js";

const inputView = {
  getPurchaseMoney() {
    return new Promise((resolve, reject) => {
      const purchaseButton = document.querySelector(".purchase-button");
      const purchaseInput = document.querySelector(".purchase-input");

      const handleClick = () => {
        let value = purchaseInput.value.replace(/,/g, "").trim();
        value = Number(value);

        console.log("입력된 값:", purchaseInput.value, "변환된 값:", value);

        if (
          Number.isNaN(value) ||
          !Number.isInteger(value) ||
          value <= 0 ||
          value % 1000 !== 0
        ) {
          alert("올바른 금액을 입력하세요. (1000원 단위)");
          return;
        }

        purchaseButton.removeEventListener("click", handleClick);
        resolve(value);
      };

      purchaseButton.addEventListener("click", handleClick);
    });
  },

  getWinningNumbers() {
    return new Promise((resolve, reject) => {
      const winningInputs = document.querySelectorAll(
        ".number-input-box .winning-number"
      );
      const resultButton = document.querySelector(".result-button");

      const handleClick = () => {
        const numbers = Array.from(winningInputs).map((input) => {
          const value = Number(input.value);
          return value >= 1 && value <= 45 && !isNaN(value) ? value : NaN;
        });

        if (numbers.includes(NaN) || numbers.length !== 6) {
          alert("올바른 당첨 번호를 입력하세요! (1~45 사이의 6개 숫자)");
          return;
        }

        resultButton.removeEventListener("click", handleClick);
        resolve(numbers);
      };

      resultButton.addEventListener("click", handleClick);
    });
  },

  getBonusNumber(winningNumbers) {
    return new Promise((resolve, reject) => {
      const bonusInput = document.querySelector(
        ".number-input-box .bonus-number"
      );
      const resultButton = document.querySelector(".result-button");

      const handleClick = () => {
        const bonusNumber = Number(bonusInput.value);

        if (
          bonusNumber < 1 ||
          bonusNumber > 45 ||
          isNaN(bonusNumber) ||
          winningNumbers.includes(bonusNumber)
        ) {
          alert("올바른 보너스 번호를 입력하세요! (1~45, 당첨 번호와 중복 X)");
          return;
        }

        resultButton.removeEventListener("click", handleClick);
        resolve(bonusNumber);
      };

      resultButton.addEventListener("click", handleClick);
    });
  },

  getRestartRequest() {
    return new Promise((resolve) => {
      const restartButton = document.querySelector(".restart-button");

      restartButton.addEventListener(
        "click",
        () => {
          resolve("y");
        },
        { once: true }
      );
    });
  },
};

export default inputView;
