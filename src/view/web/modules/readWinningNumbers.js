import {
  getBonusNumber,
  getWinningNumbers,
} from "../globalElements/getElements.js";

const readWinningNumbers = (validator, renderer) => {
  const winningLottoForm = document.querySelector(".winning-lotto-form");
  const numbersContainer = document.querySelector(".numbers-container");

  winningLottoForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const winningNumbers = getWinningNumbers();
    const bonusNumber = getBonusNumber();

    const isValidNumbers = validator(winningNumbers, bonusNumber);

    if (isValidNumbers) {
      numbersContainer.querySelectorAll("input").forEach((element) => {
        element.disabled = true;
      });

      renderer(winningNumbers, bonusNumber);
    }
  });
};

export default readWinningNumbers;
