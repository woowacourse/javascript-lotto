const readWinningNumbers = (validator, renderer) => {
  const winningLottoForm = document.querySelector(".winning-lotto-form");

  winningLottoForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const winningNumbers = Array.from(
      document.querySelectorAll(".winning-numbers"),
    ).map((number) => Number(number.value));

    const bonusNumber = Number(document.querySelector(".bonus-number").value);

    validator(winningNumbers, bonusNumber);

    renderer(winningNumbers, bonusNumber);
  });
};

export default readWinningNumbers;
