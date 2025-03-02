import {
  getBonusNumber,
  getWinningNumbers,
} from "../globalElements/getElements";

const readWinningNumbers = (validator, renderer) => {
  const winningLottoForm = document.querySelector(".winning-lotto-form");

  winningLottoForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const winningNumbers = getWinningNumbers();
    const bonusNumber = getBonusNumber();

    const isValidNumbers = validator(winningNumbers, bonusNumber);

    if (isValidNumbers) {
      renderer(winningNumbers, bonusNumber);
    }
  });
};

export default readWinningNumbers;
