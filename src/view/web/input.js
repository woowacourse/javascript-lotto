import {
  validateBonusNumber,
  validatePrice,
  validateWinningNumbers,
} from "../../utils/validate/Validator";

const printErrorMessage = (errorField, error) => {
  const prevErrorMessage = document.querySelector(
    `${errorField} .error-message`
  );
  if (prevErrorMessage) {
    prevErrorMessage.innerText = error.message;
    return;
  }
  const errorFieldBlock = document.querySelector(errorField);
  const errorMessage = document.createElement("p");
  errorMessage.className = "error-message";
  errorMessage.innerText = error.message;
  errorFieldBlock.appendChild(errorMessage);
};

const removeErrorField = (errorField) => {
  const prevErrorMessage = document.querySelector(
    `${errorField} .error-message`
  );
  if (prevErrorMessage) {
    prevErrorMessage.remove();
  }
};

const getPrice = () => {
  return new Promise((resolve) => {
    const userInputPrice = document.querySelector(".input-contents input");
    const purchaseButton = document.querySelector(".input-contents button");
    const winningLottoContainer = document.querySelector(
      ".winningLotto-contents"
    );
    const resultSubmitButton = document.querySelector(".result-contents");

    purchaseButton.addEventListener("click", async () => {
      try {
        validatePrice(userInputPrice.value);
        removeErrorField(".input-contents");
        winningLottoContainer.style.display = "flex";
        resultSubmitButton.style.display = "flex";

        resolve(userInputPrice.value);
      } catch (error) {
        printErrorMessage(".input-contents", error);
      }
    });
  });
};

const getWinningLotto = async () => {
  const winningNumberInputs = document.querySelectorAll(
    ".winningLotto-contents_winningLotto div input"
  );
  const bonusNumberInput = document.querySelector(
    ".winningLotto-contents_bonusNumber input"
  );
  const submitResultButton = document.querySelector(".result-contents");

  return new Promise((resolve) => {
    submitResultButton.addEventListener("click", async () => {
      const winningNumbers = [];
      let bonusNumber = "";

      winningNumberInputs.forEach((winningNumber) => {
        winningNumbers.push(winningNumber.value);
      });
      bonusNumber = bonusNumberInput.value;

      try {
        validateWinningNumbers(winningNumbers);
        validateBonusNumber(winningNumbers, bonusNumber);
        removeErrorField(".winningLotto-contents");
        resolve({ winningNumbers, bonusNumber });
      } catch (error) {
        printErrorMessage(".winningLotto-contents", error);
      }
    });
  });
};
export { getPrice, getWinningLotto };
