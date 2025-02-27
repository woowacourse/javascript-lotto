const getPrice = () => {
  return new Promise((resolve) => {
    const userInputPrice = document.querySelector(".input-contents input");
    const purchaseButton = document.querySelector(".input-contents button");

    purchaseButton.addEventListener("click", async () => {
      const winningLottoContainer = document.querySelector(
        ".winningLotto-contents"
      );
      const resultSubmitButton = document.querySelector(".result-contents");

      winningLottoContainer.style.display = "flex";
      resultSubmitButton.style.display = "flex";
      resolve(userInputPrice.value);
    });
  });
};

const getWinningLotto = async () => {
  const winningNumbers = [];
  let bonusNumber = 0;
  return new Promise((resolve) => {
    const winningNumberInputs = document.querySelectorAll(
      ".winningLotto-contents_winningLotto div input"
    );
    const bonusNumberInput = document.querySelector(
      ".winningLotto-contents_bonusNumber input"
    );
    const submitResultButton = document.querySelector(".result-contents");

    submitResultButton.addEventListener("click", async () => {
      winningNumberInputs.forEach((winningNumber) => {
        winningNumbers.push(Number(winningNumber.value));
      });
      bonusNumber = Number(bonusNumberInput.value);
      resolve({ winningNumbers, bonusNumber });
    });
  });
};
export { getPrice, getWinningLotto };
