import {
  getBonusNumber,
  getWinningNumbers,
} from "../globalElements/getElements.js";

const readWinningNumbers = (validator, renderer) => {
  const winningLottoForm = document.querySelector(".winning-lotto-form");
  const purchaseContainer = document.querySelector(".purchase-container");

  winningLottoForm.addEventListener("submit", (event) => {
    event.preventDefault();

    purchaseContainer.querySelectorAll("input, button").forEach((element) => {
      element.disabled = true;
    });

    const winningNumbers = getWinningNumbers();
    const bonusNumber = getBonusNumber();

    const isValidNumbers = validator(winningNumbers, bonusNumber);

    if (isValidNumbers) {
      renderer(winningNumbers, bonusNumber);
    }
  });
};

export default readWinningNumbers;
